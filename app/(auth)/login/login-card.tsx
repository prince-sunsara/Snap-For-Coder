import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const LoginCard = () => {
  return (
    <>
      <form className="spac-y-4">
        <LoginButton />
      </form>

      <div className="mt-4 text-center text-[13px]">
        <span>New to Snap? </span>
        <Link href={"/signup"} className="text-blue-500 hover:underline ml-1">
          Sign Up
        </Link>
      </div>
    </>
  );
};

function LoginButton() {
  return (
    <Button className="w-full flex gap-2">
      <Image src={"/github.svg"} width={20} height={20} alt="Gitub Logo" />
      Login with github
    </Button>
  );
}

export default LoginCard;
