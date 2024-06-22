import { auth } from "@/auth";
import ChatMessages from "@/components/chat/ChatMessages";
import ChatTopbar from "@/components/chat/ChatTopbar";
import SendMsgInput from "@/components/chat/SendMsgInput";
import { getMessages } from "@/lib/data";
import React from "react";

const ChatHistoryPage = async ({ params }: { params: { id: string } }) => {
  const session = await auth();
  const messages = session
    ? await getMessages(session?.user?._id, params.id)
    : [];
  return (
    <div className="flex flex-col px-4 text-white h-screen bg-sigMain flex-[3_3_0%]">
      {/* topbar  */}
      <ChatTopbar params={params} />

      {/* bellow topbar section  */}
      <div className="bg-sigSurface flex-1 overflow-y-auto rounded-xl my-4 border border-sigColorBgBorder py-2 px-3">
        {/* msg container  */}
        <div className="flex flex-col">
          <ChatMessages messages={messages} session={session} />
        </div>
      </div>
      {/* Input  */}
      <SendMsgInput />
    </div>
  );
};

export default ChatHistoryPage;
