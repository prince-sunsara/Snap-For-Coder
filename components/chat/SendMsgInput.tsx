"use client";
import Image from "next/image";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "../ui/button";
import { TextMessageSent } from "../svgs/ChatSvg";
import EmojiPopover from "./EmojiPopover";
import { sendMessageAction } from "@/lib/actions";
import { useParams } from "next/navigation";
import { Loader2 } from "lucide-react";

const SendMsgInput = () => {
  const [messageContent, setMessageContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const params = useParams<{ id: string }>();
  const receiverId = params.id;

  const handleSendMessage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await sendMessageAction(receiverId, messageContent, "text");
      setMessageContent("");
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="flex gap-2 py-1 items-center">
      <div className="cursor-pointer w-10 h-10 rounded-full flex items-center justify-center bg-sigButtonSecondaryHover">
        <Image
          src={"/camera.svg"}
          height={0}
          width={0}
          alt="camera image"
          style={{ width: "20px", height: "20px" }}
        />
      </div>

      <form
        onSubmit={handleSendMessage}
        className="flex flex-1 items-center gap-1 rounded-full bg-sigButtonSecondaryHover border-sigColorBgBorder"
      >
        <Input
          placeholder="Send a chat"
          className="bg-transparent focus:outline-transparent border-none outline-none w-full h-full rounded-full"
          type="text"
          value={messageContent}
          onChange={(e) => setMessageContent(e.target.value)}
          disabled={isLoading}
        />
        <Button
          size={"sm"}
          className="bg-transparent hover:bg-transparent text-sigSnapChat"
          type="submit"
        >
          {!isLoading ? (
            <TextMessageSent className="scale-150 mr-1" />
          ) : (
            <Loader2 className="h-6 w-6 animate-spin" />
          )}
        </Button>
      </form>
      <div className="w-10 h-10 rounded-full flex items-center text-white justify-center cursor pointer bg-sigBackgroundFeedHover">
        <EmojiPopover />
      </div>
    </div>
  );
};

export default SendMsgInput;
