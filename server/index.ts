import "dotenv/config";

import cors from "cors";
import express from "express";
import http from "http";
import jwt from "jsonwebtoken";
import moongose from "mongoose";
import { Server } from "socket.io";

import userModel from "./user-model";
import userRouter from "./user-routes";

const app = express();
const server = http.createServer(app);
const { PORT } = process.env || 4000;

app.use(cors());
app.use(express.json());

app.use("/", userRouter);

moongose
  .connect(process.env.DATABASE_URL!)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(err));
const db = moongose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
});

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  socket.on("joined", () => {
    io.sockets.emit("new_user");
  });

  socket.on("private_message", async ({ to, from, message }) => {
    const decoded = jwt.verify(from, process.env.ACCESS_TOKEN_SECRET!);
    const sender = await userModel
      .findById(decoded)
      .catch((err) => console.error(err));

    const receiver = await userModel
      .findOne({ email: to })
      .catch((err) => console.error(err));

    if (receiver && sender) {
      const messageData = {
        receiver: receiver.email,
        sender: sender.email,
        message,
        time: new Date(),
      };

      receiver.messages.push(messageData);
      sender.messages.push(messageData);

      await receiver.save();
      await sender?.save();

      io.sockets.emit("refresh");
    }
  });
});
