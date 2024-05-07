import { Button, TextField } from "@mui/material";
import { useContext } from "react";
import { AuthStatus } from "../context/AuthContext";
import image from "../../assets/User.gif";
const Login = () => {
    const { setIsToLogin } = useContext(AuthStatus);
    return (
        <div className="h-[calc(100vh-100px)] flex items-center justify-center max-md:px-8">
            <form className="flex flex-col  gap-3 shadow-xl p-10 border border-gray-300 rounded-lg md:min-w-[500px] max-md:w-full">
                <div className="w-full flex flex-col items-center gap-1 mb-10">
                    <img src={image} className="w-20 h-20" alt="" />
                    <h1 className="md:text-2xl text-xl font-bold">Welcome to GotIdea!</h1>
                    <h1 className="md:text-md text-sm font-light text-gray-400">
                        Please login to your account
                    </h1>
                </div>
                <TextField
                    id="outlined-basic"
                    size="small"
                    label="Email address"
                    variant="outlined"
                    color="secondary"
                />
                <TextField
                    id="outlined-basic"
                    size="small"
                    label="Password"
                    variant="outlined"
                    color="secondary"
                />
                <Button type="submit" color="secondary" variant="contained">
                    Login
                </Button>
                <p className="text-center font-light">
                    Don't have an account?{" "}
                    <Button size="small" color="secondary" onClick={() => setIsToLogin(false)}>
                        Create Account
                    </Button>
                </p>
            </form>
        </div>
    );
};

export default Login;
