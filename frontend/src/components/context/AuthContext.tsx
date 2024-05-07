import { createContext, useState } from "react";

type AuthContextType = {
    isToLogin: boolean;
    setIsToLogin: React.Dispatch<React.SetStateAction<boolean>>;
    isUserLoggedIn: boolean;
    setIsUserLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
};
export const AuthStatus = createContext<AuthContextType>({} as AuthContextType);
const AuthContext = ({ children }: React.PropsWithChildren) => {
    const [isToLogin, setIsToLogin] = useState(true);
    const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
    return (
        <AuthStatus.Provider
            value={{
                isToLogin,
                setIsToLogin,
                isUserLoggedIn,
                setIsUserLoggedIn,
            }}
        >
            {children}
        </AuthStatus.Provider>
    );
};

export default AuthContext;
