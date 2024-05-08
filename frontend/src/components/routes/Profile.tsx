import { useContext, useState } from "react";
import { UserStatus } from "../context/UserContext";
import av1 from "../../assets/avatars/av1.jpg";
import { Avatar, Button, Tab, Tabs } from "@mui/material";
const Profile = () => {
    const { fullname, email, posts, favorites, likedPosts } = useContext(UserStatus);
    const [value, setValue] = useState(0);
    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        event;
        setValue(newValue);
    };
    return (
        <div className="main">
            <div className="col-start-2 border-l max-h-[calc(100vh-64px)] overflow-auto border-r p-4 flex flex-col items-start gap-10">
                <h1 className="text-3xl font-bold text-purple-700">Profile</h1>

                <div className="w-full flex flex-col items-center gap-4 justify-between">
                    <div className="flex flex-col items-center gap-5">
                        <Avatar alt="Remy Sharp" src={av1} sx={{ width: 150, height: 150 }} />
                        <div className="flex flex-col gap-1 items-center">
                            <h1 className="text-2xl font-bold">{fullname.toUpperCase()}</h1>
                            <p className="text-sm font-light text-gray-500">{email}</p>
                        </div>
                    </div>
                    <div className="flex items-center flex-col gap-3 w-full">
                        <Button color="secondary" variant="outlined">
                            Edit Profile
                        </Button>
                        <Button color="error" variant="contained">
                            Log Out
                        </Button>
                    </div>
                </div>
                <div className="w-full">
                    <Tabs
                        sx={{ width: "100%" }}
                        indicatorColor="secondary"
                        textColor="secondary"
                        value={value}
                        onChange={handleChange}
                    >
                        <Tab sx={{ width: "100%" }} label="Posts" />
                        <Tab sx={{ width: "100%" }} label="Favorites" />
                    </Tabs>
                </div>
            </div>
        </div>
    );
};

export default Profile;
