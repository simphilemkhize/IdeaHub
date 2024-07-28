import * as React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useAuth } from "../../../Components/Login/AuthContext";
import { useNavigate } from "react-router-dom";
import SignupForm from "../../../Components/CreateProfile/SignupForm";
function SignupPage() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="flex w-full h-full bg-blue-900">
      <div className="w-full flex items-center justify-center">
        <SignupForm></SignupForm>
      </div>
    </div>
  );
}

export default SignupPage;
