import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Auth0Provider } from "@auth0/auth0-react";
import { AuthProvider } from "./Components/Login/AuthContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <Auth0Provider
        domain="dev-inrnnc718gwzbtxp.us.auth0.com"
        clientId="5du5TN8OqC2lKeuqPkAqch6TDwXDgIxI"
        authorizationParams={{ redirect_uri: window.location.origin }}
      >
        {" "}
        {/* Wrap AuthProvider around your App */}
        <App />
      </Auth0Provider>
    </AuthProvider>
  </React.StrictMode>
);
