import { NextResponse } from "next/server";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-config";
import prisma from "@/lib/prisma";

interface UploadedMedia {
  assetId: string;
  type: "video" | "image";
  previewUrl: string;
  fileName: string;
}

interface DraftData {
  content: string;
  media?: UploadedMedia[];
  networks: string[];
  scheduledDateTime?: string;
}

const s3Client = new S3Client({
  region: process.env.AWS_REGION!,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

async function uploadMediaToS3(
  userId: string,
  draftIdentifier: string,
  mediaItem: UploadedMedia
): Promise<string> {
  const key = `drafts/${userId}/${draftIdentifier}/${mediaItem.fileName}`;
  const response = await fetch(mediaItem.previewUrl);
  const buffer = Buffer.from(await response.arrayBuffer());
  
  await s3Client.send(
    new PutObjectCommand({
      Bucket: process.env.AWS_BUCKET_NAME!,
      Key: key,
      Body: buffer,
      ContentType: mediaItem.type === "video" ? "video/mp4" : "image/jpeg",
    })
  );
  
  return `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`;
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
    }

    const userId = session.user.id;
    const { content, media, networks, scheduledDateTime }: DraftData = await request.json();
    
    if (!content || !networks?.length) {
      return NextResponse.json(
        { error: "Le contenu et au moins un réseau sont requis" },
        { status: 400 }
      );
    }

    const draft = await prisma.draft.create({
      data: {
        userId,
        content,
        mediaUrls: [],
        networks,
        scheduledFor: scheduledDateTime ? new Date(scheduledDateTime) : null,
        status: "draft",
      },
    });

    let mediaUrls: string[] = [];
    if (media && Array.isArray(media)) {
      mediaUrls = await Promise.all(
        media.map((mediaItem) => uploadMediaToS3(userId, draft.id.toString(), mediaItem))
      );

      await prisma.draft.update({
        where: { id: draft.id },
        data: { mediaUrls },
      });
    }

    return NextResponse.json({
      success: true,
      draft: {
        id: draft.id,
        content: draft.content,
        networks: draft.networks,
        scheduledFor: draft.scheduledFor,
        mediaUrls,
        status: draft.status,
      },
    });
  } catch (error) {
    console.error("Erreur lors de la sauvegarde du brouillon:", error);
    return NextResponse.json(
      { error: "Une erreur est survenue lors de la sauvegarde du brouillon" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
    }

    const userId = session.user.id;
    
    const drafts = await prisma.draft.findMany({
      where: { userId },
      orderBy: { updatedAt: "desc" },
      select: {
        id: true,
        content: true,
        networks: true,
        mediaUrls: true,
        scheduledFor: true,
        status: true,
        createdAt: true,
        updatedAt: true,
      },
    });
    
    return NextResponse.json({ success: true, drafts });
  } catch (error) {
    console.error("Erreur lors de la récupération des brouillons:", error);
    return NextResponse.json(
      { error: "Une erreur est survenue lors de la récupération des brouillons" },
      { status: 500 }
    );
  }
}