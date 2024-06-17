import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { SearchIcon } from "lucide-react";

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
  }, []);

  return (
    <>
      <Dialog open={!!selectedFile}>
        <DialogContent
          className="bg-sigMain border border-sigColorBgBorder text-white max-w-xs"
          onInteractOutside={onClose}
        >
          <DialogHeader className="flex-1">
            <div className="text-gray-400 p-1 gap-2 flex rounded-full border bg-sigSurface border-sigColorBgBorder">
              <SearchIcon className="text-gray-400 w-5" />
              <input
                type="text"
                placeholder="To:"
                className="bg-transparent focus:outline-none border-none text-sm text-white placeholder-gray-400 w-full"
              />
            </div>
            <p className="font-semibold py-2">Chats:</p>
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
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default SelectUserDialog;
