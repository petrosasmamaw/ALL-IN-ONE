import mongoose from "mongoose";

const chatSchema = new mongoose.Schema(
  {
    itemId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Item",
      required: true,
    },
    clientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Client",
      required: true,
    },
    sellerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Seller",
      required: true,
    },
    text: { type: String },
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      refPath: "senderModel",
    },
    
  },
  { timestamps: true }
);

export default mongoose.model("Chat", chatSchema);
