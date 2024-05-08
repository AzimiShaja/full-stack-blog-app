import { Alert, Button, LinearProgress, Snackbar, TextField } from "@mui/material";
import { useContext, useState } from "react";
import { AuthStatus } from "../context/AuthContext";
import image from "../../assets/User.gif";
import { UserStatus } from "../context/UserContext";
import axios from "axios";
const Login = () => {
    const { setEmail, setPassword, password, email } = useContext(UserStatus);
    const { setIsToLogin, setIsUserLoggedIn } = useContext(AuthStatus);
    const [isLoading, setIsLoading] = useState(false);
    const [openToast, setOpenToast] = useState(false);
    const [toastStatus, setToastStatus] = useState<"success" | "error">();

    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        event;
        if (reason === "clickaway") {
            return;
        }

        setOpenToast(false);
    };

    async function handleLogin(ev: React.FormEvent<HTMLFormElement>) {
        ev.preventDefault();
        setIsLoading(true);
        try {
            const api = import.meta.env.VITE_API_URL;
            const response = await axios.post(`${api}/login`, {
                email,
                password,
            });


            localStorage.setItem("token", response.data.accessToken);
            setOpenToast(true);
            setToastStatus("success");
            setIsUserLoggedIn(true);
        } catch (error) {
            setOpenToast(true);
            setToastStatus("error");
        } finally {
            setIsLoading(false);
        }
    }
    return (
        <div className="h-[calc(100vh-80px)] flex items-center justify-center max-md:px-2">
            <form onSubmit={handleLogin} className={`flex flex-col ${isLoading && "animate-pulse"} gap-3 shadow-2xl p-10 border-b-4 border-purple-700 rounded-sm md:min-w-[500px] max-md:w-full`}>
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
                    required
                    variant="outlined"
                    color="secondary"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <TextField
                    id="outlined-basic"
                    size="small"
                    label="Password"
                    variant="outlined"
                    color="secondary"
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                {isLoading && <LinearProgress color="secondary" />}
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
            <Snackbar open={openToast} autoHideDuration={6000} onClose={handleClose}>
                <Alert
                    onClose={handleClose}
                    severity={toastStatus === "success" ? "success" : "error"}
                    variant="filled"
                    sx={{ width: "100%" }}
                >
                    {toastStatus === "success"
                        ? "Login Successful"
                        : "Something went wrong. Please try again"}
                </Alert>
            </Snackbar>
        </div>
    );
};

export default Login;
