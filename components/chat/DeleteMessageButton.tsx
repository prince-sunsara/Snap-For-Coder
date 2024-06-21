import React from "react";
import { Button } from "../ui/button";
import { Loader2, Trash } from "lucide-react";

const DeleteMessageButton = () => {
  return (
    <div className="flex flex-col">
      <DeleteButton />
    </div>
  );
};

function DeleteButton() {
  const pending = false;
  return (
    <Button className="bg-sigButtonSecondary hover:bg-sigButtonSecondaryHover w-12 h-12 rounded-full">
      {!pending ? <Trash /> : <Loader2 className="w-4 h-4 animate-spin" />}
    </Button>
  );
}

export default DeleteMessageButton;
