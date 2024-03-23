import { Button } from "@/components/ui/Button";
import { HomeIcon } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="container">
      <h1 className=" font-bold text-2xl md:text-4xl">Your Feed</h1>
      <div className="grid grid-col-1 md:grid-col-3 md:gap-x-5  gap-y-5 py-6">
        {/* <div className="bg-red-900">hello</div>
        <div className="bg-red-900">hello</div>
        <div className="bg-red-900">hello</div> */}

        {/* feed */}

        {/* subreddit info */}
        <div className="overflow-hidden h-fit rounded-xl border border-gray-200 order-first md:order-last">
          {/* <div className="text-yellow-300">hello1</div>
          <div className="text-yellow-300">hello2</div>
          <div className="text-yellow-300">hello3</div> */}
          <div className="bg-emerald-100 px-6 py-4">
            <p className=" font-medium flex gap-2 items-center">
              <HomeIcon className="h-3.4 w-3.5" />
              Home
            </p>
          </div>
          <div className=" -my-3 divide-y divide-gray-100 px-6 py-4 text-sm leading-6 items-center">
            <div className="flex justify-center gap-x-4 py-3  ">
              <p className="text-zinc-500 text-center">This is your personal community forum homepage. Come here to get along with your favourite communities.</p>
            </div>
            <Link href="/c/create">
              <Button className="w-full rounded-xl mt-4 mb-5" variant="default">
                Create Community
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
