import Image from "next/image";
import React from "react";

export const Path = ({ title, subtitle, handleClick, image }) => {
  return (
    <div
      onClick={handleClick}
      className="w-full md:w-fit lg:w-fit bg-[#ebebeb] rounded-2xl flex flex-col items-center justify-center active:border-2 border-green-500 gap-2 p-2"
    >
      {/* <Image src="/path.svg" alt={title} width={30} height={30} /> */}
      <div className="flex flex-col gap-1">
        <span className="font-semibold text-md active:text-green-500">
          {title}
        </span>
        <span className="font-light text-xs"> {subtitle} </span>
      </div>
      <Image
        src={image}
        alt={title}
        width={200}
        height={200}
        className="w-full md:w-52 lg:w-80 rounded-2xl aspect-video object-cover origin-center saturate-0 hover:saturate-100"
        priority
      />
    </div>
  );
};
