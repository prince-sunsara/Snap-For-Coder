"use client";
import { MessageDocument } from "@/models/message-model";
import { PopulatedDoc } from "mongoose";
import { Session } from "next-auth";
import Image from "next/image";
import React, { useRef } from "react";

// const messages = [
//   {
//     _id: "1",
//     content: "Hello, how are you?",
//     sender: {
//       _id: "1",
//       fullName: "John Doe",
//     },
//     messageType: "text",
//   },
//   {
//     _id: "2",
//     content: "I'm good, thanks! How about you?",
//     sender: {
//       _id: "2",
//       fullName: "Jane Smith",
//     },
//     messageType: "text",
//   },
//   {
//     _id: "3",
//     content: "Check out this picture.",
//     sender: {
//       _id: "1",
//       fullName: "John Doe",
//     },
//     messageType: "text",
//   },
//   {
//     _id: "4",
//     content: "That's a great photo!",
//     sender: {
//       _id: "2",
//       fullName: "Jane Smith",
//     },
//     messageType: "text",
//   },
//   {
//     _id: "5",
//     content: "Here's a link to the article.",
//     sender: {
//       _id: "1",
//       fullName: "John Doe",
//     },
//     messageType: "text",
//   },
//   {
//     _id: "6",
//     content: "And yah, Thanks for conversation",
//     sender: {
//       _id: "1",
//       fullName: "John Doe",
//     },
//     messageType: "text",
//   },
// ];

type ChatMessagesProps = {
  messages: MessageDocument[] | PopulatedDoc<MessageDocument>[];
  session: Session | null;
};

const ChatMessages = ({ messages, session }: ChatMessagesProps) => {
  const lastMsgRef = useRef<HTMLDivElement>(null);

  return (
    <>
      {messages.map((message, idx) => {
        const amISender = message?.sender?._id === session?.user?._id;
        const senderFullName = message?.sender?.fullName.toUpperCase();
        const isMsgImg = message?.messageType === "image";
        const isPrevMsgFromSameSender =
          idx > 0 && messages[idx - 1]?.sender?._id === message?.sender?._id;

        return (
          <div className="w-full" key={message?._id} ref={lastMsgRef}>
            {!isPrevMsgFromSameSender && (
              <p
                className={`font-bold mt-2 text-xs ${
                  amISender ? "text-sigSnapImg" : "text-sigSnapChat"
                }`}
              >
                {amISender ? "ME:" : senderFullName}
              </p>
            )}
            <div
              className={`border-l-2 ${
                amISender ? "border-l-sigSnapImg" : "border-l-sigSnapChat"
              }`}
            >
              <div className="flex items-center p-2 rounded-sm w-1/2">
                {isMsgImg ? (
                  <div className="relative">
                    <Image
                      src={message?.content}
                      width={200}
                      height={200}
                      alt="Image"
                      className="h-auto w-auto object-cover cursor-pointer"
                    />
                  </div>
                ) : (
                  <p className="text-sm">{message?.content}</p>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default ChatMessages;
