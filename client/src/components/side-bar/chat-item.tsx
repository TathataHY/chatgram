"use client";

import { useSelectedUserStore } from "@/store/user-store";
import { userProps } from "@/types";
import Image from "next/image";

function ChatItem({ user }: { user: userProps }) {
  const [setSelectedUser] = useSelectedUserStore((state) => [
    state.setSelectedUser,
  ]);

  const handleClick = (e: any) => {
    document.querySelector(".messages")?.classList.remove("hidden");
    document.querySelector(".messages")?.classList.add("flex");
    document.querySelector(".sidebar")?.classList.add("hidden");
    document.querySelector(".selected-user")?.classList.remove("selected-user");

    e.currentTarget.classList.add("selected-user");

    setSelectedUser(user);
  };

  return (
    <>
      <li
        onClick={handleClick}
        className="flex gap-3 cursor-pointer hover:bg-slate-300 p-5 rounded-lg"
      >
        <div className="avatar">
          <div className="w-14 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
            <Image
              src={user.imageId || ""}
              alt={user.name || ""}
              width={256}
              height={256}
            />
          </div>
        </div>
        <div className="flex flex-col justify-between">
          <h3 className="font-semibold text-black text-lg">{user?.name}</h3>
          <p className="text-[#707991]">User has joined</p>
        </div>
      </li>

      <hr />
    </>
  );
}

export default ChatItem;
