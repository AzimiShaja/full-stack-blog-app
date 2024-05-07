import { GiTeamIdea } from "react-icons/gi";
const Header = () => {
    return (
        <div className="flex justify-around shadow-md items-center max-md:justify-between p-5 gap-5">
            <h1 className="text-3xl cursor-pointer hover:text-purple-700 transition-all font-bold flex items-center justify-center gap-2">
                <GiTeamIdea size={40} />
                GotIdea
            </h1>
            <nav>
                <ul className="flex gap-5 nav-links max-md:hidden">
                    <li>What Is GotIdea?</li>
                    <li>FAQ</li>
                    <li>Report an Issue</li>
                </ul>
            </nav>
        </div>
    );
};

export default Header;
