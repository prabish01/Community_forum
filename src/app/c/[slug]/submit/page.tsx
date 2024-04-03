import Editor from "@/components/Editor";
import { Button } from "@/components/ui/Button";
import { db } from "@/lib/db";
import { notFound } from "next/navigation";
import React from "react";

interface PageProps {
  params: { slug: string };
}

const Page = async ({ params }: PageProps) => {
  const community = await db.community.findFirst({
    where: {
      name: params.slug,
    },
  });

  if (!community) {
    return notFound();
  }
  return (
    <div className="container flex flex-col gap-5  items-start">
      <div className="border-b border-gray-200 pb-4">
        <div className="flex flex-wrap gap-1.5 items-baseline">
          <h3 className="font-semibold leading-6">Create Post</h3>
          <p className="truncate text-sm text-gray-500">in c/{params.slug}</p>
        </div>
      </div>

      {/* //   form */}
      <Editor communityId={community.id}  />

      <div className="w-full flex justify-end">
        <Button type="submit" className="w-full rounded-xl" form="community-post-form">
          Post
        </Button>
      </div>
    </div>
  );
};

export default Page;
