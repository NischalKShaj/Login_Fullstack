import React from "react";
import "../OAuth/Oauth.css";
import "@fortawesome/fontawesome-free/css/all.css";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { app } from "../../firebase/firebase";
import BASE_URL from "../../Routes/config";
import axios from "axios";

const Oauth = () => {
  const handleGoogleAuth = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);
      const result = await signInWithPopup(auth, provider);
      const response = await axios.post(`${BASE_URL}/auth/google`);
    } catch (error) {
      console.log("could not login with google", error);
    }
  };
  return (
    <div className="container">
      <button
        type="button"
        onClick={handleGoogleAuth}
        className="google_submit"
      >
        <i className="fab fa-google" />
        Continue with Google
      </button>
    </div>
  );
};

export default Oauth;
