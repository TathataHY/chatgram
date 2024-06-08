"use client";

import { useSelectedUserStore } from "@/store/user-store";
import MessageInput from "./message-input";
import MessagesList from "./messages-list";
import TopBar from "./top-bar";

function Messages() {
  const [selectedUser] = useSelectedUserStore((state) => [state.selectedUser]);

  return (
    <div className="bg-image messages w-full min-h-screen z-0 hidden md:w-1/2 lg:w-2/3 md:flex md:flex-col flex-col">
      <TopBar selectedUser={selectedUser} />
      <div
        className={`max-w-sm md:max-w-3xl w-full mx-auto mt-auto mb-10 ${
          !selectedUser && "md:hidden"
        }`}
      >
        <MessagesList />
        <MessageInput />
      </div>
    </div>
  );
}

export default Messages;
