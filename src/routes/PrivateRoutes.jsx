/* eslint-disable react/prop-types */
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../firebase/firebase.config';
import { Navigate } from 'react-router-dom';

const PrivateRoutes = ({ children }) => {
    const [user, loading] = useAuthState(auth);

    if (loading) {
        return <div className='fixed top-0 left-0 w-full h-full flex justify-center items-center'><span className="loading loading-spinner loading-lg"></span></div>
    }

    if (!user) {
        return <Navigate to={`/sign-in`}></Navigate>
    }

    return children;
};

export default PrivateRoutes;