import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import ChatUserInfo from "./ChatUserInfo";
import DeleteMessageButton from "./DeleteMessageButton";
import { getUserProfile } from "@/lib/data";

const ChatTopbar = async ({ params }: { params: { id: string } }) => {
  const userData = await getUserProfile(params.id);
  return (
    <div className="w-full mt-4 flex items-center justify-between">
      <div className="flex gap-2">
        <Button
          asChild
          className="w-11 h-11 rounded-full bg-sigButtonSecondary hover:bg-sigButtonSecondaryHover"
        >
          <Link href={"/chat"}>
            <ChevronLeft className="min-w-7" />
          </Link>
        </Button>
        <ChatUserInfo userData={userData} />
      </div>

      {/* right  */}
      <DeleteMessageButton />
    </div>
  );
};

export default ChatTopbar;
