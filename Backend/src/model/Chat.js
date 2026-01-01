import mongoose from "mongoose";

const chatSchema = new mongoose.Schema(
  {
    itemId: { type: String, required: true },
    clientId: { type: String },
    sellerId: { type: String, required: true, unique: true },
    message: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model("Chat", chatSchema);
