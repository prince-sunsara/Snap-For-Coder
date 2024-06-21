import React from "react";
import { Avatar, AvatarImage } from "../ui/avatar";

const ChatUserInfo = () => {
  const username = "xxx";
  let avatarUrl;
  return (
    <div className="cursor-pointer bg-sigButtonSecondary hover:bg-sigButtonSecondaryHover rounded-full flex gap-2 items-center py-1 px-2 text-white font-semibold">
      <Avatar className="h-8 w-8 rounded-full flex items-center justify-center">
        <AvatarImage src={avatarUrl || "/logo.svg"} />
      </Avatar>
      <span>{username}</span>
    </div>
  );
};

export default ChatUserInfo;
