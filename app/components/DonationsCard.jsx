import Image from "next/image";
import React from "react";

export const DonationsCard = ({ title, description, voices, owner }) => {
  return (
    <div className="w-full rounded-2xl">
      <div className="w-full flex flex-row items-center justify-between">
        <h1>{title}</h1>
        <span className="flex flex-row items-center">
          <span>{voices}</span>
          <Image src="/thumbprint.svg" height={15} width={15} alt="" />
        </span>
      </div>
      <p className="text-xs text-[#555]">{description}</p>
      <p className="text-xs text-blue-500 underline underline-offset-2">
        {owner}
      </p>
    </div>
  );
};
