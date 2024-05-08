import { GiTeamIdea } from "react-icons/gi";
import About from "./Dialogs/About";
import { useContext, useState } from "react";
import { AuthStatus } from "./context/AuthContext";
import { Avatar, IconButton, Tab, Tabs, Tooltip } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { IoCreateOutline } from "react-icons/io5";
import SearchIcon from "@mui/icons-material/Search";
import av1 from "../assets/avatars/av1.jpg";
import { useNavigate } from "react-router-dom";
const Header = () => {
    const { isUserLoggedIn } = useContext(AuthStatus);
    const [isOpen, setIsOpen] = useState(false);
    const [tab, setTab] = useState(NaN);
    const navigate = useNavigate();
    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        event;
        setTab(newValue);
    };

    return (
        <div className="flex sticky top-0 z-50 justify-around items-center max-md:justify-center p-5 gap-5">
            <h1 className="text-3xl font-pacifico max-md:hidden cursor-pointer hover:text-purple-700 transition-all font-bold flex items-center justify-center gap-2">
                <GiTeamIdea size={40} />
                {isUserLoggedIn ? "" : "gotIdea"}
            </h1>

            {isUserLoggedIn ? (
                <Tabs indicatorColor="secondary" textColor="secondary" value={tab} onChange={handleChange}>
                    <Tooltip title="Home">
                        <Tab icon={<HomeIcon />} aria-label="home" onClick={() => navigate("/")} />
                    </Tooltip>
                    <Tooltip title="Search">
                        <Tab icon={<SearchIcon />} aria-label="person" onClick={() => navigate("/search")} />
                    </Tooltip>
                    <Tooltip title="Create">
                        <Tab
                            icon={<IoCreateOutline size={25} className="mb-1" />}
                            onClick={() => navigate("/createpost")}
                            aria-label="create"
                        />
                    </Tooltip>
                    <Tooltip title="Favorites">
                        <Tab
                            icon={<FavoriteIcon />}
                            onClick={() => navigate("/favorites")}
                            aria-label="favorite"
                        />
                    </Tooltip>
                </Tabs>
            ) : (
                <nav>
                    <ul className="flex gap-5 nav-links max-md:hidden">
                        <li onClick={() => setIsOpen(true)}>What Is gotIdea?</li>
                        <li>FAQ</li>
                        <li>Report an Issue</li>
                    </ul>
                </nav>
            )}
            <About isOpen={isOpen} setIsOpen={setIsOpen} />
            {isUserLoggedIn && (
                <div onClick={() => { navigate("/profile"); setTab(NaN) }} className="max-md:hidden">
                    <IconButton color="secondary">
                        <Avatar
                            src={av1}
                            alt="avatar"
                            sx={{ width: 35, height: 35 }}
                            className="cursor-pointer"
                        />
                    </IconButton>
                </div>
            )}
        </div>
    );
};

export default Header;
