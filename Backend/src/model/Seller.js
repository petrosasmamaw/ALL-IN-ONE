import mongoose from "mongoose";

const sellerSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    image: { type: String },
    userId: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "inactive",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Seller", sellerSchema);
