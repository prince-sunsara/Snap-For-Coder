import React, { useRef } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { SmilePlus } from "lucide-react";
import Image from "next/image";

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
  return (
    <Popover>
      <PopoverTrigger asChild ref={popoverRef}>
        <Button
          ref={popoverRef}
          className="bg-transparent hover:bg-transparent max-w-min h-11 w-11 rounded-full"
        >
          <SmilePlus className="scale-150" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 bg-sigMain border border-sigColorBgBorder">
        <div className="flex gap-4 items-center flex-wrap">
          {emojis.map((emoji) => (
            <Emoji key={emoji.src} {...emoji} />
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
};

const Emoji = ({ src, alt }: { src: string; alt: string }) => (
  <div className="cursor-pointer">
    <Image src={src} alt={alt} width={70} height={70} />
  </div>
);

export default EmojiPopover;
