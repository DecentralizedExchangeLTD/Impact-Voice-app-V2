"use client";
import Image from "next/image";
import React from "react";
import { useRouter } from "next/navigation";

export const ProposalCard = ({
  title,
  voices,
  location,
  description,
  owner,
  canvote,
  proposalID,
}) => {
  const router = useRouter();
  const handleClick = (id) => {
    // router.push("/home/proposal?proposalID=" + id);
    return id;
  };

  return (
    <div
      onClick={() => handleClick(proposalID)}
      className="w-full flex flex-col p-4 rounded-2xl bg-[#fafafa] gap-2 hover:bg-[#4cc0953a] active:scale-105 origin-center"
    >
      <div className="flex flex-row items-center justify-between">
        <h1 className="font-semibold truncate">{title}</h1>
        <div className="flex flex-row gap-2 items-center text-xs font-semibold">
          <span>{voices}</span>
          {canvote && voices && (
            <Image src={canvote} width={15} height={15} alt="" />
          )}
        </div>
      </div>
      <div className="flex flex-row gap-1 items-center">
        <span className="text-xs font-light">{location}</span>
        <Image src="/location.svg" width={20} height={20} alt="location" />
      </div>
      <div className="w-full max-h-12 overflow-hidden">
        <p className="text-xs text-[#555] font-light truncate-lines">
          {description}
        </p>
      </div>
      <p className="text-xs text-blue-500 font-semibold">Creator - {owner}</p>
    </div>
  );
};
