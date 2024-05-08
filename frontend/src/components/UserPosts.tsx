import { useContext, useEffect, useState } from "react";
import { IPost } from "./routes/Home";
import axios from "axios";
import { UserStatus } from "./context/UserContext";
import PostCard from "./PostCard";
import moment from "moment";

const UserPosts = () => {
    const [posts, setPosts] = useState<IPost[]>([] as IPost[]);
    const { fullname } = useContext(UserStatus);
    const [isLoading, setIsLoading] = useState(true);

    async function getPosts() {
        setIsLoading(true);
        try {
            const api = import.meta.env.VITE_API_URL;
            const response = await axios.post(
                `${api}/get-user-posts`,
                {
                    fullname,
                },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );
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

    useEffect(() => {
        getPosts();
    }, []);

    return (
        <div className="flex flex-col gap-10">
            {posts.map((post) => (
                <PostCard key={post.id} post={post} isLoading={isLoading} />
            ))}
        </div>
    );
};

export default UserPosts;
