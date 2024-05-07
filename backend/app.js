import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import bcrypt from "bcrypt";
import { User } from "./schemas/User.js";
const app = express();
dotenv.config();
app.use(cors());
app.use(express.json());
// connect to database
mongoose
    .connect(process.env.MONGODB_KEY)
    .then(() => {
        console.log("Connected to database");
    })
    .catch((err) => {
        console.log(err);
    });

// create account

app.post("/signup", async (req, res) => {
    try {
        const { fullname, email, password } = req.body;
        const user = new User({
            fullname,
            email,
            password: await hashPassword(password),
        });
        await user.save();
        res.status(201).json({ message: "User created successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});

async function hashPassword(password) {
    const saltRounds = 10;
    return bcrypt.hash(password, saltRounds);
}
