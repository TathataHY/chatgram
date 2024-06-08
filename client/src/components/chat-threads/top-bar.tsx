"use client";

import { userProps } from "@/types";
import { FlashIcon } from "@/utils/icons";
import Image from "next/image";
import CallButton from "./call-button";

function TopBar({ selectedUser }: { selectedUser: userProps | undefined }) {
  const handleClick = () => {
    document.querySelector(".messages")?.classList.add("hidden");
    document.querySelector(".sidebar")?.classList.remove("hidden");
    document.querySelector(".selected-user")?.classList.remove("selected-user");
  };

  return (
    <div className={`bg-white ${!selectedUser && "md:hidden"}`}>
      <div className="w-full px-10 py-3 flex justify-between items-center">
        <div className="flex gap-3">
          <button
            onClick={handleClick}
            className="btn btn-ghost btn-circle md:hidden"
          >
            <FlashIcon />
          </button>

          <div className="avatar ml-3 cursor-auto">
            <div className="w-12 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
              <Image
                src={selectedUser?.imageId || ""}
                alt={selectedUser?.name || ""}
                width={256}
                height={256}
              />
            </div>
          </div>

          <div className="flex flex-col justify-between">
            <h3 className="font-semibold text-black text-base">
              {selectedUser?.name}
            </h3>
            <p className="text-[#707991]">online</p>
          </div>
        </div>

        <CallButton />
      </div>
    </div>
  );
}

export default TopBar;
