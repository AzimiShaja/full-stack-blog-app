import React, { createContext, useState } from "react";
import { IPost } from "../routes/Home";

type UserContextType = {
    fullname: string;
    setFullname: React.Dispatch<React.SetStateAction<string>>;
    email: string;
    setEmail: React.Dispatch<React.SetStateAction<string>>;
    password: string;
    setPassword: React.Dispatch<React.SetStateAction<string>>;
    confirmPassword: string;
    setConfirmPassword: React.Dispatch<React.SetStateAction<string>>;
    gender: string;
    setGender: React.Dispatch<React.SetStateAction<string>>;
    age: string;
    setAge: React.Dispatch<React.SetStateAction<string>>;
    bio: string;
    setBio: React.Dispatch<React.SetStateAction<string>>;
    posts: IPost[];
    setPosts: React.Dispatch<React.SetStateAction<IPost[]>>;
    favorites: string[];
    setFavorites: React.Dispatch<React.SetStateAction<string[]>>;
    likedPosts: string[];
    setLikedPosts: React.Dispatch<React.SetStateAction<string[]>>;
    isUserPost: boolean,
    setIsUserPost: React.Dispatch<React.SetStateAction<boolean>>;
};

export const UserStatus = createContext<UserContextType>({} as UserContextType);
const UserContext = ({ children }: React.PropsWithChildren) => {
    const [fullname, setFullname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [gender, setGender] = useState("Select Gender");
    const [age, setAge] = useState("");
    const [bio, setBio] = useState("");
    const [posts, setPosts] = useState<IPost[]>([] as IPost[]);
    const [favorites, setFavorites] = useState<string[]>([]);
    const [likedPosts, setLikedPosts] = useState<string[]>([]);
    const [isUserPost, setIsUserPost] = useState(false);

    return (
        <UserStatus.Provider
            value={{
                fullname,
                setFullname,
                email,
                setEmail,
                password,
                setPassword,
                gender,
                setGender,
                age,
                setAge,
                bio,
                setBio,
                confirmPassword,
                setConfirmPassword,
                posts,
                setPosts,
                favorites,
                setFavorites,
                likedPosts,
                setLikedPosts,
                isUserPost,
                setIsUserPost
            }}
        >
            {children}
        </UserStatus.Provider>
    );
};

export default UserContext;
