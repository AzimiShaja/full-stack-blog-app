import { Alert, Button, LinearProgress, Snackbar, TextField } from "@mui/material";
import { useContext, useState } from "react";
import { AuthStatus } from "../context/AuthContext";
import image from "../../assets/User.gif";
import { UserStatus } from "../context/UserContext";
import axios from "axios";
const Signup = () => {
    const { fullname, email, password, setFullname, setEmail, setPassword } = useContext(UserStatus);
    const { setIsToLogin } = useContext(AuthStatus);
    const [isLoading, setIsLoading] = useState(false);
    const [openToast, setOpenToast] = useState(false);
    const [toastStatus, setToastStatus] = useState<"success" | "error">();

    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        event
        if (reason === "clickaway") {
            return;
        }

        setOpenToast(false);
    };

    const resetForm = () => {
        setFullname("");
        setEmail("");
        setPassword("");
    }
    async function handleCreateAccount(ev: React.FormEvent<HTMLFormElement>) {
        ev.preventDefault();
        setIsLoading(true);
        try {
            const api = import.meta.env.VITE_API_URL;
            await axios.post(`${api}/signup`, {
                fullname,
                email,
                password,
            });
            setOpenToast(true);
            setToastStatus("success");
            resetForm();
        } catch (error) {
            setOpenToast(true);
            setToastStatus("error");
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="h-[calc(100vh-80px)] flex items-center justify-center max-md:px-8">
            <form
                onSubmit={handleCreateAccount}
                className="flex flex-col bg-white gap-3 shadow-xl p-10 border border-gray-300 rounded-lg md:min-w-[500px] max-md:w-full"
            >
                <div className="w-full flex flex-col items-center gap-1 mb-10">
                    <img src={image} className="w-20 h-20" alt="" />
                    <h1 className="md:text-2xl text-xl font-bold">Account Creation</h1>
                    <h1 className="md:text-md text-sm font-light text-gray-400">Sign Up your account</h1>
                </div>
                <TextField
                    id="outlined-basic"
                    size="small"
                    label="Full Name"
                    variant="outlined"
                    required
                    color="secondary"
                    value={fullname}
                    onChange={(e) => setFullname(e.target.value)}
                />
                <TextField
                    id="outlined-basic"
                    size="small"
                    type="email"
                    label="Email address"
                    required
                    variant="outlined"
                    value={email}
                    color="secondary"
                    onChange={(e) => setEmail(e.target.value)}
                />
                <TextField
                    id="outlined-basic"
                    size="small"
                    label="Password"
                    type="password"
                    required
                    variant="outlined"
                    value={password}
                    color="secondary"
                    onChange={(e) => setPassword(e.target.value)}
                />
                {isLoading && <LinearProgress color="secondary" />}
                <Button type="submit" color="secondary" variant="contained">
                    Create Account
                </Button>
                <p className="text-center font-light">
                    Already have an account?{" "}
                    <Button
                        disabled={isLoading}
                        size="small"
                        color="secondary"
                        onClick={() => setIsToLogin(true)}
                    >
                        Login
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
                    {toastStatus === "success" ? "Account created successfully" : "Account with this email already exists"}
                </Alert>
            </Snackbar>
        </div>
    );
};

export default Signup;
