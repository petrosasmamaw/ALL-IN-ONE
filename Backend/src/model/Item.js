import mongoose from "mongoose";

const itemSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    image: { type: String },
    sellerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Seller",
      required: true,
    },
    category: {
      type: String,
      enum: ["Freelancers", "Items", "Laborers", "Services", "Jobs"],
      required: true,
    },
    description: { type: String },
    price: { type: Number, required: true },
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "inactive",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Item", itemSchema);

