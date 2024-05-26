import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    fullname: String,
    email: String,
    password: String,
    gender: String,
    age: String,
    bio: String,
    favorites: [String],
    likedPosts: [String],
    createdAt: { type: Date, default: Date.now },
});
export const User = mongoose.model("User", userSchema);
