import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { signIn } from "@/auth";

const SignupCard = () => {
  async function authAction() {
    "use server";
    await signIn("github");
  }
  return (
    <>
      <form className="space-y-4" action={authAction}>
        <SignupButton />
      </form>
      <div className="mt-4 text-center text-[13px]">
        <span>Already have an account? </span>
        <Link href={"/login"} className="text-blue-500  hover:underline ml-1">
          Log In
        </Link>
      </div>
    </>
  );
};

function SignupButton() {
  return (
    <Button className="w-full gap-2">
      <Image src={"/github.svg"} alt="Github Logo" width={20} height={20} />
      Sign Up with Github
    </Button>
  );
}

export default SignupCard;
