// src/app/api/twitter/post/route.ts
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-config";

interface MediaItem {
  id: string;
  type: string;
}

interface TweetRequest {
  content: string;
  media?: MediaItem[];
  scheduledAt?: string | null;
}

interface TweetBody {
  text: string;
  media?: {
    media_ids: string[];
  };
  scheduled_time?: number;
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session?.accessToken) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  try {
    const { content, media, scheduledAt }: TweetRequest = await req.json();

    // Préparation du corps de la requête Twitter avec le bon typage
    const tweetBody: TweetBody = {
      text: content,
    };

    // Si des médias sont fournis, les ajouter à la requête
    if (media && media.length > 0) {
      tweetBody.media = {
        media_ids: media.map((m) => m.id),
      };
    }

    // Ajouter la programmation si nécessaire
    if (scheduledAt) {
      tweetBody.scheduled_time = new Date(scheduledAt).getTime();
    }

    // Appel à l'API Twitter
    const twitterResponse = await fetch("https://api.twitter.com/2/tweets", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${session.accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(tweetBody),
    });

    if (!twitterResponse.ok) {
      const errorData = await twitterResponse.json();
      throw new Error(errorData.detail || "Failed to post to Twitter");
    }

    const data = await twitterResponse.json();
    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error("Twitter API error:", error);
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}
