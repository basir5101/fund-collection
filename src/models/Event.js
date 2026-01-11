import mongoose from "mongoose";

const EventSchema = new mongoose.Schema({
  name: {
    type: String,
    required: false,
  },
  totalAmount: {
    type: Number,
    required: true,
  },
  active: {
    type: Boolean,
    default: true,
  },
  date: {
    type: Date,
    required: true,
  },
});

export default mongoose.models.Event || mongoose.model("Event", EventSchema);
