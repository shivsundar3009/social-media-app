import mongoose from "mongoose";

// Comment Schema
const commentSchema = new mongoose.Schema(
  {
    commentedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    commentText: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true }
);

// Post Schema
const postSchema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    caption: {
      type: String,
      trim: true,
    },
    media: {
      type: [
        {
          url: { type: String, required: true }, // Ensure URL is required
          mediaType: { type: String, required: true }, // Ensure mediaType is required
        },
      ],
      required: true, // Ensure media array itself is required
    },
    likedBy: {
      type: [mongoose.Schema.Types.ObjectId], // Array of user IDs who liked the post
      ref: "User",
      default: [],
    },
    comments: {
      type: [mongoose.Schema.Types.ObjectId], // Array of comment IDs
      ref: "Comment",
      default: [],
    },
  },
  { timestamps: true }
);

// Export Models
export const Post = mongoose.model("Post", postSchema);
export const Comment = mongoose.model("Comment", commentSchema);
