"use client";

import { fetchUser } from "@/lib/fetchers";
import { useUserStore } from "@/store/user-store";
import { useEffect } from "react";
import { useCookies } from "react-cookie";
import { shallow } from "zustand/shallow";
import ChatList from "./chat-list";
import SearchBar from "./search-bar";

function SideBar() {
  const [cookie, setCookie] = useCookies(["user"]);
  const [myUser, setMyUser] = useUserStore(
    (state) => [state.myUser, state.setUser],
    shallow
  );

  useEffect(() => {
    fetchUser(cookie, setMyUser);
  }, [cookie.user]);

  return (
    <div className="w-full md:!block sidebar z-10 border-r-2 border-slate-400 md:w-1/2 lg:w-1/3 p-3 bg-white h-screen">
      <SearchBar user={myUser} />
      {myUser && <ChatList myUser={myUser} />}
    </div>
  );
}

export default SideBar;
