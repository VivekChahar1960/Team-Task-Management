import React, { useState } from "react";
import profile_img from "../../assets/profile.png";
import TTM_icon from '../../assets/TTM_icon.png'
const Employeedash = ({logout}) => {
  const user = window.localStorage.getItem("user");
  const userFirst = user.split(" ").at(0);
  const role = window.localStorage.getItem("role");
  const empcode = window.localStorage.getItem("empcode");
  const [profile , setProfile] = useState(false);
  const handleProfileClick = () =>{
    if(profile){
      setProfile(false);
    }else{
      setProfile(true);
    }
  }
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
          <p>Dashboard</p>
          <p>My Tasks</p>
        </div>
        <div className="sidebar_profile" onClick={handleProfileClick}>
        <img src={profile_img} alt="" />Profile
        </div>

      </div>
      <div className="main_dash">
        <div className="header">
          <input type="text" placeholder="search" />
          <div className="left_header" >
            <div className="profile" onClick={handleProfileClick}>
            <img src={profile_img} alt="" />
            <p>{userFirst}</p>
            </div>
            <button onClick={logout}>logout</button>
          </div>
        </div>
        <div className="main_content">
          {profile && (
            <div className="profile_view">
              <img src={profile_img} alt="prifle image" width="100px" height="100px"/>
              <p>Username : -  {user}</p>
              <p>Employee Code : -  {empcode}</p>
              <p>Role : -  {role}</p>

            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Employeedash
