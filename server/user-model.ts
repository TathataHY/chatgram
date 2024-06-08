import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  // password: String,
  imageId: String,
  messages: [{ message: String, sender: String, receiver: String, time: Date }],
});

export default mongoose.model("User", userSchema, "chatgram_users");
