import mongoose from "mongoose";

const DonorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  currency: {
    type: String,
    required: false,
  },
  medium: {
    type: String,
    required: false,
    enum: ["bkash", "nagad", "rocket", "bank", "website", "campaign"],
  },
  message: {
    type: String,
    required: false,
  },
  transactionId: {
    type: String,
    required: false,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Donor || mongoose.model("Donor", DonorSchema);
