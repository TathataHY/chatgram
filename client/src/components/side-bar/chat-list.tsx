import { fetchAllUsers } from "@/lib/fetchers";
import { useAllUserStore } from "@/store/user-store";
import { userProps } from "@/types";
import { useEffect } from "react";
import { io } from "socket.io-client";
import { shallow } from "zustand/shallow";
import ChatItem from "./chat-item";

function ChatList({ myUser }: { myUser: userProps | undefined }) {
  const [allUsers, setAllUsers] = useAllUserStore(
    (state) => [state.allUsers, state.setAllUsers],
    shallow
  );

  const socket = io("http://localhost:4000/");

  useEffect(() => {
    socket.on("new_user", () => {
      fetchAllUsers(myUser, setAllUsers);
    });
  }, []);

  useEffect(() => {
    fetchAllUsers(myUser, setAllUsers);
  }, []);

  return (
    <ul className="my-5 flex flex-col">
      {!allUsers && <p className="loading loading-ring w-16" />}
      {allUsers?.length === 0 && <p>No users found</p>}
      {allUsers?.reverse().map((user) => (
        <ChatItem key={user._id} user={user} />
      ))}
    </ul>
  );
}

export default ChatList;
