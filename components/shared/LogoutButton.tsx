import { signOut } from "@/auth";
import { Button } from "../ui/button";
import { LogOut } from "lucide-react";

const LogoutButton = () => {
  const authAction = async () => {
    "use server";
    await signOut();
  };
  return (
    <>
      <form action={authAction}>
        <Button className="bg-black text-white rounded-full p-3 text-xs md:text-sm">
          <LogOut className="cursor-pointer" />
        </Button>
      </form>
    </>
  );
};

export default LogoutButton;
