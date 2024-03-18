import React from "react";
import "../OAuth/Oauth.css";
import "@fortawesome/fontawesome-free/css/all.css";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { app } from "../../firebase/firebase";
import BASE_URL from "../../Routes/config";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../../redux/user/userSlice";
import { useNavigate } from "react-router-dom";

const Oauth = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleGoogleAuth = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);
      const result = await signInWithPopup(auth, provider);
      const response = await fetch(`${BASE_URL}/auth/google`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: result.user.displayName,
          email: result.user.email,
          photo: result.user.photoURL,
        }),
      });
      const data = await response.json();
      dispatch(loginSuccess(data));
      navigate("/home");
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
