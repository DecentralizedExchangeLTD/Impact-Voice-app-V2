import React from "react";
import { DonationsCard } from "@/app/components/DonationsCard";

export default function DonorPage() {
  return (
    <div className="w-full flex flex-col items-center justify-center gap-5 text-black">
      {[1, 2, 3, 4].map(() => {
        <DonationsCard
          title="Sample"
          voices={34}
          description={"Lorem ipsum here"}
          owner="John doe"
        />;
      })}
    </div>
  );
}
