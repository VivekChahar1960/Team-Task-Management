import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import './Unauthorized.css'; 

const UnAuthorised = () => {
  const [timeLeft, setTimeLeft] = useState(5);  
  const [timerExpired, setTimerExpired] = useState(false);
  const [redirectToLogin, setRedirectToLogin] = useState(false);
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const user = localStorage.getItem("user");
    const role = localStorage.getItem("role");

    if (!user) {
      setRedirectToLogin(true); 
    } else {
      setUserRole(role); 
    }

    if (timeLeft === 0) {
      setTimerExpired(true);
    }
    
    const timer = timeLeft > 0 && setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  if (redirectToLogin) {
    return <Navigate to="/" replace />; 
  }

  if (timerExpired) {
    if (userRole === "admin") {
      return <Navigate to="/admin" replace />;
    } else {
      return <Navigate to="/employee" replace />;
    }
  }

  return (
    <div className="unauthorized-container">
      <div className="unauthorized-content">
        <h1 className="unauthorized-title">Unauthorized Access</h1>
        <p className="unauthorized-message">
          You do not have permission to view this page. You will be redirected to your dashboard shortly...
        </p>
        <div className="timer">
          <p>Redirecting in <span>{timeLeft}</span> seconds...</p>
        </div>
      </div>
    </div>
  );
}

export default UnAuthorised;
