import { db } from "@/lib/db";
import { redis } from "@/lib/redis";
import { CachedPost } from "@/types/redis.d";
import { Post, User, Vote } from "@prisma/client";
import { notFound } from "next/navigation";
import React from "react";

interface PageProps {
  params: {
    postId: string;
  };
}

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

const page = async ({ params }: PageProps) => {
  const cachedPost = (await redis.hgetall(`post:${params.postId}`)) as CachedPost;

  let post: (Post & { votes: Vote[]; author: User }) | null = null;

  if (!cachedPost) {
    post = await db.post.findUnique({
      where: {
        id: params.postId,
      },
      include: {
        votes: true,
        author: true,
      },
    });
    }
    
    if (!post && !cachedPost) {
        return notFound()
    }
  return <div>page</div>;
};

export default page;
