import Image from "next/image";
import Link from "next/link";
import React from "react";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="bg-gradient-to-r from-slate-500 to-yellow-100">
      <div className="flex flex-col justify-center items-center min-h-screen bg-auth-layout">
        <div className="bg-white rounded-lg shadow-md min-w-80 p-8">
          <Link href={"/"} className="flex justify-center mb-4">
            <Image src={"/logo.svg"} width={40} height={40} alt="Logo" />
          </Link>
          {children}
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
