import { createContext, useContext, useState } from "react";
import { fetchUsersByEmail } from "../services/userServices";

const UserContext = createContext();

export const UserProvider = ({children})=>{

    const [users, setUsers] = useState([]);

    const searchUsers = async (email)=>{
        try{
            let response = await fetchUsersByEmail(email);
            if(response.data.success){
                setUsers(response.data.users);
            }
        }catch(err){
            console.error(`Error searching users: ${err.message}`);
        }
    }

    return (
        <UserContext.Provider value={{users, searchUsers}}>
            {children}
        </UserContext.Provider>
    )
}

export const useUserContext = () => useContext(UserContext);