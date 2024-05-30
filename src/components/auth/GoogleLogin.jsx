import { useSignInWithGoogle } from 'react-firebase-hooks/auth';
import auth from '../../firebase/firebase.config';
import { useState } from 'react';

const GoogleLogin = () => {
    const [err, setErr] = useState();
    const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);

    const handleGoogleLogin = () => {
        signInWithGoogle();
        if(!loading){
            console.log(user);
        }else{
            setErr(error?.message);
            console.log(err);
        }
    }

    return (
        <div>
            <button onClick={handleGoogleLogin} className="btn btn-outline rounded-lg w-full">Google Login</button>
        </div>
    );
};

export default GoogleLogin;