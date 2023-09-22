import React, { useState, createContext, useContext, useEffect } from "react"
import { NavigateFunction } from "react-router-dom";


const AuthContext = createContext("");

//Validates the token and the role of it to pass the value to the context provider 
const AuthProvider = ({ children }: {children: React.JSX.Element}) => {
    
    const [user, setUser] = useState("");
    const authToken = localStorage.getItem("authToken");

    useEffect(() => {
        
        if (authToken && authToken.split(".").length === 3) {
          try {
            
            const decodedToken = JSON.parse(atob(authToken.split(".")[1]));
            const userRole: string = decodedToken.roles;
            console.log("user: " + userRole);
            const exp = decodedToken.exp;
            console.log("exp: " + exp)
            const currentTimestamp = Math.floor(Date.now() / 1000);
            console.log("current time stamp: " + currentTimestamp);

            if (currentTimestamp < exp && userRole !== "") {
                setUser(userRole);
            } else if(currentTimestamp > exp) {
                localStorage.setItem("authToken", "");
                console.log("Token timed out!");
            }
            else {
                console.log("???");
                setUser("");
            }
            

          } catch (error) {
            console.error("Error decoding token:", error);
          }
        } else {
          // Handle the case when authToken is not available (e.g., user is not authenticated)
          setUser("");
        }
    }, [authToken]); // Run this effect whenever token changes

    return <AuthContext.Provider value={user}>
        {children}
    </AuthContext.Provider>
}

const useAuth = () => {
    return useContext(AuthContext)
}

const logOut = (navigate: NavigateFunction) => {
    localStorage.setItem("authToken", "");
    navigate("/");
}

export { AuthProvider, useAuth, logOut}
