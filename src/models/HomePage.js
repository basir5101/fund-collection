import mongoose from "mongoose";

const HomePageSchema = new mongoose.Schema({
  bannerTitle: {
    type: String,
    required: true,
  },
  bannerSubtitle: {
    type: String,
    required: true,
  },
  bannerContent: {
    type: String,
    required: true,
  },
  bannerImage: {
    type: String,
    required: false,
  },
  bannerVideo: {
    type: String,
    required: false,
  },
  whyNeedTitle: {
    type: String,
    required: true,
  },
  whyNeedImage: {
    type: String,
    required: true,
  },
  whyNeedContent: {
    type: String,
    required: true,
  },

  footerText: {
    type: String,
    required: true,
  },
});

export default mongoose.models.HomePage ||
  mongoose.model("HomePage", HomePageSchema);
