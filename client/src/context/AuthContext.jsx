import { createContext, useContext, useState, useEffect } from "react";
import { createUser, getUser, loginUser } from "../services/authServices";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState({});
    const [refresh, setRefresh] = useState(1);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                let response = await getUser();
                if (response.data.success) {
                    setUser(response.data.user);
                }
            } catch (err) {
                console.log(err.message);
            }
        }
        fetchUser();
    }, [refresh])

    const registerUser = async (userData) => {
        try {
            let response = await createUser(userData);
            if (response.data.success) {
                alert(response.data.message);
                setRefresh(prev => { return (prev + 1) })
            }
        } catch (err) {
            console.log(err.message);
        }
    }

    const login = async (userData) => {
        try {
            let response = await loginUser(userData);
            if (response.data.success) {
                alert(response.data.message);
                setRefresh(prev => { prev + 1 })
            }
        } catch (err) {
            console.log(err.message);
        }
    }

    return (
        <AuthContext.Provider value={{ user, registerUser, login }}>
            {children}
        </AuthContext.Provider>
    )

};

export const useAuthContext = () => {
    return useContext(AuthContext);
}