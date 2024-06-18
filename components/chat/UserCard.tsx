import { UserDocument } from "@/models/user-model";
import React from "react";
import { Avatar, AvatarImage } from "../ui/avatar";

type UserCardProps = {
  user: UserDocument;
};

const UserCard = ({ user }: UserCardProps) => {
  return (
    <div className="flex items-center gap-2 border-b border-b-sigColorBgBorder p-1 hover:bg-sigBackgroundFeedHover cursor-pointer">
      <Avatar className="cursor-pointer hover:bg-sigButtonSecondaryHover">
        <AvatarImage src={user?.avatar} />
      </Avatar>
      <span>{user.fullName}</span>
    </div>
  );
};

export default UserCard;
