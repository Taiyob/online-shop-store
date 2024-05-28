import { useSignInWithGoogle } from 'react-firebase-hooks/auth';
import auth from '../../firebase/firebase.config';

const GoogleLogin = () => {
    const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);

    const handleGoogleLogin = () => {
        signInWithGoogle();
        console.log(user, loading, error);
    }

    return (
        <div>
            <button onClick={handleGoogleLogin} className="btn btn-outline rounded-lg w-full">Google Login</button>
        </div>
    );
};

export default GoogleLogin;