"use client";
import { readFileDataUrl } from "@/lib/utils";
import Image from "next/image";
import React, { useRef, useState } from "react";
import ImagePreviewDialog from "./ImagePreviewDialog";
import SelectUserDialog from "./SelectUserDialog";

const ChatCamara = () => {
  const imgRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<string>("");
  const [step, setStep] = useState<number>(0);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const dataUrl = await readFileDataUrl(file);
      setSelectedFile(dataUrl);
    }
  };

  const closeDialog = () => {
    setSelectedFile("");
    setStep(0);
  };

  return (
    <>
      <div className="aspect-[9/16] flex flex-col items-center justify-center h-[80%] bg-black rounded-md bg-clip-padding backdrop:filter backdrop-blur-lg bg-opacity-10 border border-sigColorBgBorder mx-auto lg:mx-0">
        <div
          className="rounded-full p-8 bg-white-800 bg-clip-padding backdrop:filter backdrop-blur-xl bg-opacity-30 border border-gray-100 cursor-pointer"
          onClick={() => imgRef?.current!.click()}
        >
          <Image
            src={"/camera.svg"}
            width={0}
            height={0}
            alt="Camara Image"
            className="hover:opacity-90"
            style={{ width: "150px", height: "auto" }}
          />
          <input
            type="file"
            accept="image/*"
            ref={imgRef}
            hidden
            onChange={handleFileChange}
          />
        </div>
        <p className="w-2/3 text-center text-white mt-4 font-semibold">
          Click the camera to send your code!
        </p>
      </div>
      {step === 0 ? (
        <ImagePreviewDialog
          selectedFile={selectedFile}
          onClose={closeDialog}
          onImageChange={() => imgRef.current?.click()}
          setStep={setStep}
        />
      ) : (
        <SelectUserDialog
          selectedFile={selectedFile}
          onClose={closeDialog}
          onPrev={() => setStep(0)}
        />
      )}
    </>
  );
};

export default ChatCamara;
