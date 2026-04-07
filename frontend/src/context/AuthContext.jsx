import { createContext, useState } from "react";

export const AuthContext = createContext();// creates the global container

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => {
    return localStorage.getItem("token") || null;
  });

  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    

    if (!storedUser || storedUser === "undefined") {
      return null;
    }

    try 
    {
      return JSON.parse(storedUser);
    } 
    catch (error) {
      console.error("Invalid user in localStorage. Clearing it.");
      localStorage.removeItem("user");
      return null;
    }
  });

  const login = (data) => {
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));

    setToken(data.token);
    setUser(data.user);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ token, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
