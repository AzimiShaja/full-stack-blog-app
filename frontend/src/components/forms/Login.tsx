import { Button, TextField } from "@mui/material";
import { useContext } from "react";
import { AuthStatus } from "../context/AuthContext";

const Login = () => {
    const { setIsToLogin } = useContext(AuthStatus);
    return (
        <div className="h-[calc(100vh-100px)] flex items-center justify-center">
            <form className="flex flex-col  gap-3 shadow-xl p-10 border border-gray-300 rounded-lg lg:min-w-[500px]">
                <div className="w-full flex flex-col items-center gap-1 mb-10">
                    <h1 className="text-2xl font-bold">Account Login</h1>
                    <h1 className="text-md font-light text-gray-400">Sign in to your account</h1>
                </div>
                <TextField id="outlined-basic" size="small" label="Email address" variant="outlined" />
                <TextField id="outlined-basic" size="small" label="Password" variant="outlined" />
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
