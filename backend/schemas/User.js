import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    fullname: String,
    email: String,
    password: String,
});
export const User = mongoose.model("User", userSchema);
