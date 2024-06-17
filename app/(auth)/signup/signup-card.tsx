"use client";
import { Button } from "@/components/ui/button";
import { authAction } from "@/lib/actions";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useFormState, useFormStatus } from "react-dom";

const SignupCard = () => {
  const [errorMessage, dispatch] = useFormState(authAction, "");
  return (
    <>
      <form className="space-y-4" action={dispatch}>
        <SignupButton />
      </form>
      <div className="mt-4 text-center text-[13px]">
        <span>Already have an account? </span>
        <Link href={"/login"} className="text-blue-500  hover:underline ml-1">
          Log In
        </Link>
        {errorMessage ? (
          <p className="text-sm text-red-500">{errorMessage}</p>
        ) : null}
      </div>
    </>
  );
};

function SignupButton() {
  const { pending } = useFormStatus();
  return (
    <Button className="w-full gap-2" disabled={pending} aria-disabled={pending}>
      <Image src={"/github.svg"} alt="Github Logo" width={20} height={20} />
      Sign Up with Github
    </Button>
  );
}

export default SignupCard;
