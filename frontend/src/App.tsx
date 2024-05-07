import { Route, Routes } from "react-router-dom";
import Signup from "./components/forms/Signup";
import Header from "./components/Header";
import { useContext } from "react";
import Login from "./components/forms/Login";
import { AuthStatus } from "./components/context/AuthContext";
import Home from "./components/routes/Home";

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
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<div>{findPath()}</div>} />
      </Routes>
    </div>
  );
};

export default App;
