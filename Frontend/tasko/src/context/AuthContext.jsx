import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();



export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const storedUser = localStorage.getItem("user");
      return storedUser && storedUser !== "undefined" ? JSON.parse(storedUser) : null;
    } catch (err) {
      console.error("Failed to parse user from localStorage:", err);
      return null;
    }
  });

  


  const login = (userData) => {
  if (!userData || !userData.token) {
    console.error("Invalid userData passed to login:", userData);
    return;
  }

  setUser(userData);
  localStorage.setItem("user", JSON.stringify(userData));
  localStorage.setItem("token", userData.token);
};


  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    toast.success("Logout successfully");
    
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
