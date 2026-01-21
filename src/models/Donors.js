import mongoose from "mongoose";

const DonorSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  amount: {
    type: Number,
    required: true,
  },
  currency: {
    type: String,
  },
  medium: {
    type: String,
    required: false,
    enum: ["bkash", "nagad", "rocket", "bank", "website", "campaign"],
  },
  message: {
    type: String,
  },
  transactionId: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Donor || mongoose.model("Donor", DonorSchema);
