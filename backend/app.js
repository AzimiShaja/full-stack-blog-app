import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
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
        const { fullname, email, password, age, gender } = req.body;
        const user = new User({
            fullname,
            email,
            password: await hashPassword(password),
            age,
            gender,
            posts: [],
            favorites: [],
            likedPosts: [],
            createdAt: new Date(),
        });
        await user.save();
        res.status(201).json({ message: "User created successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// login

app.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: "Invalid credentials" });
        }
        const passwordMatch = await checkPassword(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ message: "Incorrect password" });
        }
        res.status(200).json({
            message: "Login successful",
            user,
            accessToken: generateAccessToken({ id: user._id, email }),
        });
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

async function checkPassword(password, hash) {
    return bcrypt.compare(password, hash);
}

function generateAccessToken(user) {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "1h" });
}
