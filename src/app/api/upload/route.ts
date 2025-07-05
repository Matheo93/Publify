import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

interface LinkedInRecipe {
  recipe: string;
  status: 'PROCESSING' | 'AVAILABLE' | 'FAILED';
}

interface LinkedInAssetStatus {
  recipes: LinkedInRecipe[];
  status?: string;
  mediaArtifact?: string;
  mediaTypeFamily?: string;
  id?: string;
  lastModified?: number;
  created?: number;
  serviceRelationships?: Array<{
    relationshipType: string;
    identifier: string;
  }>;
}

interface LinkedInUploadMechanism {
  'com.linkedin.digitalmedia.uploading.MediaUploadHttpRequest': {
    uploadUrl: string;
    headers?: {
      'media-type-family': string;
    };
  };
}

interface LinkedInRegisterResponse {
  value: {
    asset: string;
    uploadMechanism: LinkedInUploadMechanism;
    mediaArtifact?: string;
    assetRealTimeTopic?: string;
  };
}

async function registerMediaWithLinkedIn(accessToken: string, memberId: string, mediaType: 'image' | 'video') {
  try {
    const recipe = mediaType === 'video' 
      ? 'urn:li:digitalmediaRecipe:feedshare-video'
      : 'urn:li:digitalmediaRecipe:feedshare-image';

    const request = {
      registerUploadRequest: {
        recipes: [recipe],
        owner: `urn:li:person:${memberId}`,
        serviceRelationships: [{
          relationshipType: 'OWNER',
          identifier: 'urn:li:userGeneratedContent'
        }]
      }
    };

    const registerResponse = await fetch('https://api.linkedin.com/v2/assets?action=registerUpload', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
        'X-Restli-Protocol-Version': '2.0.0',
        'LinkedIn-Version': '202304'
      },
      body: JSON.stringify(request)
    });

    if (!registerResponse.ok) {
      const errorText = await registerResponse.text();
      throw new Error(`Failed to register upload with LinkedIn: ${errorText}`);
    }

    const data = await registerResponse.json() as LinkedInRegisterResponse;
    
    return {
      uploadUrl: data.value.uploadMechanism['com.linkedin.digitalmedia.uploading.MediaUploadHttpRequest'].uploadUrl,
      asset: data.value.asset,
      headers: data.value.uploadMechanism['com.linkedin.digitalmedia.uploading.MediaUploadHttpRequest'].headers || {}
    };
  } catch (error) {
    console.error('Register error:', error);
    throw error;
  }
}

async function waitForVideoProcessing(accessToken: string, asset: string): Promise<boolean> {
  const maxAttempts = 30;
  const delayBetweenAttempts = 2000;
  let attempts = 0;
  let consecutiveAvailable = 0;

  const assetId = asset.split(':').pop() || asset;

  while (attempts < maxAttempts) {
    try {
      const response = await fetch(`https://api.linkedin.com/v2/assets/${assetId}`, {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'X-Restli-Protocol-Version': '2.0.0',
          'LinkedIn-Version': '202304'
        }
      });

      if (!response.ok) {
        console.log(`Attempt ${attempts + 1}: Status check failed with status ${response.status}`);
        const errorText = await response.text();
        console.log('Error response:', errorText);
        attempts++;
        await new Promise(resolve => setTimeout(resolve, delayBetweenAttempts));
        continue;
      }

      const data = await response.json() as LinkedInAssetStatus;
      console.log(`Attempt ${attempts + 1}: Asset status:`, data);

      const videoRecipe = data.recipes?.[0];
      
      if (videoRecipe?.status === 'AVAILABLE' && data.status === 'ALLOWED') {
        consecutiveAvailable++;
        console.log(`Video available (${consecutiveAvailable}/2)`);
        
        if (consecutiveAvailable >= 2) {
          console.log('Video is stable and ready');
          return true;
        }

        await new Promise(resolve => setTimeout(resolve, 1000));
        attempts++;
        continue;
      } else {
        consecutiveAvailable = 0;
      }

      if (videoRecipe?.status === 'FAILED') {
        console.error('Video processing failed');
        return false;
      }

      const delay = videoRecipe?.status === 'PROCESSING' ? 3000 : delayBetweenAttempts;
      attempts++;
      await new Promise(resolve => setTimeout(resolve, delay));
    } catch (error) {
      console.error('Error checking video status:', error);
      attempts++;
      await new Promise(resolve => setTimeout(resolve, delayBetweenAttempts));
    }
  }

  throw new Error('Video processing timed out');
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  
  if (!session?.accessToken) {
    return NextResponse.json(
      { error: 'Not authenticated' },
      { status: 401 }
    );
  }

  try {
    const formData = await req.formData();
    const file = formData.get('file') as File | null;
    
    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    const mediaType = file.type.startsWith('video/') ? 'video' : 'image';
    console.log('Processing:', { mediaType, fileType: file.type, fileSize: file.size });

    const [profileResponse] = await Promise.all([
      fetch('https://api.linkedin.com/v2/me', {
        headers: { 'Authorization': `Bearer ${session.accessToken}` },
      }),
      (async () => {
        if (mediaType === 'video') {
          if (file.size > 200 * 1024 * 1024) {
            throw new Error('Video file size must be less than 200MB');
          }
          if (!file.type.startsWith('video/mp4')) {
            throw new Error('Only MP4 videos are supported');
          }
        }
      })()
    ]);

    if (!profileResponse.ok) {
      throw new Error('Failed to fetch LinkedIn profile');
    }

    const profileData = await profileResponse.json();
    const memberId = profileData.id;

    const fileBufferPromise = file.arrayBuffer();
    const { uploadUrl, asset, headers } = await registerMediaWithLinkedIn(
      session.accessToken,
      memberId,
      mediaType
    );

    console.log('Uploading to URL:', uploadUrl);
    console.log('Asset:', asset);

    const arrayBuffer = await fileBufferPromise;
    const uploadResponse = await fetch(uploadUrl, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${session.accessToken}`,
        'Content-Type': file.type,
        'X-Restli-Protocol-Version': '2.0.0',
        ...headers
      },
      body: arrayBuffer
    });

    if (!uploadResponse.ok) {
      const errorText = await uploadResponse.text();
      console.error('Upload error response:', errorText);
      throw new Error(`Failed to upload media to LinkedIn: ${errorText}`);
    }

    if (mediaType === 'video') {
      console.log('Waiting for video processing...');
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      const isProcessed = await waitForVideoProcessing(session.accessToken, asset);
      if (!isProcessed) {
        throw new Error('Video processing failed or timed out');
      }
      console.log('Video processing completed successfully');
    }

    return NextResponse.json({
      success: true,
      assetId: asset,
      mediaType
    });

  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { error: String(error) },
      { status: 500 }
    );
  }
}