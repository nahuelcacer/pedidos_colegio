import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import loginFetch from "../service/user";



const AuthContext = createContext()
export default AuthContext

export const AuthProvider = ({ children }) => {
    const [authTokens, setAuthTokens] = useState(
        () => localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null
    )
    const [user, setUser] = useState(
        () => localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null
    )
    const [isAuthenticated, setIsAuthenticated] = useState(
        () => localStorage.getItem('authTokens') ? true : false
    )
    let navigate = useNavigate()

    let loginUser = async (e) => {
        e.preventDefault();

        try {
            const response = await loginFetch(e.target.username.value, e.target.password.value);
            const data = response.token
            setAuthTokens(data);
            setUser(data);
            localStorage.setItem('authTokens', JSON.stringify(data));
            setIsAuthenticated(true);
            // navigate('/')

        } catch (error) {
            console.error('Error durante el login:', error);
            // Maneja el error de la solicitud (por ejemplo, problemas de red)
        }
    };

    let logoutUser = () => {
        setAuthTokens(null)
        setUser(null)
        localStorage.removeItem('authTokens')
        setIsAuthenticated(false)
        console.log('navigateto')
        // navigate('/')

    }
    let contextData = {
        user: user,
        isAuthenticated: isAuthenticated,
        loginUser: loginUser,
        logoutUser: logoutUser,


    }
    return (

            <AuthContext.Provider value={contextData}>

                {children}
            </AuthContext.Provider>
    )
}  