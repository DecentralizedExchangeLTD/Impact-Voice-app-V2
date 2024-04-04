"use client";
import Image from "next/image";
import { useEffect } from "react";
import Splash from "./components/Splash";
import { Button } from "antd";
import { useRouter } from "next/navigation";
import { usePrivy } from "@privy-io/react-auth";

export default function AuthPage() {
  const router = useRouter();
  const { ready, authenticated, login } = usePrivy();
  const disableLogin = !ready || (ready && authenticated);

  useEffect(() => {
    if (ready && authenticated) {
      router.push("/selectpath");
    }
  }, [ready, authenticated, router]);

  const handleSignIn = async () => {
    if (!ready) {
      return;
    }

    if (ready && !authenticated) {
      login();
    }
  };

  return (
    <main className="flex min-h-screen w-screen flex-col items-center justify-between">
      <Splash />
      <div className="h-full w-full flex flex-col items-center">
        <div className="fixed bottom-0 w-full lg:w-screen lg:max-w-[1280px] flex flex-col items-center gap-10">
          <Image
            src="/africa.png"
            alt="Greenpill Africa"
            width={200}
            height={200}
            priority
          />
          <h1 className="xl:text-9xl 2xl:text-[160px] lg:text-8xl md:text-7xl text-[50px] font-semibold text-center">
            Impact
            <br />
            Voice
          </h1>
          <div className="w-[90%] rounded-t-3xl bg-white h-96 flex flex-col items-center justify-center px-5 gap-5 text-center text-xs md:text-base lg:text-md">
            <p className="w-5/6 text-sm md:text-base lg:text-lg">
              To sign-in enter your phone number beginning with country code, or
              a valid Email address, then enter the OTP you receive from Impact
              Voice when asked to do so.
            </p>
            <Button
              loading={disableLogin}
              className="bg-[#38C793] w-full md:w-1/2 lg:w-1/3 hover:saturate-100"
              type="primary"
              size="large"
              onClick={handleSignIn}
            >
              {disableLogin ? "Please wait.." : "Sign in"}
            </Button>
            <p className="w-5/6">
              You will need Meta Mask to sign in with your wallet address. If
              you haven’t set one up yet{" "}
              <a href="#" className="text-blue-500">
                click here
              </a>
              .
            </p>
            <p className="absolute bottom-0 pb-4 font-extralight text-xs">
              powered by <b>impact stream</b>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
