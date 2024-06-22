import React, { useRef, useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { Loader2, SmilePlus } from "lucide-react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { readFileDataUrl } from "@/lib/utils";
import { sendMessageAction } from "@/lib/actions";

const emojis = [
  { src: "/emojis/like.gif", alt: "Like" },
  { src: "/emojis/dislike.gif", alt: "Dislike" },
  { src: "/emojis/mind-blown.gif", alt: "Mind Blown" },
  { src: "/emojis/laugh.gif", alt: "Laugh" },
  { src: "/emojis/fire.gif", alt: "Fire" },
  { src: "/emojis/question.gif", alt: "Question" },
  { src: "/emojis/love.gif", alt: "Love" },
];

const EmojiPopover = () => {
  const popoverRef = useRef<HTMLButtonElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams<{ id: string }>();

  const handleSendMessage = async (imgUrl: string) => {
    setIsLoading(true);
    try {
      const blob = await fetch(imgUrl).then((r) => r.blob());
      const dataUrl = await readFileDataUrl(blob);
      await sendMessageAction(id, dataUrl, "image");
    } catch (error) {
      console.log("Error while sending Emoji\n", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild ref={popoverRef}>
        <Button
          ref={popoverRef}
          className="bg-transparent hover:bg-transparent max-w-min h-11 w-11 rounded-full"
          disabled={isLoading}
        >
          {!isLoading ? (
            <SmilePlus className="scale-150" />
          ) : (
            <Loader2 className="w-8 h-8 animate-spin" />
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 bg-sigMain border border-sigColorBgBorder">
        <div className="flex gap-4 items-center flex-wrap">
          {emojis.map((emoji) => (
            <Emoji
              key={emoji.src}
              {...emoji}
              onClick={() => handleSendMessage(emoji.src)}
            />
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
};

const Emoji = ({
  src,
  alt,
  onClick,
}: {
  src: string;
  alt: string;
  onClick: () => void;
}) => (
  <div className="cursor-pointer" onClick={onClick}>
    <Image src={src} alt={alt} width={70} height={70} />
  </div>
);

export default EmojiPopover;
