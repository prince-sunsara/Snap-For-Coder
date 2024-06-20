import Link from "next/link";
import React from "react";
import { Avatar, AvatarImage } from "../ui/avatar";
import Image from "next/image";
import { formateDate } from "@/lib/utils";
import {
  ImageMessageSvg,
  TextMessageSent,
  TextMessageSvgReceived,
} from "../svgs/ChatSvg";

type chatProps = {
  chat: any;
};

const Chat = ({ chat }: chatProps) => {
  const userToChat = chat.participants[0];

  const lastMessage = chat.lastMessage;
  const lastMessageType = lastMessage?.messageType;
  const formattedDate = lastMessage
    ? formateDate(lastMessage?.createdAt!)
    : formateDate(new Date());

  const amIsener = lastMessage && lastMessage.sender._id !== userToChat?._id;
  const isMsgOpened = lastMessage?.opened;

  let messageStatus: string;
  let iconComponent: JSX.Element;

  if (amIsener) {
    messageStatus = isMsgOpened ? "Opened" : "Sent";
    iconComponent =
      lastMessageType === "text" ? (
        <TextMessageSent
          className={
            isMsgOpened ? "text-sigSnapChat" : "text-sigSnapChat fill-current"
          }
        />
      ) : (
        <ImageMessageSvg
          className={
            isMsgOpened ? "text-sigSnapImg" : "text-sigSnapImg fill-current"
          }
        />
      );
  } else {
    if (!lastMessage) {
      messageStatus = "Say Hi!";
      iconComponent = <TextMessageSvgReceived className="fill-current" />;
    } else {
      messageStatus = isMsgOpened ? "Received" : "Showing Message";
      iconComponent =
        lastMessageType === "text" ? (
          <TextMessageSvgReceived
            className={
              isMsgOpened ? "text-sigSnapChat" : "text-sigSnapChat fill-current"
            }
          />
        ) : (
          <ImageMessageSvg
            className={
              isMsgOpened ? "text-sigSnapImg" : "text-sigSnapImg fill-current"
            }
          />
        );
    }
  }

  return (
    <Link href={`/chat/${userToChat?._id}`}>
      <li className="flex items-center p-2 bg-sigSurface hover:bg-sigBackgroundFeedHover cursor-pointer border-b border-b-sigColorBgBorder">
        <Avatar className="w-14 h-14 bg-black">
          <AvatarImage src={userToChat?.avatar} />
        </Avatar>

        <div className="ml-3">
          <p>{userToChat?.fullName}</p>
          <p className="flex gap-1 text-xs text-gray-400">
            {iconComponent}
            {messageStatus} - {formattedDate}
          </p>
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
