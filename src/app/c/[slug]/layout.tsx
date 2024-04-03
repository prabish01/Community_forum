import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { notFound } from "next/navigation";
import React, { ReactNode } from "react";
import { format } from "date-fns";
import SubscribeLeaveToggle from "@/components/SubscribeLeaveToggle";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { PencilIcon } from "lucide-react";

const Layout = async ({ children, params: { slug } }: { children: ReactNode; params: { slug: string } }) => {
  const session = await getAuthSession();
  const community = await db.community.findFirst({
    where: {
      name: slug,
    },
    include: {
      posts: {
        include: {
          author: true,
          votes: true,
        },
      },
    },
  });

  const subscription = !session?.user
    ? undefined
    : await db.subscription.findFirst({
        where: {
          community: {
            name: slug,
          },
          user: {
            id: session.user.id,
          },
        },
      });
  const isSubscribed = !!subscription;
  if (!community) {
    return notFound();
  }

  const memberCount = await db.subscription.count({
    where: {
      community: {
        name: slug,
      },
    },
  });

  return (
    <div className="1s max-w-7xl sm:container mx-auto h-full pt-12">
      <div>
        {/* todo */}
        <div className="2 grid grid-cols-1 md:grid-cols-3 gap-y-4 md:gap-y-4 py-6">
          <div className="3 flex flex-col col-span-2 space-y-6">{children}</div>
          {/* sidebar */}
          <div className=" md:block overflow-hidden h-fit rounded-xl border border-gray-200 order-first md:order-last">
            <div className="px-6 py-4">
              <p className="font-bold text-gray-700">About c/{community.name}</p>
            </div>
            {community.creatorId === session?.user.id ? (
              <div className="px-6 flex justify-between gap-x-4 y-3">
                <p className="text-gray-500">You created this community</p>
              </div>
            ) : null}
            <dl className="divide-y px-6 py-4 text-sm leading-6">
              <div className="flex justify-between gap-x-4 y-3">
                <dt className="text-gray-500">Created At: </dt>
                <dd className="text-gray-800">
                  <time dateTime={community.createdAt.toDateString()}>{format(community.createdAt, "MM-dd-YYY")}</time>
                </dd>
              </div>
              <div className="flex justify-between gap-x-4 y-3">
                <dt className="text-gray-500">Members</dt>
                <dd className="text-gray-700">
                  <div className="text-gray-900">{memberCount}</div>
                </dd>
              </div>
              {community.creatorId !== session?.user?.id ? <SubscribeLeaveToggle isSubscribed={isSubscribed} communityId={community.id} communityName={community.name} /> : null}
              <Link href={`c/${slug}/submit`}>
                <Button variant="outline" className="w-full rounded-xl">
                  Create Post <PencilIcon className="h-4 w-4 ml-4" />
                </Button>
              </Link>
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
