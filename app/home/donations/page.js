"use client";
import { DonationsCard } from "@/app/components/DonationsCard";
import Search from "antd/es/input/Search";
// import Image from "next/image";
import { useState } from "react";

export default function DonorPage() {
  // const remainingVoice = 11;

  const proposals = [
    {
      title: "Well Project",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.",
      voices: "309",
      owner: "John Doe",
    },
    {
      title: "Urban Garden for Schools",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      voices: "309",
      owner: "John Doe",
    },
    {
      title: "Learning Platform in Healthcare",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ullamco laboris nisi.",
      voices: "309",
      owner: "John Doe",
    },
    {
      title: "Smart Wallet",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.",
      voices: "309",
      owner: "John Doe",
    },
    {
      title: "Eco-Friendly garbage disposal",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      voices: "309",
      owner: "John Doe",
    },
  ];

  const [filteredProposals, setFilteredProposals] = useState(proposals);

  const handleSearch = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const filtered = proposals.filter((proposal) =>
      proposal.title.toLowerCase().includes(searchTerm)
    );
    setFilteredProposals(filtered);
  };

  return (
    <div className="w-full flex flex-col items-center justify-start gap-4 text-black px-4 pb-10 pt-32">
      <div className="w-full flex flex-col gap-2 fixed top-0 pt-16 px-4 pb-2 bg-[#d8d8d8] shadow-md">
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
        {/* <div className="w-full flex flex-row items-center gap-2">
          <Image
            src="/thumbprint.svg"
            height={15}
            width={15}
            className="bg-white rounded-full p-1 w-7 h-7"
            alt=""
          />
          <p className="font-bold">{remainingVoice} remaining</p>
        </div> */}
      </div>
      <div className="w-full text-center">
        <h1 className="font-semibold text-xl mb-1">Donate</h1>
      </div>
      {filteredProposals.map((item, index) => {
        return (
          <DonationsCard
            key={index}
            title={item.title}
            description={item.description}
            voices={item.voices}
            owner={item.owner}
          />
        );
      })}
    </div>
  );
}
