import React, { createContext, useState, useEffect, useContext } from "react";
import api from "../api";

const AuthContext = createContext(); // createContext dùng để tạo ra một context mới

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const response = await api.get("/auth/me");
          if (response.data.success) {
            setUser(response.data.data.user);
          } else {
            localStorage.removeItem("token");
          }
        } catch (error) {
          console.error("Failed to fetch user:", error);
          // If it's a database error (like missing column), don't remove token
          // Let the user stay logged in
          if (error.response?.status !== 500) {
            localStorage.removeItem("token");
          }
        }
      }
      setLoading(false);
    };

    fetchUser();
  }, []);

  const login = async (email, password) => {
    try {
      const response = await api.post("/auth/login", { email, password });

      // Backend returns structure: { success: true, data: { user, token }, message: ... }
      if (response.data.success) {
        const { token, user } = response.data.data;

        localStorage.setItem("token", token);

        if (!user) {
          const userResponse = await api.get("/auth/me");
          setUser(userResponse.data.data.user);
        } else {
          setUser(user);
        }
        return true;
      } else {
        throw new Error(response.data.message || "Login failed");
      }
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    }
  };

  const register = async (name, email, password, password_confirmation, birthdate, gender, address) => {
    try {
      const response = await api.post("/auth/register", {
        name,
        email,
        password,
        password_confirmation,
        birthdate,
        gender,
        address
      });

      // Backend returns structure: { success: true, data: { user, token }, message: ... }
      if (response.data.success && response.data.data && response.data.data.token) {
        localStorage.setItem("token", response.data.data.token);
        setUser(response.data.data.user);
      }

      return response.data;
    } catch (error) {
      console.error("Registration failed:", error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await api.post("/auth/logout");
    } catch (error) {
      console.error(
        "Logout API failed (token might be invalid already)",
        error
      );
    } finally {
      localStorage.removeItem("token");
      setUser(null);
    }
  };

  const refreshUser = async () => {
    try {
      const response = await api.get("/auth/me");
      if (response.data.success) {
        setUser(response.data.data.user);
      }
    } catch (error) {
      console.error("Failed to refresh user:", error);
      // Don't throw error, just log it to prevent UI breaks
      if (error.response?.data?.message) {
        console.error("Backend error:", error.response.data.message);
      }
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading, refreshUser }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
