import { auth } from "@/auth";
import { getUsersForSidebar } from "@/lib/data";
import React from "react";
import Chat from "./Chat";

const Chats = async () => {
  const session = await auth();
  // console.log(session); // for debug

  const chats = session?.user ? await getUsersForSidebar(session.user._id) : [];
  // console.log(chats);  // for debug

  return (
    <nav className="flex-1 overflow-y-auto">
      <ul>
        {chats.map((chat) => (
          <Chat key={chat._id} chat={chat} />
        ))}
      </ul>
    </nav>
  );
};

export default Chats;
