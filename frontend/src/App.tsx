import { Route, Routes } from "react-router-dom";
import Signup from "./components/forms/Signup";
import Header from "./components/Header";
import { useContext } from "react";
import Login from "./components/forms/Login";
import { AuthStatus } from "./components/context/AuthContext";
import Home from "./components/routes/Home";
import Search from "./components/routes/Search";
import CreatePost from "./components/routes/CreatePost";
import Favorites from "./components/routes/Favorites";

const App = () => {
  const { isToLogin, isUserLoggedIn } = useContext(AuthStatus);
  const findPath = () => {
    if (isUserLoggedIn) {
      return <Home />;
    } else {
      if (isToLogin) {
        return <Login />;
      } else {
        return <Signup />;
      }
    }
  };

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={findPath()} />
        <Route path="/search" element={<Search />} />
        <Route path="/createpost" element={<CreatePost />} />
        <Route path="/favorites" element={<Favorites />} />
      </Routes>
    </>
  );
};

export default App;
