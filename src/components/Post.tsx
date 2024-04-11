import { formatTimeToNow } from "@/lib/utils";
import { MessageSquare } from "lucide-react";
import React, { useRef } from "react";
import EditorOutput from "./EditorOutput";
import PostVoteClient from "./post-vote/PostVoteClient";
import { Post, User, Vote } from "@prisma/client";

type PartialVote = Pick<Vote, "type">;

interface PostProps {
  communityName: string;
  post: Post & {
    author: User;
    votes: Vote[];
  };
  commentAmt: number;
  votesAmt: number;
  currentVote?: PartialVote;
}

const Post = ({ communityName, post, commentAmt, votesAmt,currentVote }: PostProps) => {
  const pRef = useRef<HTMLDivElement>(null);
  return (
    <div className="bg-white shadow rounded-md">
      <div className="px-6 py-4 flex justify-between">
        <PostVoteClient postId={post.id} initialVote={currentVote?.type} initialVotesAmt={votesAmt} />
        <div className="w-0 flex-1">
          <div className="max-h-40 mt-1 text-xs text-gray-500">
            {communityName ? (
              <>
                <a className="underline text-zinc-900 text-sm underline-offset-2" href={`/c/${communityName}`}>
                  c/{communityName}
                </a>
                <span className="px-1">•</span>
              </>
            ) : null}
            <span>Posted by s/{post.author.name}</span>
            <span className="ml-2">{formatTimeToNow(new Date(post.createdAt))}</span>
          </div>
          <a href={`/c/${communityName}/post/${post.id}`}>
            <h1 className="text-lg font-bold py-2 leading-6 text-gray-900">{post.title}</h1>
          </a>

          <div ref={pRef} className="relative">
            <EditorOutput content={post.content} />

            {pRef.current?.clientHeight === 160 ? <div className="absolute  bottom-0 left-0 h-24 w-full bg-gradient-to-t from-black to-transparent"></div> : null}
          </div>
        </div>
      </div>

      <div className="bg-gray-50 z-20 text-sm p-4 sm:px-6">
        <a className="w-fit flex items-center gap-2" href={`/c/${communityName}/post/${post.id}`}>
          <MessageSquare className="h-4 w-4" />
          {commentAmt} comments
        </a>
      </div>
    </div>
  );
};

export default Post;
