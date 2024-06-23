import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Loader2, SearchIcon } from "lucide-react";
import { UserDocument } from "@/models/user-model";
import UserCard from "./UserCard";
import { TextMessageSent } from "../svgs/ChatSvg";
import { sendMessageAction } from "@/lib/actions";
import { useRouter } from "next/navigation";

interface SelectUserDialogProps {
  selectedFile: string | undefined;
  onClose: () => void;
  onPrev: () => void;
}

// const SelectUserDialog: React.FC<SelectUserDialogProps> // write like this or like bellow
const SelectUserDialog = ({
  selectedFile,
  onClose,
  onPrev,
}: SelectUserDialogProps) => {
  const [users, setUsers] = useState([]);
  const [isFetchingUsers, setIsFetchingUsers] = useState(false);
  const [isSendingMessage, setIsSendingMessage] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UserDocument | null>(null);
  const router = useRouter();

  useEffect(() => {
    const getUsers = async () => {
      setIsFetchingUsers(true);
      try {
        const response = await fetch("/api/chat/get-users");
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.log(error);
      } finally {
        setIsFetchingUsers(false);
      }
    };

    getUsers();
  }, []);

  const handleSelectUser = (user: UserDocument) => {
    setSelectedUser(user);
  };

  const handleSendMessage = async () => {
    setIsSendingMessage(true);
    try {
      await sendMessageAction(selectedUser?._id, selectedFile, "image");
      router.push(`/chat/${selectedUser?._id}`);
    } catch (error) {
      console.log(error);
    } finally {
      setIsSendingMessage(false);
      onClose();
    }
  };

  return (
    <>
      <Dialog open={!!selectedFile}>
        <DialogContent
          className="bg-sigMain border border-sigColorBgBorder text-white max-w-xs"
          onInteractOutside={onClose}
        >
          <DialogHeader>
            <div className="text-gray-400 p-1 gap-2 flex rounded-full border bg-sigSurface border-sigColorBgBorder">
              <SearchIcon className="text-gray-400 w-5" />
              <input
                type="text"
                placeholder="To:"
                className="bg-transparent focus:outline-none border-none text-sm text-white placeholder-gray-400 w-full"
              />
            </div>
            <p className="font-semibold py-2">Chats:</p>

            <div className="max-h-52 flex flex-col overflow-auto">
              {users.map((user: UserDocument) => (
                <div
                  key={user._id}
                  className="bg-sigColorBgBorder mb-2 rounded-md"
                >
                  <UserCard
                    user={user}
                    handleSelectUser={handleSelectUser}
                    selectedUser={selectedUser}
                  />
                </div>
              ))}
            </div>

            {isFetchingUsers && (
              <div className="flex justify-center items-center">
                <Loader2 className="w-8 h-8 animate-spin" />
              </div>
            )}
          </DialogHeader>
          <DialogFooter className="mx-auto flex items-center">
            <DialogClose asChild>
              <Button
                variant={"destructive"}
                size={"sm"}
                onClick={onClose}
                className="rounded-full bg-sigSnapImg"
              >
                Cancle
              </Button>
            </DialogClose>

            <Button className="rounded-full px-4" onClick={onPrev} size={"sm"}>
              Prev
            </Button>

            <Button
              className="rounded-full px-4 bg-sigButton hover:bg-sigButtonHover"
              size={"sm"}
              onClick={handleSendMessage}
              disabled={!selectedUser || isSendingMessage}
            >
              {isSendingMessage ? (
                <Loader2 className="w-6 h-6 animate-spin" />
              ) : (
                <>
                  Send To{" "}
                  <TextMessageSent className="text-white my-auto scale-95" />
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default SelectUserDialog;
