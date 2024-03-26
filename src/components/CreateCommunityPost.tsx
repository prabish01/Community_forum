import { Session } from "next-auth";
import { usePathname, useRouter } from "next/navigation";
import UserAvatar from "./UserAvatar";

interface CreateCommunityPostProps {
  session: Session | null;
}

const CreateCommunityPost = ({ session }: CreateCommunityPostProps) => {
  //   const router = useRouter();
  //   const pathname = usePathname();
  return (
    <div className=" bg-white rounded-md shadow-lg">
      <div className=" h-full px-6 py-4">
        <div className="relative">
          <UserAvatar
            user={{
              name: session?.user.name || null,
              image: session?.user.image || null,
            }}
          />

          <span className="absolute outline outline-2 bottom-0 right-0 bg-green-500 outline-white h-3 w-3 rounded-full" />
        </div>
      </div>
    </div>
  );
};

export default CreateCommunityPost;
