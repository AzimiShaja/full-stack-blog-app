import { Button, TextField } from "@mui/material";
import { useContext } from "react";
import { AuthStatus } from "../context/AuthContext";
const Signup = () => {
    const { setIsToLogin } = useContext(AuthStatus);
    return (
        <div className="h-[calc(100vh-80px)] flex items-center justify-center max-md:px-8">
            <form className="flex flex-col bg-white gap-3 shadow-xl p-10 border border-gray-300 rounded-lg md:min-w-[500px] max-md:w-full">
                <div className="w-full flex flex-col items-center gap-1 mb-10">
                    <h1 className="text-2xl font-bold">Account Creation</h1>
                    <h1 className="text-md font-light text-gray-400">Sign Up your account</h1>
                </div>
                <TextField id="outlined-basic" size="small" label="Full Name" variant="outlined" />
                <TextField id="outlined-basic" size="small" label="Email address" variant="outlined" />
                <TextField id="outlined-basic" size="small" label="Password" variant="outlined" />
                <Button type="submit" color="secondary" variant="contained">
                    Create Account
                </Button>
                <p className="text-center font-light">
                    Already have an account?{" "}
                    <Button size="small" color="secondary" onClick={() => setIsToLogin(true)}>
                        Login
                    </Button>
                </p>
            </form>
        </div>
    );
};

export default Signup;
