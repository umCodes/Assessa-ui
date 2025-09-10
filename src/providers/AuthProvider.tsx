import { useEffect, useState, type ReactNode } from "react"
import { AuthContext } from "../context/AuthContext";
import type { User } from "../types/User";
import { getUser, logout } from "../services/auth";

const AuthProvider = ({children}: {children: ReactNode}) => {

    const [user, setUser] = useState<User | null>(null);
    
    let retries = 0;
    async function logUser(){
            try {
                const response = await getUser();
                console.log(response)
                setUser(response);
            } catch (error) {
                console.error(error);
                const delay = Math.pow(2, retries) * 2000;
                retries++;
                setTimeout(getUser, delay);                
            }    
    }
    async function logOutUser(){
            try {
                const response = await logout();
                console.log("logged out", response)
                setUser(null);
            } catch (error) {
                console.error(error);
                const delay = Math.pow(2, retries) * 2000;
                retries++;
                setTimeout(getUser, delay);                
            }    
    }

    useEffect(()=>{
        logUser();
    }, []);
    return (
    <AuthContext.Provider value={{user, setUser, logUser, logOutUser}}>
        {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider