import CreateCommunityPost from "@/components/CreateCommunityPost";
import PostFeed from "@/components/PostFeed";
import { INFINITE_SCROLL_PAGINATION_RESULT } from "@/config";
import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { notFound } from "next/navigation";

interface PageProps {
  params: {
    slug: string;
  };
}

const Page = async ({ params }: PageProps) => {
  const { slug } = params;

  const session = await getAuthSession();

  const community = await db.community.findFirst({
    where: { name: slug },
    include: {
      posts: {
        include: {
          author: true,
          votes: true,
          comments: true,
          community: true,
        },
        orderBy: {
          createdAt: "desc",
        },
        take: INFINITE_SCROLL_PAGINATION_RESULT,
        // take: 10,
      },
    },
  });

  if (!community) {
    return notFound();
  }

  return (
    <div className="container">
      <h1 className="font-bold text-2xl  text-slate-7 00">c/{community.name}</h1>
      <div className="post">
        <CreateCommunityPost session={session} />
        <PostFeed initialPosts={community.posts} communityName={community.name} />
      </div>
    </div>
  );
};

export default Page;
