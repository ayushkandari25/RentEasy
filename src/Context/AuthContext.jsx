import { createContext, useState } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = async (email, password) => {
    try {
      const response = await axios.get(
        "https://rent-easy-18566-default-rtdb.firebaseio.com/users.json"
      );
      if (response.data) {
        const users = Object.values(response.data);
        const foundUser = users.find(
          (user) => user.email === email && user.password === password
        );
        if (foundUser) {
          setUser(foundUser);
          return foundUser.role;
        } else {
          console.log("Invalid Credentials");
        }
      }
    } catch (error) {
      console.log("Login failed. Please try again.");
    }
  };

  const logout =()=> setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
