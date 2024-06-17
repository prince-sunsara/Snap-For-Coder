import ChatCamara from "@/components/chat/ChatCamara";
import Image from "next/image";
import React from "react";

const ChatRootPage = () => {
  return (
    <main className=" flex flex-grow items-center bg-sigMain px-2">
      <div className="bg-chat bg-right-bottom rounded-3xl w-full h-[96%] flex items-center justify-center px-6">
        <ChatCamara />
        <div className="hidden lg:block">
          <Image
            src={"/snapemoji.png"}
            width={500}
            height={600}
            alt="Snap Avatar"
          />
        </div>
      </div>
    </main>
  );
};

export default ChatRootPage;
