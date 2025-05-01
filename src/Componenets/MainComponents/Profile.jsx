import React from 'react'
import profile_img from "../../assets/profile.png";

const Profile = ({user,empcode,role}) => {
  return (
    <div>
      <div className="profile_view">
              <img
                src={profile_img}
                alt="prifle image"
                width="100px"
                height="100px"
              />
              <p>Username : - {user}</p>
              <p>Employee Code : - {empcode}</p>
              <p>Role : - {role}</p>
            </div>
    </div>
  )
}

export default Profile
