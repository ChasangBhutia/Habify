import { createContext, useContext, useState } from "react";
import { fetchUsersByEmail } from "../services/userServices";
import { useAlertContext } from "./AlertContext";

const UserContext = createContext();

export const UserProvider = ({ children }) => {

    const { success, setSuccess, error, setError } = useAlertContext();

    const [users, setUsers] = useState([]);

    const searchUsers = async (email) => {
        try {
            let response = await fetchUsersByEmail(email);
            if (response.data.success) {
                setUsers(response.data.users);
                setSuccess(response.data.message);
                setTimeout(() => {
                    setSuccess(null);
                }, 3000)
            }
        } catch (err) {
            setError(err.message);
            setTimeout(() => {
                setError(null);
            }, 3000)
            console.error(`Error searching users: ${err.message}`);
        }
    }

    return (
        <UserContext.Provider value={{ users, searchUsers }}>
            {children}
        </UserContext.Provider>
    )
}

export const useUserContext = () => useContext(UserContext);