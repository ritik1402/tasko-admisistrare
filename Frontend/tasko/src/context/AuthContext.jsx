import { createContext,useState,useEffect,useContext } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({children})=>{
    const [user,setUser] = useState(null);
    const [loading,setLoading] = useState(true);

    useEffect(()=>{
        const storedUser = localStorage.getItem('user');
        const token = localStorage.getItem('token');
        if(storedUser && token){
            setUser(JSON.parse(storedUser));
        }
        setLoading(false);
    },[]);

    const login = (user,token) => {
        localStorage.setItem("user",JSON.stringify(user));
        localStorage.setItem("token",token);
        setUser(user);
    }
    const logout = ()=>{
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        setUser(null);
    }
    return (
        <AuthContext.Provider value= {{user,login,logout,loading}}>
            
            {children}
        </AuthContext.Provider>

    );
};

export const useAuth = ()=> useContext(AuthContext);