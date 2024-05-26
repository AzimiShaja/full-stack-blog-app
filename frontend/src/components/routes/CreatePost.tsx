import { Button, LinearProgress, TextField } from "@mui/material";
import axios from "axios";
import { useContext, useState } from "react";
import { UserStatus } from "../context/UserContext";

const CreatePost = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const { fullname } = useContext(UserStatus);
    const [loading, setLoading] = useState(false);

    const resetFields = () => {
        setDescription("");
        setTitle("");
    };

    async function submitAPost(ev: React.FormEvent<HTMLFormElement>) {
        ev.preventDefault();
        setLoading(true);
        try {
            const api = import.meta.env.VITE_API_URL;
            await axios.post(
                `${api}/create-post`,
                {
                    title,
                    content: description,
                    author: fullname,
                },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );
        } catch (error) {
            console.log(error);
        } finally {
            setTimeout(() => {
                setLoading(false);
            }, 1000)
            resetFields();
        }
    }

    return (
        <div className="main">
            <div className="col-start-2 border-l max-h-[calc(100vh-64px)] overflow-auto border-r p-4 flex flex-col items-start gap-10">
                <h1 className="text-3xl font-bold text-purple-700">Create a post</h1>
                <form onSubmit={submitAPost} className="w-full flex gap-3 flex-col">
                    <TextField
                        id="outlined-basic"
                        size="small"
                        sx={{ width: "100%" }}
                        placeholder="Title"
                        type="text"
                        required
                        value={title}
                        variant="outlined"
                        color="secondary"
                        onChange={(ev) => setTitle(ev.target.value)}
                    />
                    <TextField
                        id="outlined-basic"
                        size="medium"
                        sx={{ width: "100%" }}
                        placeholder="Description"
                        type="text"
                        value={description}
                        required
                        variant="outlined"
                        color="secondary"
                        onChange={(ev) => setDescription(ev.target.value)}
                    />
                    {loading && <LinearProgress variant="query" color="secondary" />}
                    <Button type="submit" color="secondary" variant="contained">
                        Post
                    </Button>
                </form>
            </div>
        </div>
    );
};

export default CreatePost;
