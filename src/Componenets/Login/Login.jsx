// Login.jsx

import React, { use } from "react";
import "./Login.css";
import { useState } from "react";
// import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../../firebaseConfig";
import { getDatabase, ref, set, get } from "firebase/database";
import { Navigate } from "react-router-dom";
import TTM_img from "../../assets/TTM_icon.png";
import { useNotification } from "../../Context/NotificationContext";

const Login = ({ setUserAd, setUserRoleAd }) => {
  const [user, setUser] = useState("");
  const [email, setEmail] = useState("");
  const [empcode, setEmpCode] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("admin");
  const [loggedin, setLoggedin] = useState(false);
  const [signedin, setSignedin] = useState(false);
  const db = getDatabase();

  const { showNotification } = useNotification();

  function signUpSubmit() {
    if (!user || !role || !empcode || !password || !email) {
      showNotification("Please fill all details");
      return;
    }

    const dbRef = ref(db, `users/${empcode}`);

    get(dbRef).then((snapshot) => {
      if (snapshot.exists()) {
        showNotification("Employee already exists");
      } else {
        const newUserData = {
          user: user,
          email: email,
          role: role,
          password: password,
          employeeCode: empcode,
        };

        set(dbRef, newUserData)
          .then(() => {
            showNotification("Registered successfully");
            window.localStorage.setItem("user", newUserData.user);
            window.localStorage.setItem("role", newUserData.role);
            window.localStorage.setItem("empcode", empcode);
            setUserAd(newUserData.user);
            setUserRoleAd(newUserData.role);
            setTimeout(() => {
              <Navigate to={data.role === "admin" ? "/admin" : "/employee"} replace/>;
            }, 1000);
          })
          .catch((error) => {
            showNotification("Error during registration");
            console.error("Registration error:", error);
          });
      }
    });
  }
  function logInSubmit() {
    const readLogin = async (empcode) => {
      try {
        const snapshot = await get(ref(db, `users/${empcode}`));
        const data = snapshot.val();
        if (password === data.password) {
          setLoggedin(true);
          setUser(data.user);
          setEmail(data.email);
          setRole(data.role);

          window.localStorage.setItem("user", data.user);
          window.localStorage.setItem("role", data.role);
          window.localStorage.setItem("empcode", empcode);

          setUserAd(data.user);
          setUserRoleAd(data.role);
          showNotification("Logged In Scuccesfully");
          setTimeout(() => {
            <Navigate to={data.role === "admin" ? "/admin" : "/employee"} replace/>;
          }, 2000);
        } else {
          showNotification("Wrong Password Entered");
        }
      } catch {
        showNotification("Can't Find Employee");
      }
    };
    readLogin(empcode);
  }

  return (
    <>
      <div className="Main_div">
        <p className="Heading">
          <img src={TTM_img} alt="" width="50px" height="50px" />
          Team Task Management
        </p>

        {signedin && (
          <div className="SignUp">
            <label htmlFor="">Enter Name</label>
            <input
              type="text"
              placeholder="Enter Name"
              onChange={(e) => {
                setUser(e.target.value);
              }}
            />
            <label htmlFor="">Enter Email</label>
            <input
              type="email"
              placeholder="abc@gmail.com"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <label htmlFor="">Enter Employee Code</label>
            <input
              type="text"
              placeholder="empCode"
              onChange={(e) => {
                setEmpCode(e.target.value);
              }}
            />
            <label htmlFor="">Set Password</label>
            <input
              type="text"
              placeholder="pass"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <label htmlFor=""> Select Role</label>
            <select
              name="role"
              id="role"
              value={role}
              onChange={(e) => {
                setRole(e.target.value);
                console.log(e.target.value);
              }}
            >
              <option value="admin">Admin</option>
              <option value="employee">Employee</option>
              <option value="team">Team</option>
            </select>

            <button type="submit" onClick={signUpSubmit}>
              Submit
            </button>
            <p
              onClick={() => {
                setSignedin(false);
              }}
            >
              {" "}
              <span>Already have an account? </span>Log in
            </p>
          </div>
        )}

        {!user && !loggedin && !signedin && (
          <div className="Login">
            <input
              type="text"
              placeholder="empcode"
              onChange={(e) => {
                setEmpCode(e.target.value);
              }}
            />
            <input
              type="password"
              placeholder="password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <button onClick={logInSubmit}>Login</button>
            <p
              onClick={() => {
                setSignedin(true);
              }}
            >
              {" "}
              <span>New User?</span> Register now
            </p>
          </div>
        )}
      </div>
    </>
  );
};

export default Login;
