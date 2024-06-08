import { userProps } from "@/types";
import { DefaultEventsMap } from "@socket.io/component-emitter";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { Socket } from "socket.io-client";

export async function handleSubmit(
  event: any,
  router: AppRouterInstance,
  avatarId: string,
  socket: Socket<DefaultEventsMap, DefaultEventsMap>
) {
  event.preventDefault();
  try {
    await fetch("/auth", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: event.target[0].value,
        email: event.target[1].value,
        imageId: `https://robohash.org/${avatarId}.png`,
      }),
    });

    socket.emit("joined");
    router.push("/chat");
  } catch (error) {
    console.error(error);
  }
}

export async function fetchUser(
  cookie: { user?: any },
  setMyUser: { (user: userProps): void; (arg0: any): void }
) {
  try {
    const accessToken = cookie.user;
    const res = await fetch("/user", {
      headers: {
        Authorization: `${accessToken}`,
      },
    });
    const user: userProps = await res.json();

    setMyUser(user);
  } catch (error) {
    console.error(error);
  }
}

export async function fetchAllUsers(
  myUser: userProps | undefined,
  setAllUsers: { (users: userProps[]): void; (arg0: userProps[]): void }
) {
  try {
    const res = await fetch("/users");
    const users: userProps[] = await res.json();
    setAllUsers(users.filter((user) => user.email !== myUser?.email));
  } catch (error) {
    console.error(error);
  }
}

export async function fetchMessages(
  sender: userProps | undefined,
  receiver: userProps | undefined,
  setMessages: { (messages: any): void; (arg0: any): void }
) {
  try {
    if (!sender || !receiver) return;
    const res = await fetch(
      `/messages?sender=${sender?.email}&receiver=${receiver?.email}`
    );
    const messages: any = await res.json();
    setMessages(messages);
  } catch (error) {
    console.error(error);
    setMessages([]);
  }
}
