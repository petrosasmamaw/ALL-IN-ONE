import mongoose from "mongoose";

const chatSchema = new mongoose.Schema(
  {
    itemId: { type: String, required: true },
    clientId: { type: String, required: true },
    sellerId: { type: String, required: true },
    messages: [
      {
        senderId: { type: String, required: true },
        text: { type: String, required: true },
        createdAt: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("Chat", chatSchema);
