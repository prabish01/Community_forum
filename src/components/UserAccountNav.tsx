"use client";

import { DropdownMenu, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/DropdownMenu";
import { User } from "next-auth";
import React, { FC } from "react";
import UserAvatar from "./UserAvatar";
import { DropdownMenuContent } from "./ui/DropdownMenu";
import Link from "next/link";
import { signOut } from "next-auth/react";

interface UserAccountNavProps {
  user: Pick<User, "name" | "image" | "email">;
}

const UserAccountNav: FC<UserAccountNavProps> = ({ user }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <UserAvatar
          className="h-8 w-8"
          user={{
            name: user.name || undefined,
            image: user.image || undefined,
          }}
        />
      </DropdownMenuTrigger>

      <DropdownMenuContent className="bg-white shadow-md " align="end">
        <div className="flex items-center justify-start gap-2 p-2">
          <div className="flex flex-col px-5 space-y-1  leading-none">
            {user.name && <p className=" font-medium">{user.name}</p>}
            {user.email && <p className=" w-[-200px] truncate text-sm text-zinc-700">{user.email}</p>}
          </div>
        </div>
        <DropdownMenuSeparator />

        <DropdownMenuItem>
          <Link href={"/"}>Feed</Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link href={"/c/create"}>Create Community</Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link href={"/"}>Settings</Link>
        </DropdownMenuItem>
        {/* <DropdownMenuItem>
          <Link href={"/"}>Feed</Link>
        </DropdownMenuItem> */}

        <DropdownMenuSeparator />
        <DropdownMenuItem
          onSelect={(event) => {
            event.preventDefault();
            signOut({
              callbackUrl: `${window.location.origin}/sign-in`,
            });
          }}
          className="cursor-pointer"
        >
          Sign Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserAccountNav;
