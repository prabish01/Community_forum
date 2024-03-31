"use client";

import React, { startTransition } from "react";
import { Button } from "./ui/Button";
import { useMutation } from "@tanstack/react-query";
import { SubscribeToCommunityPayload } from "@/lib/validators/community";
import axios, { AxiosError } from "axios";
import { useCustomToast } from "@/hooks/use-custom-toast";
import { toast } from "./ui/use-toast";
import { useRouter } from "next/navigation";

interface SubscribeLeaveToggleProps {
  communityId: string;
  communityName: string;
  isSubscribed: boolean;
}

const SubscribeLeaveToggle = ({ communityId, communityName, isSubscribed }: SubscribeLeaveToggleProps) => {
  const router = useRouter();
  const { loginToast } = useCustomToast();
  const { mutate: subscribe, isLoading: isSubLoading } = useMutation({
    mutationFn: async () => {
      const payload: SubscribeToCommunityPayload = {
        communityId,
      };

      const { data } = await axios.post("/api/community/subscribe", payload);
      return data as string;
    },

    onError: (err) => {
      if (err instanceof AxiosError) {
        if (err.response?.status === 401) {
          return loginToast();
        }
      }
      return toast({
        title: "There was a problem",
        description: "Something went wrong, please try again later",
        variant: "destructive",
      });
    },

    onSuccess: () => {
      startTransition(() => {
        router.refresh();
      });
      return toast({
        title: "Subscribed",
        description: `You are now subscribed to c/${communityName}`,
      });
    },
  });
  const { mutate: unsubscribe, isLoading: isUnsubLoading } = useMutation({
    mutationFn: async () => {
      const payload: SubscribeToCommunityPayload = {
        communityId,
      };

      const { data } = await axios.post("/api/community/unsubscribe", payload);
      return data as string;
    },

    onError: (err) => {
      if (err instanceof AxiosError) {
        if (err.response?.status === 401) {
          return loginToast();
        }
      }
      return toast({
        title: "There was a problem",
        description: "Something went wrong, please try again later",
        variant: "destructive",
      });
    },

    onSuccess: () => {
      startTransition(() => {
        router.refresh();
      });
      return toast({
        title: "UnSubscribed",
        description: `You are now unsubscribed from c/${communityName}`,
      });
    },
  });

  // const isSubscribed = false;
  return isSubscribed ? (
    <Button onClick={() => unsubscribe()} isLoading={isUnsubLoading} className=" w-full mt-4 mb-4 rounded-xl">
      Unsubscribe
    </Button>
  ) : (
    <Button isLoading={isSubLoading} onClick={() => subscribe()} className=" w-full mt-4 mb-4 rounded-xl">
      Subscribe
    </Button>
  );
};

export default SubscribeLeaveToggle;
