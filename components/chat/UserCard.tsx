import { UserDocument } from "@/models/user-model";
import React from "react";
import { Avatar, AvatarImage } from "../ui/avatar";

type UserCardProps = {
  user: UserDocument;
  handleSelectUser: (user: UserDocument) => void;
  selectedUser: UserDocument | null;
};

const UserCard = ({ user, handleSelectUser, selectedUser }: UserCardProps) => {
  const isSelected = selectedUser?._id === user._id;
  return (
    <div
      className={`flex items-center gap-2 border-b border-b-sigColorBgBorder p-1 hover:bg-sigBackgroundFeedHover cursor-pointer ${
        isSelected ? "bg-green-600 hover:bg-green-600" : ""
      }`}
      onClick={() => handleSelectUser(user)}
    >
      <Avatar className="cursor-pointer hover:bg-sigButtonSecondaryHover">
        <AvatarImage src={user?.avatar} />
      </Avatar>
      <span>{user.fullName}</span>
    </div>
  );
};

export default UserCard;
