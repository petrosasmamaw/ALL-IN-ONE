import mongoose from "mongoose";

const clientSchema = new mongoose.Schema(
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
  },
  { timestamps: true }
);

export default mongoose.model("Client", clientSchema);
