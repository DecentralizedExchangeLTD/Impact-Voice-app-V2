"use client";
import { Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button, Input } from "antd";
import { ProposalCard } from "../components/ProposalCard";
import { useState } from "react";

const { Search } = Input;

export default function PathPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const title = searchParams.get("title");

  const proposedGrants = [
    {
      title: "Well Project",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.",
      voices: "309",
      owner: "John Doe",
      location: "Bayelsa, Nigeria",
    },
    {
      title: "Urban Garden for Schools",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      voices: "309",
      owner: "John Doe",
      location: "Bayelsa, Nigeria",
    },
    {
      title: "Learning Platform in Healthcare",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ullamco laboris nisi.",
      voices: "309",
      owner: "John Doe",
      location: "Bayelsa, Nigeria",
    },
    {
      title: "Smart Wallet",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.",
      voices: "309",
      owner: "John Doe",
      location: "Bayelsa, Nigeria",
    },
    {
      title: "Eco-Friendly garbage disposal",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      voices: "309",
      owner: "John Doe",
      location: "Bayelsa, Nigeria",
    },
  ];

  const [filteredProposals, setFilteredProposals] = useState(proposedGrants);

  const handleSearch = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const filtered = proposedGrants.filter((proposal) =>
      proposal.title.toLowerCase().includes(searchTerm)
    );
    setFilteredProposals(filtered);
  };

  return (
    <Suspense
      fallback={
        <div className="w-screen h-screen bg-[#fafafa] text-[#333]">
          Loading...
        </div>
      }
    >
      <div className="w-full h-full px-4 pt-32 pb-24 flex flex-col items-center justify-start gap-5">
        <div className="w-full flex flex-col gap-4 fixed top-0 pt-16 px-4 pb-2 bg-[#d8d8d8] shadow-md">
          <div className="w-full">
            <Search
              placeholder="Search for a proposal"
              enterButton
              allowClear
              size="large"
              onSearch={() => {
                return;
              }}
              onChange={handleSearch}
            />
          </div>
        </div>
        <div className="w-full text-center">
          <h1 className="font-semibold text-xl mb-1">
            {title ? title : "Proposed Grants"}
          </h1>
          {/* <p className="text-xs font-light">This step is optional!</p> */}
        </div>
        <div className="flex flex-col gap-5 items-center w-full">
          {filteredProposals.map((item, index) => {
            return (
              <ProposalCard
                key={index}
                title={item.title}
                description={item.description}
                location={item.location}
                owner={item.owner}
                canvote={title === "Your Voice" ? "/thumbprint.svg" : ""}
                voices={title === "Your Voice" ? item.voices : ""}
              />
            );
          })}
        </div>
        {title === "Your Proposals" && (
          <div className="fixed bottom-0 py-3 font-extralight text-xs bg-[#ffffff90] backdrop-blur-2xl w-full flex flex-col items-center gap-2">
            <Button
              className="w-5/6 text-green-500 border-2 border-green-500 text-lg"
              size="large"
              onClick={() => router.push("/proposalform")}
            >
              Write a Proposal
            </Button>
            <p>
              powered by <b>impact stream</b>
            </p>
          </div>
        )}
      </div>
    </Suspense>
  );
}
