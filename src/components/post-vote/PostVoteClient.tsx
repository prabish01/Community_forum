import React, { useEffect, useState } from "react";

import { VoteType } from "@prisma/client";
import { useCustomToast } from "@/hooks/use-custom-toast";
// import { number } from "zod";
import { usePrevious } from "@mantine/hooks";
import { Button } from "../ui/Button";
import { ArrowBigDown, ArrowBigUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { useMutation } from "@tanstack/react-query";
import { PostVoterRequest } from "@/lib/validators/vote";
import axios from "axios";

interface PostVoteClientProps {
  postId: string;
  initialVotesAmt: number;
  initialVote?: VoteType | number;
}

const PostVoteClient = ({ postId, initialVotesAmt, initialVote }: PostVoteClientProps) => {
  const { loginToast } = useCustomToast();
  const [VotesAmt, setVotesAmt] = useState<number>(initialVotesAmt);
  const [CurrentVote, setCurrentVote] = useState(initialVote);
  const prevVote = usePrevious(CurrentVote);

  useEffect(() => {
    setCurrentVote;
    initialVote;
  }, [initialVote]);

  const { } = useMutation({
    mutationFn: async (type: VoteType) => {
      const payload: PostVoterRequest = {
        postId,
        voteType: type,
      };
       await axios.patch("/api/community/vote/post", payload); 
      }
  })

  return (
    <div className="flex sm:flex-col gap-4 pr-6 sm:w-20 pb-4 sm:pb-0">
      <Button variant="ghost" aria-label="upvote">
        <ArrowBigUp className={cn("h-5 w-5 text-zinc-700", { "text-emerald-500 fill-emerald-500": CurrentVote === "UP" })} />
      </Button>

      <p className="text-center py-2 font-medium text-sm text-zinc-900">{VotesAmt}</p>

      <Button variant="ghost" aria-label="downvote">
        <ArrowBigDown className={cn("h-5 w-5 text-zinc-700", { "text-red-500 fill-red-500": CurrentVote === "DOWN" })} />
      </Button>
    </div>
  );
};

export default PostVoteClient;
