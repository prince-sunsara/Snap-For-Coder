import { auth } from "@/auth";
import React from "react";
import LogoutButton from "../shared/LogoutButton";
import { Button } from "../ui/button";
import { Avatar, AvatarImage } from "../ui/avatar";
import Image from "next/image";
import { SearchIcon } from "lucide-react";
import Chats from "./Chats";

const ChatSidebar = async () => {
  const session = await auth();
  return (
    <aside className="flex flex-col flex-[1_1_0%] bg-black text-white">
      <div className="stricky top-0 bg-black z-50">
        <div className="flex items-center justify-between p-4 border-b border-gray-800">
          <div className="relative">
            <Avatar className="cursor-pointer">
              <AvatarImage src={session?.user?.image!} />
            </Avatar>
          </div>
          <Button className="bg-sigButton hover:bg-sigButtonHover text-white rounded-full h-8 w-8 relative p-4">
            <Image src="/chat.svg" fill alt="Chat Icon" />
          </Button>
          <LogoutButton />
        </div>
        <div className="p-4">
          <div className="p-1 text-gray-400 flex gap-2 rounded-full border bg-sigSurface border-sigColorBgBorder">
            <SearchIcon className="text-gray-400 w-5" />
            <input
              className="bg-transparent border-none text-white placeholder-gray-400 focus:outline-none"
              type="text"
              placeholder="Search"
            />
          </div>
        </div>
      </div>
      <Chats />
    </aside>
  );
};

export default ChatSidebar;
