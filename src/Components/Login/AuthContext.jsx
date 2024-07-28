import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedAuthState = localStorage.getItem("isAuthenticated");
    const savedUser = localStorage.getItem("user");
    if (savedAuthState) {
      setIsAuthenticated(JSON.parse(savedAuthState));
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const signIn = async (identifier, password) => {
    const user = await checkCredentials(identifier, password);

    if (user) {
      setIsAuthenticated(true);
      setUser(user);
      localStorage.setItem("isAuthenticated", JSON.stringify(true));
      localStorage.setItem("user", JSON.stringify(user));
      return true;
    } else {
      return false;
    }
  };

  const signUp = async (newUser) => {
    const added = await addNewUser(newUser);
    if (added) {
      setIsAuthenticated(true);
      localStorage.setItem("isAuthenticated", JSON.stringify(true));
      localStorage.setItem("user", JSON.stringify(newUser));
      setUser(newUser);
      return true;
    } else {
      return false;
    }
  };

  const signOut = () => {
    setIsAuthenticated(false);
    setUser(null);
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, user, signIn, signOut, signUp }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

const checkCredentials = async (identifier, password) => {
  const isEmail = identifier.includes("@");
  const loginPayload = isEmail ? { email: identifier, password } : { username: identifier, password };

  try {
    const response = await fetch(
      "https://ideahubfunctionapp.azurewebsites.net/api/verifyUser",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginPayload),
      }
    );
    const result = await response.json();

    if (response.status === 200 && result.valid) {
      return {
        email: result.email,
        user_type: result.user_type,
        profile: result.profile
      }; // Return user details if credentials are valid
    } else {
      return null; // Invalid credentials
    }
  } catch (error) {
    console.error("Error verifying user:", error);
    return null; // Handle fetch error
  }
};

const addNewUser = async (newUser) => {
  try {
    const response = await fetch(
      "https://ideahubfunctionapp.azurewebsites.net/api/createUser",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
      }
    );

    console.log(newUser);

    if (response.status === 201) {
      return true;
    } else {
      console.error("Failed to add user. Status:", response.status);
      return false;
    }
  } catch (error) {
    console.error("Error adding user:", error);
    return false;
  }
};
