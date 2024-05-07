import { Route, Routes } from "react-router-dom";
import Signup from "./components/forms/Signup";
import Header from "./components/Header";
import { useContext } from "react";
import Login from "./components/forms/Login";
import { AuthStatus } from "./components/context/AuthContext";

const App = () => {

  const { isToLogin } = useContext(AuthStatus);
  return (
    <div>
      <Header />
      <Routes>
        <Route
          path="/"
          element={
            <div>
              {isToLogin ? <Login /> : <Signup />}
            </div>
          }
        />
      </Routes>
    </div>
  );
};

export default App;
