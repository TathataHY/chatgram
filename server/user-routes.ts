import { Request, Response, Router } from "express";
const jwt = require("jsonwebtoken");

import userModel from "./user-model";

const router = Router();

router.post("/auth", async (req: Request, res: Response) => {
  const user = new userModel(req.body);
  try {
    await user.save();
    const accessToken = jwt.sign(
      user.toObject(),
      process.env.ACCESS_TOKEN_SECRET!
    );
    res.setHeader("Set-Cookie", [`user=${accessToken}; Path=/;`]);
    res.send(user);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

router.get("/users", async (req: Request, res: Response) => {
  try {
    const users = await userModel.find();
    res.send(users);
  } catch (error) {
    console.error(error);
  }
});

router.get("/user", async (req: Request, res: Response) => {
  try {
    const data = await jwt.verify(
      req.headers.authorization,
      process.env.ACCESS_TOKEN_SECRET
    );
    const user = await userModel.findOne({ email: data?.email });
    res.send(user);
  } catch (error) {
    console.error(error);
  }
});

router.get("/messages", async (req: Request, res: Response) => {
  try {
    const { sender, receiver } = req.query;

    const user = await userModel.findOne({ email: receiver });

    const messages = user?.messages?.filter(
      (message: any) =>
        (message.sender === sender && message.receiver === receiver) ||
        (message.sender === receiver && message.receiver === sender)
    );

    res.send(messages);
  } catch (error) {
    console.error(error);
  }
});

export default router;
