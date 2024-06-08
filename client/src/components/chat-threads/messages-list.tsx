"use client";

import { fetchMessages } from "@/lib/fetchers";
import {
  useMessageStore,
  useSelectedUserStore,
  useUserStore,
} from "@/store/user-store";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { useEffect } from "react";
import { io } from "socket.io-client/debug";
import { shallow } from "zustand/shallow";
import MessageItem from "./message-item";

function MessagesList() {
  const sender = useUserStore((state) => state.myUser);
  const receiver = useSelectedUserStore((state) => state.selectedUser);
  const [messages, setMessages] = useMessageStore(
    (state: any) => [state.messages, state.setMessages],
    shallow
  );

  const [parent] = useAutoAnimate();

  const socket = io("http://localhost:4000");

  socket.on("refresh", () => {
    fetchMessages(sender, receiver, setMessages);
  });

  useEffect(() => {
    fetchMessages(sender, receiver, setMessages);
  }, [receiver]);

  return (
    <div
      ref={parent}
      className="w-full mb-10 flex flex-col max-h-[75vh] overflow-auto no-scrollbar"
    >
      {messages &&
        messages.map((message: any) => (
          <MessageItem
            key={message._id}
            user={message.sender === sender?.email}
            message={message.message}
          />
        ))}
    </div>
  );
}

export default MessagesList;
