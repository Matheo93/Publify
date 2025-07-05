import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-config";

interface MediaShare {
  id: string;
  type: "video" | "image";
}

interface PostRequest {
  content: string;
  media?: MediaShare[];
}

interface LinkedInPostBody {
  author: string;
  lifecycleState: string;
  visibility: {
    "com.linkedin.ugc.MemberNetworkVisibility": string;
  };
  specificContent?: {
    "com.linkedin.ugc.ShareContent": {
      shareCommentary: {
        text: string;
      };
      shareMediaCategory: string;
      media?: Array<{
        status: string;
        media: string;
        title: {
          text: string;
        };
        description?: {
          text: string;
        };
      }>;
    };
  };
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session?.accessToken) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  try {
    const { content, media = [] } = (await req.json()) as PostRequest;

    const profileResponse = await fetch("https://api.linkedin.com/v2/me", {
      headers: {
        Authorization: `Bearer ${session.accessToken}`,
      },
    });

    if (!profileResponse.ok) {
      throw new Error("Failed to fetch LinkedIn profile");
    }

    const profileData = await profileResponse.json();
    const authorId = `urn:li:person:${profileData.id}`;

    const postBody: LinkedInPostBody = {
      author: authorId,
      lifecycleState: "PUBLISHED",
      visibility: {
        "com.linkedin.ugc.MemberNetworkVisibility": "PUBLIC",
      },
    };

    // Construction du contenu selon le type de média
    if (media.length > 0) {
      const primaryMedia = media[0];

      if (primaryMedia.type === "video") {
        postBody.specificContent = {
          "com.linkedin.ugc.ShareContent": {
            shareCommentary: {
              text: content,
            },
            shareMediaCategory: "VIDEO",
            media: [
              {
                status: "READY",
                media: primaryMedia.id,
                title: {
                  text: "Video Upload",
                },
                description: {
                  text: content.substring(0, 200), // LinkedIn limite la description
                },
              },
            ],
          },
        };
      } else {
        postBody.specificContent = {
          "com.linkedin.ugc.ShareContent": {
            shareCommentary: {
              text: content,
            },
            shareMediaCategory: "IMAGE",
            media: media.map((item) => ({
              status: "READY",
              media: item.id,
              title: {
                text: "Image Upload",
              },
            })),
          },
        };
      }
    } else {
      // Post texte uniquement
      postBody.specificContent = {
        "com.linkedin.ugc.ShareContent": {
          shareCommentary: {
            text: content,
          },
          shareMediaCategory: "NONE",
        },
      };
    }

    console.log("Sending post body:", JSON.stringify(postBody, null, 2));

    const response = await fetch("https://api.linkedin.com/v2/ugcPosts", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${session.accessToken}`,
        "Content-Type": "application/json",
        "X-Restli-Protocol-Version": "2.0.0",
        "LinkedIn-Version": "202304",
      },
      body: JSON.stringify(postBody),
    });

    const responseText = await response.text();
    console.log("LinkedIn API response:", responseText);

    if (!response.ok) {
      throw new Error(`Failed to post to LinkedIn: ${responseText}`);
    }

    let responseData;
    try {
      responseData = JSON.parse(responseText);
    } catch {
      responseData = { id: "Post created" };
    }

    return NextResponse.json({
      success: true,
      data: responseData,
    });
  } catch (error) {
    console.error("LinkedIn API error:", error);
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}
