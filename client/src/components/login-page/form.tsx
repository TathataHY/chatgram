"use client";

import { handleSubmit } from "@/lib/fetchers";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { io } from "socket.io-client";
import Avatar from "./avatar";

function Form() {
  const [avatarId, setAvatarId] = useState((Math.random() * 1000).toFixed());
  const router = useRouter();
  const socket = io("http://localhost:4000/");

  const [cookie] = useCookies(["user"]);

  useEffect(() => {
    if (cookie.user) {
      router.push("/chat");
    } else {
      router.push("/");
    }
  }, [cookie.user]);

  return (
    <form
      onSubmit={(e) => handleSubmit(e, router, avatarId, socket)}
      className="flex flex-col gap-5"
    >
      <Avatar avatarId={avatarId} setAvatarId={setAvatarId} />
      <div className="flex flex-col xl:flex-row gap-5">
        <div className="form-control w-full">
          <label htmlFor="name" className="label">
            <span className="label-text text-lg">What's your name?</span>
          </label>
          <input
            id="name"
            type="text"
            placeholder="Type your name here"
            className="input input-bordered w-full"
            required
          />
        </div>
        <div className="form-control w-full">
          <label htmlFor="email" className="label">
            <span className="label-text text-lg">Put your email</span>
          </label>
          <input
            id="email"
            type="email"
            placeholder="Type your email here"
            className="input input-bordered w-full"
            required
          />
        </div>
      </div>

      <button className="btn btn-primary">Login</button>
    </form>
  );
}

export default Form;
