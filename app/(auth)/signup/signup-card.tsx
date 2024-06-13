import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const SignupCard = () => {
  return (
    <>
      <form className="space-y-4">
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
