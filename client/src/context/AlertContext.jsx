import { createContext, useContext, useState } from "react";

const AlertContext = createContext();

export const AlertProvider = ({children})=>{
    const [success, setSuccess] = useState(null);
    const [error, setError] = useState(null);
    const [refresh, setRefresh] = useState(1);

    return(
        <AlertContext.Provider value={{success, setSuccess, error, setError, refresh, setRefresh}}>
            {children}
        </AlertContext.Provider>
    )
}

export const useAlertContext = ()=>{
    return useContext(AlertContext);
}