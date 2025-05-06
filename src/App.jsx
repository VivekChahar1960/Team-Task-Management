import { useState } from "react";
import { Navigate, useNavigate,Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./Componenets/Login/Login";
import Admindash from "./Componenets/Admindash/Admindash";
import Employeedash from "./Componenets/Employeedash/Employeedash";
import UnAuthorised from "./Componenets/UnAuthorised/UnAuthorised";
import { useNotification } from "./Context/NotificationContext";

function App() {
  const [user, setUser] = useState(() => window.localStorage.getItem("user"));
  const navigate = useNavigate();
  const [userRole, setUserRole] = useState(() =>
    window.localStorage.getItem("role")
  );
  const { showNotification } = useNotification();
  const logout = () => {
    if (user && userRole) {
      window.localStorage.removeItem("user");
      window.localStorage.removeItem("role");
      window.localStorage.removeItem("empcode");
      setUser(null);
      setUserRole(null);
      showNotification("User Logged Out Succesfully");
      setTimeout(() => {
        navigate("/");
      }, 600);
    }
  };

  return (
    <>
      <Routes>
      <Route
          path="/"
          element={
            user && userRole ? (
              <Navigate to={`/${userRole}`} replace />
            ) : (
              <Login setUserAd={setUser} setUserRoleAd={setUserRole} />
            )
          }
        />
        <Route
          path="/admin"
          element={
            userRole === "admin" ? (
              <Admindash logout={logout} />
            ) : (
              <UnAuthorised />
            )
          }
        />
        <Route
          path="/employee"
          element={
            userRole === "employee" ? (
              <Employeedash logout={logout} />
            ) : (
              <UnAuthorised />
            )
          }
        />
      </Routes>
    </>
  );
}

export default App;
