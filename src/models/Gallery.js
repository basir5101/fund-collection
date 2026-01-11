import mongoose from "mongoose";

const GallerySchema = new mongoose.Schema({
  event: {
    type: String,
    required: false,
  },
  image: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Gallery ||
  mongoose.model("Gallery", GallerySchema);
