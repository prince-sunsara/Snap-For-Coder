import Link from "next/link";
import React from "react";
import { Avatar, AvatarImage } from "../ui/avatar";
import Image from "next/image";

type chatProps = {
  chat: any;
};

const Chat = ({ chat }: chatProps) => {
  const userToChat = chat.participants[0];
  return (
    <Link href={`/chat/${userToChat?._id}`}>
      <li className="flex items-center p-2 bg-sigSurface hover:bg-sigBackgroundFeedHover cursor-pointer border-b border-b-sigColorBgBorder">
        <Avatar className="w-14 h-14 bg-black">
          <AvatarImage src={userToChat?.avatar} />
        </Avatar>

        <div className="ml-3">
          <p>{userToChat?.fullName}</p>
        </div>

        <Image
          src={"/camera.svg"}
          width={0}
          height={0}
          style={{ width: "20px", height: "20px" }}
          alt="Camera Image"
          className="ml-auto hover:scale-95"
        />
      </li>
    </Link>
  );
};

export default Chat;
