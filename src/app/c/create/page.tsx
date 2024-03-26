"use client";

import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import React, { useState } from "react";
import axios, { AxiosError } from "axios";
import { CreateCommunityPayload } from "@/lib/validators/community";
import { useCustomToasts } from "@/hooks/use-custom-toast";
import { toast } from "@/components/ui/use-toast";

const Page = () => {
  const [input, setInput] = useState<string>("");
  const router = useRouter();
  const { loginToast } = useCustomToasts();

  const { mutate: Create_Community, isLoading } = useMutation({
    mutationFn: async () => {
      const payload: CreateCommunityPayload = {
        name: input,
      };
      const { data } = await axios.post("/api/community", payload);
      return data as string;
    },

    onError: (err) => {
      if (err instanceof AxiosError) {
        if (err.response?.status === 409) {
          return toast({
            title: "Community already exists.",
            description: " Please choose a different name ",
            variant: "destructive",
          });
        }
        if (err.response?.status === 422) {
          return toast({
            title: "Invalid community name",
            description: " Please choose a name between 3-21 characters",
            variant: "destructive",
          });
        }
        if (err.response?.status === 401) {
          return loginToast();
        }
      }
      toast({
        title: "There was an error",
        description: "Couldn't create community.",
        variant: "destructive",
      });
    },
    onSuccess: (data) => {
      router.push(`/c/${data}`);
    },
  });

  return (
    <div className="container flex items-center h-full max-w-3xl mx-auto rounded-xl ">
      <div className="relative h-fit p-4 space-y-6 rounded-xl shadow-lg bg-white w-full">
        <div className="flex justify-between items-center">
          <h1 className=" text-xl font-semibold">Create Community</h1>
        </div>
        <hr />
        <div className="div">
          <p className="text-lg font-medium">Community Name</p>
          <p className="text-xs pb-2 text-zinc-500">Community names including capitalization cannot be changed</p>
          <div className="relative">
            <p className="absolute text-md left-0 w-8 inset-y-0 grid place-content-center text-zinc-400">c/</p>
            <Input className="pl-6 rounded-xl mt-2" value={input} onChange={(e) => setInput(e.target.value)} />
          </div>
          <p className=" text-xs text-zinc-500 mt-1">This is your public display community name </p>
        </div>
        <div className="flex justify-end gap-5">
          <Button onClick={() => Create_Community()} isLoading={isLoading} disabled={input.length === 0} variant="default" className="rounded-xl">
            Create Community
          </Button>
          <Button onClick={() => router.back()} variant="default" className="rounded-xl">
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Page;
