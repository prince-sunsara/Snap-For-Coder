import Link from "next/link";
import React from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const navbar = () => {
  return (
    <header className="w-full py-4 px-8 flex justify-center items center">
      <Image
        src="/logo.svg"
        width={40}
        alt="Snapchat logo"
        className="cursor-pointer"
      />
      <div className="flex space-x-1">
        <Button className="bg-transparent hover:bg-primary/5 text-black">
          Stories
        </Button>
        <Button className="bg-transparent hover:bg-primary/5 text-black">
          Spotlight
        </Button>
        <Button
          asChild
          className="bg-transparent hover:bg-primary/5 text-black"
        >
          <Link href="/chat"> Chat</Link>
        </Button>
      </div>
    </header>
  );
};

export default navbar;
