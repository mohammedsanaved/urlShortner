import mongoose from "mongoose";
import shortid from "shortid";

const urlshort = new mongoose.Schema({
  full: {
    type: String,
    required: true,
  },
  short: {
    type: String,
    required: true,
    default: shortid.generate,
  },
  clicks: {
    type: Number,
    required: true,
    default: 0,
  },
});

const UrlModel = mongoose.model("urlShort", urlshort);
export default UrlModel;
