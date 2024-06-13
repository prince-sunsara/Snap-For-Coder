import Image from "next/image";
import Link from "next/link";
import React from "react";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <div className="bg-white rounded-lg shadow-md min-w-80 p-8">
        <Link href={"/"} className="flex justify-center mb-4">
          <Image src={"/logo.svg"} width={40} height={40} alt="Logo" />
        </Link>
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
