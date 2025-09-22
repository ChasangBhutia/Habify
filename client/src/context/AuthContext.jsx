import { createContext, useContext, useState, useEffect } from "react";
import { createUser, getUser, loginUser } from "../services/authServices";
import { useAlertContext } from "./AlertContext";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const { success, setSuccess, error, setError, refresh, setRefresh } = useAlertContext();

    const navigate = useNavigate();

    const [user, setUser] = useState({});

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
                setSuccess(response.data.message);
                setTimeout(() => {
                    setSuccess(null);
                }, 3000)
                setRefresh(prev => prev + 1)
            }
        } catch (err) {
            setError(err.message);
            setTimeout(() => {
                setError(null);
            }, 3000)
            console.log(err.message);
        }
    }

    const login = async (userData) => {
        try {
            let response = await loginUser(userData);
            if (response.data.success) {
                setSuccess(response.data.message);
                setTimeout(() => {
                    setSuccess(null);
                }, 3000)
                setRefresh(prev => prev + 1)
                navigate('/habit-tracker')
            }
        } catch (err) {
            setError(err?.response?.data?.error || "Something went wrong");
            setTimeout(() => {
                setError(null);
            }, 3000)
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