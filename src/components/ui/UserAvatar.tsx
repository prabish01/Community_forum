import { User } from "next-auth";
import React from "react";

interface UserAvatarProps {
  user: Pick<User, "name" | "image">;
}

export const UserAvatar = ({user}) => {
  return (
 <></>
  );
};
