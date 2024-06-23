"use client";
import React from "react";
import { Button } from "../ui/button";
import { Loader2, Trash } from "lucide-react";
import { useFormState, useFormStatus } from "react-dom";
import { deleteChatAction } from "@/lib/actions";
import { useParams } from "next/navigation";

const DeleteMessageButton = () => {
  const { id } = useParams<{ id: string }>();
  const deleteChatActionWithId = deleteChatAction.bind(null, id);
  const [errorMessage, dispatch] = useFormState(deleteChatActionWithId, null);
  return (
    <form action={dispatch} className="flex flex-col">
      <DeleteButton />
      {errorMessage ? <div className="text-red-500">{errorMessage}</div> : null}
    </form>
  );
};

function DeleteButton() {
  const { pending } = useFormStatus();
  return (
    <Button className="bg-sigButtonSecondary hover:bg-sigButtonSecondaryHover w-12 h-12 rounded-full">
      {!pending ? <Trash /> : <Loader2 className="w-4 h-4 animate-spin" />}
    </Button>
  );
}

export default DeleteMessageButton;
