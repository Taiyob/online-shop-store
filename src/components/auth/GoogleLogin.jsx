import { useSignInWithGoogle } from "react-firebase-hooks/auth";
import auth from "../../firebase/firebase.config";
import { useState } from "react";
import axios from "axios";

const GoogleLogin = () => {
  const [err, setErr] = useState();
  const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);

  const handleGoogleLogin = () => {
    signInWithGoogle().then(async (data) => {
      if (!loading) {
        const userInfo = {
          email: data?.user?.email,
          name: data?.user?.displayName,
        };
        const insertUser = await axios.post(`http://localhost:5000/user`, userInfo);
        console.log(insertUser);
      }
    });
    if (!user) {
        setErr(error?.message);
        console.log(err);
    }
  };

  return (
    <div>
      <button
        onClick={handleGoogleLogin}
        className="w-full rounded-lg btn btn-outline"
      >
        Google Login
      </button>
    </div>
  );
};

export default GoogleLogin;
