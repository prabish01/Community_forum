"use client";

import { INFINITE_SCROLL_PAGINATION_RESULT } from "@/config";
import { ExtendedPost } from "@/types/db.d";
import { useIntersection } from "@mantine/hooks";
import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
import { useSession } from "next-auth/react";
import React, { useRef } from "react";
import Post from "./Post";

interface PostfeedProps {
  initialPosts: ExtendedPost[];
  communityName?: string;
}

const Postfeed = ({ initialPosts, communityName }: PostfeedProps) => {
  const lastPostRef = useRef<HTMLElement>(null);
  const { ref, entry } = useIntersection({
    root: lastPostRef.current,
    threshold: 1,
  });

  const { data: session } = useSession();

  const { data, fetchNextPage, isFetchingNextPage } = useInfiniteQuery(
    ["infinite-query"],
    async ({ pageParam = 1 }) => {
      const query = `/api/posts?limit=${INFINITE_SCROLL_PAGINATION_RESULT}&page=${pageParam}` + (!!communityName ? `&communityName=${communityName}` : "");

      const { data } = await axios.get(query);
      return data as ExtendedPost[];
    },
    {
      getNextPageParam: (_, pages) => {
        return pages.length + 1;
      },
      initialData: { pages: [initialPosts], pageParams: [1] },
    }
  );

  const posts = data?.pages.flatMap((page) => page) ?? initialPosts;

  return (
    <ul className="flex flex-col col-span-2 space-y-6">
      {posts.map((post, index) => {
        const votesAmt = post.votes.reduce((acc, vote) => {
          if (vote.type === "UP") {
            return acc + 1;
          }
          if (vote.type === "DOWN") {
            return acc - 1;
          }
          return acc;
        }, 0);

        const currentVote = post.votes.find((vote) => vote.userId === session?.user.id);

        if (index === posts.length - 1) {
          return (
            <li key={post.id} ref={ref}>
              <Post commentAmt={post.comments.length} post={post} communityName={post.community.name} votesAmt={votesAmt} currentVote={currentVote} />
            </li>
          );
        } else {
          return <Post commentAmt={post.comments.length} post={post} communityName={post.community.name} votesAmt={votesAmt} currentVote={currentVote} />;
        }
      })}
    </ul>
  );
};

export default Postfeed;
