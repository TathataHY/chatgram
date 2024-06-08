import Messages from "@/components/chat-threads/messages";
import SideBar from "@/components/side-bar/side-bar";

export default function Chat() {
  return (
    <div className="min-h-screen">
      <div className="mx-auto flex">
        <SideBar />
        <Messages />
      </div>
    </div>
  );
}
