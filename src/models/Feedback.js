import mongoose from "mongoose";

const FeedbackSchema = new mongoose.Schema({
  tags: { type: [String], required: true },
  message: { type: String, required: true },
  name: { type: String, default: "Anonymous" },
  contact: { type: String, default: "N/A" },
  status: { type: String, default: "new" },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Feedback ||
  mongoose.model("Feedback", FeedbackSchema);
