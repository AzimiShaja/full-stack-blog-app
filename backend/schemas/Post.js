import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    title: String,
    content: String,
    author: String,
    date: { type: Date, default: Date.now },
    likes: Number,
    noOfcomments: Number,
    comments: [
        {
            author: String,
            content: String,
        },
    ],
});
export const Post = mongoose.model("Post", postSchema);
