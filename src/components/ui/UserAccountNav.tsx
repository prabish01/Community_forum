import { DropdownMenu, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { User } from "next-auth";
import React from "react";
import { UserAvatar } from "./UserAvatar";

interface UserAccountNavProps {
  user: Pick<User, "name" | "image" | "email">;
}

export const UserAccountNav = ({ user }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <UserAvatar user={user} />
      </DropdownMenuTrigger>
    </DropdownMenu>
  );
};
