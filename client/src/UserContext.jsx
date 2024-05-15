/* eslint-disable react/prop-types */
import { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const UserContext = createContext();

export const useUser = () => {
  return useContext(UserContext);
};

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    checkLoggedIn();
  }, []);

  const checkLoggedIn = async () => {
    try {
      const response = await axios.get("http://localhost:4000/user/auth", {
        withCredentials: true,
      });
      setUser(response.data.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    try {
      const response = await axios.post(
        "http://localhost:4000/user/login",
        { email, password },
        { withCredentials: true }
      );
      setUser(response.data.data);
      navigate("/");
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  const signup = async (email, name, password) => {
    try {
      const response = await axios.post("http://localhost:4000/user/signup", {
        email,
        name,
        password,
      });
      alert(response.data.message);
      navigate("/login");
    } catch (error) {
      console.error("Error signing up:", error);
      alert(
        error.response.status === 400
          ? error.response.data?.message
          : "Internal Server Error"
      );
    }
  };

  const logout = async () => {
    try {
      await axios.get("http://localhost:4000/user/logout");
      setUser(null);
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <UserContext.Provider value={{ user, loading, login, signup, logout }}>
      {children}
    </UserContext.Provider>
  );
};
