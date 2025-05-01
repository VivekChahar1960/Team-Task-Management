import React, { useState } from "react";
import "./Admindash.css";
import profile_img from "../../assets/profile.png";
import TTM_icon from "../../assets/TTM_icon.png";
import { getDatabase, ref, get } from "firebase/database";
import { useNotification } from "../../Context/NotificationContext";
import Profile from "../MainComponents/Profile";
import Employees from "../MainComponents/Employees";
import Tasks from "../MainComponents/Tasks";
import Dashboard from "../MainComponents/Dashboard";
import CreateTasks from "../MainComponents/CreateTasks";
import Search from "../MainComponents/Search";
import MyTasks from "../MainComponents/MyTasks";

const Admindash = ({ logout }) => {
  const user = window.localStorage.getItem("user");
  const userFirst = user.split(" ").at(0);
  const role = window.localStorage.getItem("role");
  const empcode = window.localStorage.getItem("empcode");
  const [searchText , setSearchText] = useState("");
  const [activeTab, setActiveTab] = useState("dashboard");
  const [tasks, setTasks] = useState([]);
  const [employees, setemployees] = useState([]);
  const [loading, setLoading] = useState(false);

  const db = getDatabase();
  const { showNotification } = useNotification();

  async function fetchEmployees() {
    setLoading(true);
    try {
      const fetchPromise = get(ref(db, "users"));
      const minWait = new Promise((resolve) => setTimeout(resolve, 1000));
      const [snapshot] = await Promise.all([fetchPromise, minWait]);

      const data = snapshot.val();
      if (data) {
        const emplarray = Object.entries(data).map(([key, value]) => ({
          id: key,
          ...value,
        }));
        setemployees(emplarray);
      } else {
        setemployees([]);
      }
    } catch (error) {
      showNotification(`Error fetching tasks: ${error}`);
    } finally {
      setLoading(false);
    }
  }
  async function fetchTasks() {
    setLoading(true);
    try {
      const fetchPromise = get(ref(db, "tasks"));
      const minWait = new Promise((resolve) => setTimeout(resolve, 1000));

      const [snapshot] = await Promise.all([fetchPromise, minWait]);

      const data = snapshot.val();
      if (data) {
        const taskArray = Object.entries(data).map(([key, value]) => ({
          id: key,
          ...value,
        }));
        setTasks(taskArray);
      } else {
        setTasks([]);
      }
    } catch (error) {
      showNotification(`Error fetching tasks: ${error}`);
    } finally {
      setLoading(false);
    }
  }

  const handleTabClick = (tabName) => {
    if (activeTab === tabName) {
      setActiveTab("dashboard");
    } else {
      setActiveTab(tabName);
    }
  };

  return (
    <div className="admin_dash">
      <div className="sidebar">
        <div className="sidebar_options">
          <div className="portal_name">
            <p className="Heading_Sidebar">
              <img src={TTM_icon} alt="" width="50px" height="50px" />
              TEAM TASK MANAGEMENT
            </p>
          </div>
          <p
            className={
              activeTab === "dashboard"
                ? "sidebar_option active"
                : "sidebar_option"
            }
            onClick={() => handleTabClick("dashboard")}
          >
            Dashboard
          </p>
          <p
            className={
              activeTab === "myTasks"
                ? "sidebar_option active"
                : "sidebar_option"
            }
            onClick={() => handleTabClick("myTasks")}
          >
            My Tasks
          </p>
          <p
            className={
              activeTab === "tasksTab"
                ? "sidebar_option active"
                : "sidebar_option"
            }
            onClick={() => {
              fetchTasks();
              handleTabClick("tasksTab");
            }}
          >
            Tasks
          </p>
          <p
            className={
              activeTab === "createTasks"
                ? "sidebar_option active"
                : "sidebar_option"
            }
            onClick={() => handleTabClick("createTasks")}
          >
            Create Task
          </p>
          <p
            className={
              activeTab === "employeetab"
                ? "sidebar_option active"
                : "sidebar_option"
            }
            onClick={() => {
              fetchEmployees();
              handleTabClick("employeetab");
            }}
          >
            Employees
          </p>
        </div>
        <div
          className={activeTab === "profile" ? "sidebar_profile active" : "sidebar_profile"}
          onClick={() => {
            handleTabClick("profile");
          }}
        >
          <img src={profile_img} alt="" />
          Profile
        </div>
      </div>
      <div className="main_dash">
        <div className="header">
          <div className="search_bar">
          <input type="text" value={searchText} placeholder="Enter empCode or taskId" onChange={(e)=>{
            setSearchText(e.target.value);
          }}/>
          <button type="submit" onClick={()=>{
            handleTabClick("search_bar")
            // setSearchText("");
          }}>Search</button>
          </div>
          <div className="left_header">
            <div
              className="profile"
              onClick={() => {
                handleTabClick("profile");
              }}
            >
              <img src={profile_img} alt="" />
              <p>{userFirst}</p>
            </div>
            <button className="logOut_Btn" onClick={logout}>logout</button>
          </div>
        </div>
        <div className="main_content">
          {activeTab === "dashboard" && (
            <Dashboard />
          )}

          {activeTab === "profile" && (
            <Profile user={user} empcode={empcode} role={role} />
          )}

          {activeTab === "createTasks" && (
            <CreateTasks />
          )}

          {activeTab === "myTasks" && (
            <MyTasks/>
          )}

          {activeTab === "tasksTab" && (
            <Tasks loading={loading} tasks={tasks} />
          )}

          {activeTab === "employeetab" && (
            <Employees loading={loading} employees={employees} />
          )}

          {activeTab === "search_bar" && (
            <Search searchText={searchText}/>
          )}
        </div>
      </div>
    </div>
  );
};

export default Admindash;
