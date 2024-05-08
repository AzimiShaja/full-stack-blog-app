import React, { createContext, useState } from "react";

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
    posts: string[];
    setPosts: React.Dispatch<React.SetStateAction<string[]>>;
    favorites: string[];
    setFavorites: React.Dispatch<React.SetStateAction<string[]>>;
    likedPosts: string[];
    setLikedPosts: React.Dispatch<React.SetStateAction<string[]>>;
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
    const [posts, setPosts] = useState<string[]>([]);
    const [favorites, setFavorites] = useState<string[]>([]);
    const [likedPosts, setLikedPosts] = useState<string[]>([]);

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
            }}
        >
            {children}
        </UserStatus.Provider>
    );
};

export default UserContext;
