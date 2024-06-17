import React from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
} from "../ui/dialog";
import { Button } from "../ui/button";
import Image from "next/image";

interface ImagePreviewDialogProps {
  selectedFile: string | undefined;
  onClose: () => void;
  onImageChange: () => void;
  setStep?: React.Dispatch<React.SetStateAction<number>>;
}

const ImagePreviewDialog: React.FC<ImagePreviewDialogProps> = ({
  selectedFile,
  onClose,
  onImageChange,
  setStep,
}) => {
  return (
    <>
      <Dialog open={!!selectedFile}>
        <DialogContent
          className="bg-sigMain border border-sigColorBgBorder md:max-w-3xl h-[80vh] flex flex-col"
          onInteractOutside={onClose}
        >
          <DialogHeader className="flex-1">
            <div className="flex items-center relative my-auto h-3/4">
              <Image
                src={selectedFile!}
                alt="Selected File"
                fill
                className="border rounded-md mx-auto border-sigColorBgBorder object-contain"
              />
            </div>
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
            <Button
              size={"sm"}
              onClick={onImageChange}
              className="rounded-full px-4"
            >
              Change
            </Button>
            <Button
              variant={"destructive"}
              size={"sm"}
              onClick={() => setStep && setStep(1)}
              className="rounded-full bg-sigSnapChat px-4 hover:bg-sigSnapChat"
            >
              Next
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ImagePreviewDialog;
