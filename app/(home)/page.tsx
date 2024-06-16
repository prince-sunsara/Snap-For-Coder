import { auth } from "@/auth";
import Navbar from "@/components/shared/Navbar";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default async function Home() {
  const session = await auth();
  // console.log(session);

  return (
    <main className="bg-[#fffc00]">
      <div className="flex flex-col items-center justify-center min-h-screen max-w-7xl mx-auto">
        <Navbar />

        <main className="flex flex-1 flex-col items-center justify-center px-8 mt-4 md:flex-row">
          <div className="flex-1 text-center h-full md:text-left">
            <h1 className="text-4xl md:text-6xl font-bold">Snap For Coders!</h1>
            <p className="mt-4 font-semibold text-xl">
              Share your code with your friend to get feedback and improve your
              code.
            </p>
            <div className="mt-4">
              <p className="text-lg font-semibold mt-2">
                What are your waiting for?
              </p>
            </div>
            {session ? (
              <Button
                asChild
                className="mt-4 flex items-center bg-black text-white rounded-lg gap-2 mx-auto md:mx-0"
              >
                <Link href={"/chat"} className="max-w-max">
                  <Image
                    src={"/logo.svg"}
                    alt="Snapchat Logo"
                    width={20}
                    height={20}
                  />
                  Start chatting
                </Link>
              </Button>
            ) : (
              <Button
                asChild
                className="mt-4 flex items-center bg-black text-white rounded-lg gap-2 mx-auto md:mx-0"
              >
                <Link href={"/login"} className="max-w-max">
                  <Image
                    src={"/logo.svg"}
                    alt="Snapchat Logo"
                    width={20}
                    height={20}
                  />
                  Login to explore
                </Link>
              </Button>
            )}
          </div>
          <div className="flex-1 md:w-full md:flex">
            <Image src={"/hero.png"} alt="Avatar" width={651} height={621} />
          </div>
        </main>
      </div>
    </main>
  );
}
