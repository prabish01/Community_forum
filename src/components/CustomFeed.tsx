import { INFINITE_SCROLL_PAGINATION_RESULT } from "@/config";
import { db } from "@/lib/db";
import React from "react";
import { getAuthSession } from "@/lib/auth";
import PostFeed from "@/components/PostFeed";



const CustomFeed = async () => {
  const session = await getAuthSession();

  const followedCommunities = await db.subscription.findMany({
    where: {
      userId: session?.user.id,
    },
    include: {
      community: true,
    },
  });

  const posts = await db.post.findMany({
    where: {
      community: {
        name: {
          in: followedCommunities.map(({ community }) => community.id),
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
    include: {
      community: true,
      votes: true,
      author: true,
      comments: true,
    },
    take: INFINITE_SCROLL_PAGINATION_RESULT,
  });

  return <PostFeed initialPosts={posts} />;
};

export default CustomFeed;
