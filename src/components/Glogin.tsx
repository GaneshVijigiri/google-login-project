// Glogin.tsx
import React, { useState } from "react";
import { GoogleLogin, CredentialResponse } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";

interface GloginProps {
  onUserLogin: (userObject: any) => void;
}

const Glogin: React.FC<GloginProps> = ({ onUserLogin }) => {
  const [userObject, setUserObject] = useState<any>(null);

  const handleSuccess = (credentialResponse: CredentialResponse) => {
    const { credential } = credentialResponse;

    if (credential) {
      const user = jwtDecode(credential);
      console.log("Credential:", credential);
      setUserObject(user);
      console.log(userObject);
      onUserLogin(user); // Invoke the callback function with userObject
    } else {
      console.log("Credential is undefined");
    }
  };

  const handleError = () => {
    console.log("Login Failed");
  };

  return (
    <>
      <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
        <GoogleLogin
          text="continue_with"
          onSuccess={handleSuccess}
          onError={handleError}
          shape="circle"
        />
      </div>
    </>
  );
};

export default Glogin;
