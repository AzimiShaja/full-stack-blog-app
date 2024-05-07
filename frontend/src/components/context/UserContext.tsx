import React, { createContext, useState } from "react";

type UserContextType = {
    fullname: string;
    setFullname: React.Dispatch<React.SetStateAction<string>>;
    email: string;
    setEmail: React.Dispatch<React.SetStateAction<string>>;
    password: string;
    setPassword: React.Dispatch<React.SetStateAction<string>>;
};

export const UserStatus = createContext<UserContextType>({} as UserContextType);
const UserContext = ({ children }: React.PropsWithChildren) => {
    const [fullname, setFullname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    return (
        <UserStatus.Provider value={{ fullname, setFullname, email, setEmail, password, setPassword }}>
            {children}
        </UserStatus.Provider>
    );
};

export default UserContext;
