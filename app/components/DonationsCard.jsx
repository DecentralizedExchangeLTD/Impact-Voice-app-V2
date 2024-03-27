import React from "react";
import Image from "next/image";

export const DonationsCard = ({ title, description, voices, owner }) => {
  return (
    <div className="w-full p-4 flex flex-col gap-1 bg-[#fafafa] rounded-2xl">
      <div className="w-full flex flex-row items-center justify-between">
        <h1 className="w-full truncate">{title}</h1>
        <span className="flex flex-row gap-2 w-20 items-center justify-end">
          <span className="text-xs">{voices}</span>
          <Image src="/thumbprint.svg" height={15} width={15} alt="" />
        </span>
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
