import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

const USERS_KEY = "fp_users";
const CURRENT_KEY = "fp_current";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // ✅ Fix: Correctly restore session before any redirect or component mounts
  useEffect(() => {
    const restoreSession = () => {
      try {
        const currentEmail = localStorage.getItem(CURRENT_KEY);
        if (!currentEmail) {
          setLoading(false);
          return;
        }

        const users = JSON.parse(localStorage.getItem(USERS_KEY) || "[]");
        const foundUser = users.find((u) => u.email === currentEmail);

        if (foundUser) {
          console.log("✅ Session restored:", foundUser.email);
          setUser(foundUser);
        } else {
          console.warn("⚠️ Stored user not found. Clearing session.");
          localStorage.removeItem(CURRENT_KEY);
        }
      } catch (error) {
        console.error("Error restoring session:", error);
        localStorage.removeItem(CURRENT_KEY);
      } finally {
        // ✅ Delay ensures state updates before routes render
        setTimeout(() => setLoading(false), 150);
      }
    };

    restoreSession();
  }, []);

  // ✅ When user state changes, persist it to localStorage
  useEffect(() => {
    if (user?.email) {
      localStorage.setItem(CURRENT_KEY, user.email);
    }
  }, [user]);

  const updateUser = (updatedUserData) => {
    try {
      const users = JSON.parse(localStorage.getItem(USERS_KEY) || "[]");
      const updatedUsers = users.map((u) =>
        u.email === updatedUserData.email ? updatedUserData : u
      );
      localStorage.setItem(USERS_KEY, JSON.stringify(updatedUsers));
      setUser(updatedUserData);
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  const registerUser = (newUser) => {
    const users = JSON.parse(localStorage.getItem(USERS_KEY) || "[]");
    if (users.some((u) => u.email === newUser.email)) {
      return { ok: false, message: "Email already registered." };
    }
    users.push(newUser);
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
    return { ok: true };
  };

  const loginUser = (email, password) => {
    const users = JSON.parse(localStorage.getItem(USERS_KEY) || "[]");
    const foundUser = users.find(
      (x) => x.email === email && x.password === password
    );
    if (!foundUser) {
      return { ok: false, message: "Invalid credentials." };
    }
    localStorage.setItem(CURRENT_KEY, foundUser.email);
    setUser(foundUser);
    return { ok: true, user: foundUser };
  };

  const completeLoginAfterOtp = (email) => {
    const users = JSON.parse(localStorage.getItem(USERS_KEY) || "[]");
    const foundUser = users.find((x) => x.email === email);
    if (foundUser) {
      localStorage.setItem(CURRENT_KEY, foundUser.email);
      setUser(foundUser);
    }
  };

  const logout = () => {
    localStorage.removeItem(CURRENT_KEY);
    setUser(null);
    navigate("/login", { replace: true });
  };

  const isLoggedIn = () => !!user;

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        registerUser,
        loginUser,
        completeLoginAfterOtp,
        logout,
        isLoggedIn,
        updateUser,
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
