import mongoose from "mongoose";

const blogPostSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    content: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
      default: "Anonymous",
    },
  },
  { timestamps: true } 
);

const BlogPost = mongoose.model("Post", blogPostSchema);

export default Post;
