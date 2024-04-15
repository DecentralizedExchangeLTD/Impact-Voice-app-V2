"use client";
import { Suspense, useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ProposalService } from "@/app/services/proposalService";
import { useWallets } from "@privy-io/react-auth";
import { error } from "@/app/components/Modals";
import { LoadingScreen } from "@/app/components/LoadingScreen";

export default function Proposal() {
  const [pageLoading, setPageLoading] = useState(false);
  const [data, setData] = useState([]);
  const router = useRouter();
  const searchParams = useSearchParams();
  const proposalID = searchParams.get("proposalID");
  const { ready, wallets } = useWallets();
  // const wallet = ready && wallets[0];

  useEffect(() => {
    const getProposal = async () => {
      const wallet = ready && wallets[0];
      await wallet.switchChain(10);
      const provider = await wallet.getEthersProvider();
      try {
        setPageLoading(true);
        const response = await ProposalService.getProposal(
          provider,
          proposalID
        );
        setData(response);
        if (!response) {
          error(
            "Network Error",
            "We could not get the details of this attestation for now. Please try again!",
            () => router.back()
          );
        }
      } catch (e) {
        console.log("error getting proposal:", e);
      } finally {
        setPageLoading(false);
      }
    };
    getProposal();
  }, []);

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
      <div className="w-full h-full px-4 py-16 flex flex-col items-center gap-5">
        <div className="flex flex-row items-center justify-between w-full h-14 font-bold text-2xl">
          <p
            className="bg-gradient-to-r from-white to-transparent rounded-l-3xl py-1 px-2"
            onClick={() => router.back()}
          >
            &lt;-
          </p>
          <p></p>
          <p className="px-6"></p>
        </div>

        <div className="w-full rounded-3xl bg-white flex flex-col gap-5 px-4 py-6 text-sm">
          <h1 className="font-semibold text-center text-base">{data["0"]}</h1>
          <p>
            <strong>Summary:</strong> {data["1"]}
          </p>

          <p>
            <strong>Problem:</strong> {data["2"]}
          </p>

          <p>
            <strong>Solution:</strong> {data["3"]}
          </p>
          <ul>
            <strong>Specifications:</strong> <li>{data["4"]}</li>
          </ul>

          <ul>
            <strong>Steps to Implement:</strong>{" "}
            {data["5"]?.map((item, index) => (
              <li className="mb-2" key={index}>
                {index + 1}. {item}
              </li>
            ))}
          </ul>

          <ul>
            <strong>Collaborators:</strong>{" "}
            {data["6"]?.map((item, index) => (
              <li className="mb-1" key={index}>
                {index + 1}. {item}
              </li>
            ))}
          </ul>

          <p>
            <strong>Timeline:</strong> {data["7"]}
          </p>

          <ul>
            <strong>Milestones:</strong>{" "}
            {data["10"]?.map((item, index) => (
              <li className="mb-2" key={index}>
                {index + 1}.{" "}
                {item.split("BREAKPOINT").map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </li>
            ))}
          </ul>

          <p>
            <strong>Total Budget:</strong> {data["8"]}
          </p>

          <p>
            <strong>Affected Area:</strong> {data["9"]}
          </p>
        </div>
      </div>
    </Suspense>
  );
}
