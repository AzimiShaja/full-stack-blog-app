import { useContext, useEffect, useState } from "react";
import PostCard from "../PostCard";
import axios from "axios";
import moment from "moment";
import { Input } from "@mui/material";
import { UserStatus } from "../context/UserContext";
export type IComment = {
    author: string;
    content: string;
};
export type IPost = {
    _id: string;
    title: string;
    content: string;
    author: string;
    date: string;
    likes: number;
    noOfcomments: number;
    comments: IComment[];
};
const Home = () => {
    const [posts, setPosts] = useState<IPost[]>([] as IPost[]);
    const [isLoading, setIsLoading] = useState(true);
    const [filteredPosts, setFilteredPosts] = useState<IPost[]>([] as IPost[]);
    const [search, setSearch] = useState("");
    const { fullname } = useContext(UserStatus);

    useEffect(() => {
        setFilteredPosts(posts)
    }, [posts])

    async function getPosts() {
        setIsLoading(true);
        try {
            const api = import.meta.env.VITE_API_URL;
            const response = await axios.get(`${api}/get-posts`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
            const formattedPosts = response.data.posts.map((post: { date: moment.MomentInput }) => ({
                ...post,
                date: moment(post.date).fromNow(),
            }));
            setPosts(formattedPosts);
        } catch (error) {
            console.log(error);
        } finally {
            setTimeout(() => {
                setIsLoading(false);
            }, 1000);
        }
    }

    const refetch = () => {
        getPosts();
    }

    useEffect(() => {
        getPosts();
    }, []);

    return (
        <div className="main">
            <div className="col-start-2 border-l max-h-[calc(100vh-64px)] overflow-auto border-r p-4 flex flex-col items-start gap-10">
                <h1 className="text-3xl font-bold text-purple-700">Home</h1>
                <Input
                    onChange={(ev) => {
                        setSearch(ev.target.value);
                    }}
                    type="text"
                    sx={{ width: "100%" }}
                    value={search}
                    color="secondary"
                    placeholder="Search"
                />
                {filteredPosts?.map((post) => (
                    <PostCard
                        refetch={refetch}
                        key={post._id}
                        post={post}
                        editable={post.author === fullname}
                        isLoading={isLoading}
                    />

                ))}
            </div>
        </div>
    );
};

export default Home;
