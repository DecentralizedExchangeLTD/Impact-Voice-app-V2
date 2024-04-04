import React from "react";

export default function loadingScreen() {
  return (
    <div className="w-full h-screen lg:w-screen lg:max-w-[1280px] flex items-center justify-center">
      <div
        className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1s_linear_infinite] text-[#2d9e74]"
        role="status"
      >
        <span className="text-white absolute -m-px h-px w-px overflow-hidden whitespace-nowrap border-0 p-0">
          Loading...
        </span>
      </div>
    </div>
  );
}
