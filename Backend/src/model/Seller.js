import mongoose from "mongoose";

const sellerSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    image: { type: String },
    userId: { type: String, required: true, unique: true },
    phoneNo: { type: String, required: true },

    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "inactive",
    },

    category: {
      type: String,
      enum: ["Freelancers", "Items", "Laborers", "Services", "Jobs"],
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Seller", sellerSchema);
