import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";



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
        e.preventDefault()
        console.log('Form ')
        let response = await fetch("http://127.0.0.1:8000/login/", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 'username': e.target.username.value, 'password': e.target.password.value })
        })
        let data = await response.json();
        console.log(data)
        // console.log({ "data": jwt_decode(data.access)})
        console.log(response)
        if (response.status === 200) {
            setAuthTokens(data)
            setUser(data)
            localStorage.setItem('authTokens', JSON.stringify(data))
            setIsAuthenticated(true)
            navigate('/')
        }


    }
    let logoutUser = () => {
        setAuthTokens(null)
        setUser(null)
        localStorage.removeItem('authTokens')
        setIsAuthenticated(false)
        navigate('/')

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