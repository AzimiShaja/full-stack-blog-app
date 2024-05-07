import { GiTeamIdea } from "react-icons/gi";
import About from "./Dialogs/About";
import { useState } from "react";
const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className="flex justify-around items-center max-md:justify-between p-5 gap-5">
            <h1 className="text-3xl font-pacifico cursor-pointer hover:text-purple-700 transition-all font-bold flex items-center justify-center gap-2">
                <GiTeamIdea size={40} />
                gotIdea
            </h1>
            <nav>
                <ul className="flex gap-5 nav-links max-md:hidden">
                    <li onClick={() => setIsOpen(true)}>What Is gotIdea?</li>
                    <li>FAQ</li>
                    <li>Report an Issue</li>
                </ul>
            </nav>
            <About isOpen={isOpen} setIsOpen={setIsOpen} />
        </div>
    );
};

export default Header;
