import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import cors from "cors";
import bcrypt from "bcrypt";
import { User } from "./schemas/User.js";
import { Post } from "./schemas/Post.js";
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
            user: {
                id: user._id,
                fullname: user.fullname,
                email: user.email,
                age: user.age,
                gender: user.gender,
                posts: user.posts,
                favorites: user.favorites,
                likedPosts: user.likedPosts,
            },
            accessToken: generateAccessToken({ id: user._id, email }),
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// get all posts
app.get("/get-posts", authenticateToken, async (req, res) => {
    try {
        const posts = await Post.find().sort({ date: -1 });
        res.status(200).json({ message: "Posts fetched successfully", posts });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// create post
app.post("/create-post", authenticateToken, async (req, res) => {
    try {
        const { title, content, author } = req.body;
        const post = new Post({
            title,
            content,
            author,
            date: new Date(),
            likes: 0,
            noOfcomments: 0,
            comments: [],
        });
        await post.save();
        res.status(201).json({ message: "Post created successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// get user posts

app.post("/get-user-posts", authenticateToken, async (req, res) => {
    try {
        const { fullname } = req.body;
        const posts = await Post.find({ author: fullname }).sort({ date: -1 });
        res.status(200).json({ message: "Posts fetched successfully", posts });
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

function authenticateToken(req, res, next) {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (token == null) {
        return res.sendStatus(401);
    }
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) {
            return res.sendStatus(403);
        }
        req.user = user;
        next();
    });
}
