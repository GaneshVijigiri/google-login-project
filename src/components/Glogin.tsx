// Glogin.tsx
import React, { useState } from "react";
import { GoogleLogin, CredentialResponse } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";

interface GloginProps {
  onUserLogin: (userObject: any) => void;
  onUserLogout: () => void;
}

const Glogin: React.FC<GloginProps> = ({ onUserLogin, onUserLogout }) => {
  const [userObject, setUserObject] = useState<any>(null);
  const [loggedIn, setLoggedIn] = useState(false);

  const handleSuccess = (credentialResponse: CredentialResponse) => {
    const { credential } = credentialResponse;

    if (credential) {
      const user = jwtDecode(credential);
      console.log("Credential:", credential);
      setUserObject(user);
      console.log(userObject);
      onUserLogin(user);
      setLoggedIn(true);
    } else {
      console.log("Credential is undefined");
    }
  };

  const handleError = () => {
    console.log("Login Failed");
  };

  const handleLogout = () => {
    setUserObject(null);
    setLoggedIn(false);
    
    onUserLogout(); 
  };

  return (
    <>
      <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
        {loggedIn ? (
          <button onClick={handleLogout}>Logout</button>
        ) : (
          <GoogleLogin
            text="continue_with"
            onSuccess={handleSuccess}
            onError={handleError}
            shape="rectangular"
          />
        )}
      </div>
    </>
  );
};

export default Glogin;
