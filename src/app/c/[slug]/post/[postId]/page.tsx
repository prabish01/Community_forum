import PostVoteServer from "@/components/post-vote/PostVoteServer";
import { Button } from "@/components/ui/Button";
import { db } from "@/lib/db";
import { redis } from "@/lib/redis";
import { formatTimeToNow } from "@/lib/utils";
import { CachedPost } from "@/types/redis.d";
import { Post, User, Vote } from "@prisma/client";
import { ArrowBigDown, ArrowBigUp, Loader } from "lucide-react";
import { notFound } from "next/navigation";
import React, { Suspense } from "react";

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
    return notFound();
  }
  return (
    <div className="div">
      <Suspense fallback={<PostVoteShell />}>
        {/* @ts-expect-error server component */}
        <PostVoteServer
          postId={post?.id ?? cachedPost.id}
          getData={async () => {
            return await db.post.findUnique({
              where: {
                id: params.postId,
              },
              include: {
                votes: true,
              },
            });
          }}
        />
      </Suspense>
      <div className="div1">
        <p>
          Posted by f/{post?.author.username ?? cachedPost.authorUsername} {''} 
        {formatTimeToNow(new Date(post?.createdAt?? cachedPost.createdAt))}
        </p>
        <h1>
          {post?.title?? cachedPost.title}
        </h1>
          </div>


    </div>
  );
};

function PostVoteShell() {
  return (
    <div className="div">
      <Button>
        <ArrowBigUp className="h-5 w-5" />
      </Button>

      {/* score */}
      <Button>
        <Loader className="h-3 w-3" />
      </Button>

      {/* downvote */}
      <Button>
        <ArrowBigDown className="h-5 w-5" />
      </Button>
    </div>
  );
}

export default page;
