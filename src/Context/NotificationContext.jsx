import React, { createContext, useContext, useState } from "react";
import './NotificationContext.css'
const NotificationContext = createContext();

export const useNotification = () => useContext(NotificationContext);

export const NotificationProvider = ({ children }) => {
  const [message, setMessage] = useState("");
  const [visible, setVisible] = useState(false);

  const showNotification = (msg) => {
    setMessage(msg);
    setVisible(true);
    setTimeout(() => {
      setVisible(false);
    }, 2000);
  };

  return (
    <NotificationContext.Provider value={{ showNotification }}>
      {children}
      <div className={`Notifier ${visible ? "show" : ""}`}>
        {message}
      </div>
    </NotificationContext.Provider>
  );
};
