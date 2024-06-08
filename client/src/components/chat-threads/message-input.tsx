"use client";

import { useSelectedUserStore } from "@/store/user-store";
import { SendMsIcon, SmileFaceIcon } from "@/utils/icons";
import dynamic from "next/dynamic";
import { useState } from "react";
import { useCookies } from "react-cookie";
import { io } from "socket.io-client";

const EmojiPicker = dynamic(() => import("emoji-picker-react"), { ssr: false });

function MessageInput() {
  const [message, setMessage] = useState<string>("");
  const [showEmoji, setShowEmoji] = useState<boolean>(false);
  const [selectedUser] = useSelectedUserStore((state) => [state.selectedUser]);
  const [cookie] = useCookies(["user"]);

  const socket = io("http://localhost:4000");

  const handleSubmit = (e: any) => {
    e.preventDefault();

    socket.emit("private_message", {
      to: selectedUser?.email,
      from: cookie.user,
      message,
    });
    setMessage("");
  };

  return (
    <form onSubmit={handleSubmit} className="mt-auto relative">
      <div className="relative w-full">
        <input
          type="text"
          placeholder="Type your message here"
          onChange={(e) => setMessage(e.target.value)}
          value={message}
          className="input input-bordered w-full pl-14"
          required
        />
      </div>

      <button
        type="button"
        onClick={() => setShowEmoji(!showEmoji)}
        className="absolute top-1/2 left-5 -translate-y-1/2"
      >
        <SmileFaceIcon />
      </button>

      {showEmoji && (
        <div className="absolute bottom-full">
          <EmojiPicker
            onEmojiClick={(e) => setMessage((prev) => prev + e.emoji)}
          />
        </div>
      )}

      <button
        type="submit"
        className="absolute top-1/2 right-5 -translate-y-1/2"
      >
        <SendMsIcon />
      </button>
    </form>
  );
}

export default MessageInput;
