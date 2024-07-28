import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
<<<<<<< HEAD
    const savedAuthState = localStorage.getItem("isAuthenticated");
=======
    const savedAuthState = localStorage.getItem("isAuthenticatedd");
>>>>>>> bef1795 (the final braincell)
    const savedUser = localStorage.getItem("user");
    if (savedAuthState) {
      setIsAuthenticated(JSON.parse(savedAuthState));
      setUser(JSON.parse(savedUser));
    }
  }, []);

<<<<<<< HEAD
  const signIn = async (identifier, password) => {
    const user = await checkCredentials(identifier, password);
=======
  const signIn = async (username, password) => {
    const user = await checkCredentials(username, password);
>>>>>>> bef1795 (the final braincell)

    if (user) {
      setIsAuthenticated(true);
      setUser(user);
<<<<<<< HEAD
      localStorage.setItem("isAuthenticated", JSON.stringify(true));
=======
      localStorage.setItem("isAuthenticatedd", true);
>>>>>>> bef1795 (the final braincell)
      localStorage.setItem("user", JSON.stringify(user));
      return true;
    } else {
      return false;
    }
  };

<<<<<<< HEAD
  const signUp = async (newUser) => {
    const added = await addNewUser(newUser);
    if (added) {
      setIsAuthenticated(true);
      localStorage.setItem("isAuthenticated", JSON.stringify(true));
      localStorage.setItem("user", JSON.stringify(newUser));
      setUser(newUser);
      return true;
=======
  const signUp = async (username, password) => {
    const isValid = true; // This should ideally be based on some logic
    if (isValid) {
      const added = await addNewUser(username, password);
      console.log("User added:", added); // Log to confirm user was added
      setIsAuthenticated(added);
      if (added) {
        console.log("Setting localStorage");
        localStorage.setItem("isAuthenticatedd", true);
        localStorage.setItem("user", JSON.stringify({ username, password })); // Store new user
        setUser({ username, password });
      }
      return added;
>>>>>>> bef1795 (the final braincell)
    } else {
      return false;
    }
  };

  const signOut = () => {
    setIsAuthenticated(false);
    setUser(null);
<<<<<<< HEAD
    localStorage.removeItem("isAuthenticated");
=======
    localStorage.removeItem("isAuthenticatedd");
>>>>>>> bef1795 (the final braincell)
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
<<<<<<< HEAD
      "https://ideahubfunctionapp.azurewebsites.net/api/verifyUser",
=======
      "https://ignitemetricapi.azurewebsites.net/api/getNames?"
    );
    const result = await response.json();

    const user = result.find(
      (user) => user.username.toLowerCase() === username.toLowerCase()
    );

    if (user) {
      return password === user.password ? user : null; // Return user if password matches
    } else {
      return null; // Username not found
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    return null; // Handle fetch error
  }
};

const addNewUser = async (username, password) => {
  try {
    console.log("Adding new user");
    const response = await fetch(
      "https://ignitemetricapi.azurewebsites.net/api/addUser",
>>>>>>> bef1795 (the final braincell)
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
