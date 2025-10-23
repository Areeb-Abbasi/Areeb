import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

const USERS_KEY = "fp_users";
const CURRENT_KEY = "fp_current";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // prevents flicker
  const navigate = useNavigate();

  // ✅ Restore login state on refresh
  useEffect(() => {
    const currentEmail = localStorage.getItem(CURRENT_KEY);
    if (currentEmail) {
      const users = JSON.parse(localStorage.getItem(USERS_KEY) || "[]");
      const foundUser = users.find((x) => x.email === currentEmail);
      if (foundUser) {
        setUser(foundUser);
      }
    }
    setLoading(false);
  }, []);

  // ✅ Register user
  function registerUser(newUser) {
    const users = JSON.parse(localStorage.getItem(USERS_KEY) || "[]");
    if (users.some((u) => u.email === newUser.email)) {
      return { ok: false, message: "Email already registered." };
    }
    users.push(newUser);
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
    return { ok: true };
  }

  // ✅ Validate credentials only (for OTP step)
  function loginUser(email, password) {
    const users = JSON.parse(localStorage.getItem(USERS_KEY) || "[]");
    const foundUser = users.find(
      (x) => x.email === email && x.password === password
    );
    if (!foundUser) {
      return { ok: false, message: "Invalid credentials." };
    }
    return { ok: true, user: foundUser };
  }

  // ✅ Called after OTP verification success
  function completeLoginAfterOtp(email) {
    const users = JSON.parse(localStorage.getItem(USERS_KEY) || "[]");
    const foundUser = users.find((x) => x.email === email);
    if (foundUser) {
      localStorage.setItem(CURRENT_KEY, foundUser.email);
      setUser(foundUser);
    }
  }

  // ✅ Logout user
  function logout() {
    localStorage.removeItem(CURRENT_KEY);
    setUser(null);
    navigate("/login");
  }

  // ✅ Helper
  function isLoggedIn() {
    return !!user;
  }

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
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
