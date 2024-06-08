function MessageItem({ user, message }: { user: boolean; message: string }) {
  return (
    <div className={`chat ${user ? "chat-end" : "chat-start"}`}>
      <div
        className={`chat-bubble ${
          user ? "chat-bubble-primary" : "chat-bubble-secondary"
        }`}
      >
        {message}
      </div>
    </div>
  );
}

export default MessageItem;
