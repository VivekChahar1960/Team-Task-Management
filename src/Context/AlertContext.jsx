import { createContext, useContext, useState } from "react";

const AlertContext = createContext()
export const useAlertContext = () => useContext(AlertContext);

export const AlertProvider = ({children}) =>{
    const showAlert = (message) =>{
        alert(message);
    }
    return(
        <AlertContext.Provider value={{showAlert}}>
        {children}
        </AlertContext.Provider>
    )
}