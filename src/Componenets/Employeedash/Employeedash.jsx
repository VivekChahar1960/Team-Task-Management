import React, { useState } from "react";
import profile_img from "../../assets/profile.png";
import TTM_icon from '../../assets/TTM_icon.png'
import Profile from "../MainComponents/Profile";
import Dashboard from "../MainComponents/Dashboard";
import Search from "../MainComponents/Search";
import MyTasks from "../MainComponents/MyTasks";
const Employeedash = ({logout}) => {
  const user = window.localStorage.getItem("user");
  const userFirst = user.split(" ").at(0);
  const role = window.localStorage.getItem("role");
  const empcode = window.localStorage.getItem("empcode");
  const [searchText , setSearchText] = useState("");
  const [activeTab, setActiveTab] = useState("dashboard");
  const [profile , setProfile] = useState(false);

  const handleProfileClick = () =>{
    if(profile){
      setProfile(false);
    }else{
      setProfile(true);
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
              <img src={TTM_icon} alt="" width="50px" height="50px"/>
              TEAM TASK MANAGMENT
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
        </div>
        <div className="sidebar_profile" onClick={handleProfileClick}>
        <img src={profile_img} alt="" />Profile
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
          }}>Search</button>
          </div>
          <div className="left_header" >
            <div className="profile" onClick={handleProfileClick}>
            <img src={profile_img} alt="" />
            <p>{userFirst}</p>
            </div>
            <button onClick={logout}>logout</button>
          </div>
        </div>
        <div className="main_content">
          {activeTab === "dashboard" && (
            <Dashboard />
          )}

          {activeTab === "profile" && (
            <Profile user={user} empcode={empcode} role={role} />
          )}

          {activeTab === "myTasks" && (
            <MyTasks/>
          )}

          {activeTab === "search_bar" && (
            <Search searchText={searchText}/>
          )}
        </div>
      </div>
    </div>
  );
}

export default Employeedash
