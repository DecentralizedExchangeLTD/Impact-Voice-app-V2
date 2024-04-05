"use client";
import { Suspense, useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button, Input } from "antd";
import { ProposalCard } from "@/app/components/ProposalCard";
import { ProposalService } from "@/app/services/proposalService";
import { AuthService } from "@/app/services/authService";
import { error } from "@/app/components/Modals";
import { LoadingScreen } from "@/app/components/LoadingScreen";

export default function Proposal() {
  const [pageLoading, setPageLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const proposalID = searchParams.get("proposalID");

  useEffect(() => {}, []);

  if (pageLoading) {
    return <LoadingScreen />;
  }

  return (
    <Suspense
      fallback={
        <div className="w-screen h-screen bg-[#fafafa] text-[#333]">
          Loading...
        </div>
      }
    >
      <div className="w-full h-full lg:w-screen lg:max-w-[1280px] px-4 pt-32 pb-24 flex flex-col items-center justify-start gap-5">
        <div className="w-full text-center">
          <h1 className="text-xs font-light">
            {proposalID ? proposalID : "N/A"}
          </h1>
        </div>
        <div className="flex flex-col gap-5 items-center justify-start w-full h-full lg:items-start lg:flex-wrap lg:max-w-[1280px]"></div>
      </div>
    </Suspense>
  );
}
