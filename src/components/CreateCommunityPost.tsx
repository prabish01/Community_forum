"use client";

import { Session } from "next-auth";
import { usePathname, useRouter } from "next/navigation";
import UserAvatar from "./UserAvatar";
import { Input } from "./ui/Input";
import { Button } from "./ui/Button";
import { ImageIcon, Link2 } from "lucide-react";

interface CreateCommunityPostProps {
  session: Session | null;
}

const CreateCommunityPost = ({ session }: CreateCommunityPostProps) => {
  const router = useRouter();
  const pathname = usePathname();
  return (
    <div className=" bg-white rounded-md shadow-lg">
      <div className=" h-full sm:flex sm:justify-between gap-6 px-6 py-4">
        <div className="relative">
          <UserAvatar
            user={{
              name: session?.user.name || null,
              image: session?.user.image || null,
            }}
          />

          <span className="absolute outline outline-2 bottom-0 right-0 bg-green-500 outline-white h-3 w-3 rounded-full" />
        </div>
        <Input className="rounded-xl" readOnly placeholder="Write something...." onClick={() => router.push(pathname + "/submit")} />
        <Button variant="ghost" onClick={() => router.push(pathname + "/submit")}>
          <ImageIcon className="text-zinc-600" />
        </Button>
        <Button variant="ghost" onClick={() => router.push(pathname + "/submit")}>
          <Link2 className="text-zinc-600" />
        </Button>
      </div>
    </div>
  );
};

export default CreateCommunityPost;
