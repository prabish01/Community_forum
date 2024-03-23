// "use client";

import Link from "next/link";
import { Icons } from "./Icons";
import { Button } from "./ui/Button";
// import { Session } from "inspector";
// import { get } from "http";
import { getAuthSession } from "@/lib/auth";
import UserAccountNav from "./UserAccountNav";

const Navbar = async () => {
  const session = await getAuthSession();
  return (
    <div className="top-0 inset-x-0 h-fit border-b bg-zinc-100 border-zinc-300 py-2 ">
      <div className="container h-full mx-auto text-orange-400 flex items-center justify-between max-w-7xl">
        {/* logo */}
        <Link href={"/"} className="flex gap-2 items-center ">
          <Icons.Nav_icon />
          <p className=" font-bold md:block">Community Forum</p>
        </Link>
        {/* loginBtn */}

        {/* searchbar */}

        {session?.user ? (
          // <p>you are logged in</p>
          <UserAccountNav user={session.user} />
        ) : (
          <Link href={"/sign-in"}>
            <Button className="bg-orange-400 hover:bg-orange-500 ">Sign in</Button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
