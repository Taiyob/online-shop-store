import { Link, useNavigate } from "react-router-dom";
import GoogleLogin from "../components/auth/GoogleLogin";
import auth from "../firebase/firebase.config";
import { useAuthState, useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { useEffect, useState } from "react";

const Signup = () => {
    const [err, setErr] = useState();
    const userInfo = useAuthState(auth);
    const [createUserWithEmailAndPassword, user, loading, error,] = useCreateUserWithEmailAndPassword(auth);
    const navigate = useNavigate();
    const from = location?.state?.from?.pathname || '/';

    const handleSignUp = (e) => {
        e.preventDefault();

        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;

        createUserWithEmailAndPassword(email, password);
    }

    useEffect(() => {
        if (userInfo[0]) {
            navigate(from, { replace: true });
        }
        if (error) {
            setErr(error?.message);
        }
    }, [from, navigate, userInfo, error])

    console.log(user, loading);

    return (
        <div>
            <div className="min-h-screen bg-base-200 flex items-center justify-center">
                <div className="flex flex-col lg:flex-row-reverse items-center justify-center gap-2">
                    <div className="text-center lg:text-left">
                        <h1 className="text-5xl font-bold">Sign Up</h1>
                    </div>
                    <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                        <form onSubmit={handleSignUp} className="card-body">
                            {err && <p className="text-red-500">{err}</p>}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input name="email" type="email" placeholder="email" className="input input-bordered" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input name="password" type="password" placeholder="password" className="input input-bordered" required />
                                <label className="label">
                                    <a href="#">Already have an account? <Link to='/sign-in' className="label-text-alt link link-hover text-xl">Sign in</Link></a>
                                </label>
                            </div>
                            <div className="form-control mt-6">
                                <button type="submit" className="btn btn-primary">Sign up</button>
                            </div>
                        </form>
                        <div className="mx-7 mb-5">
                            <GoogleLogin />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Signup;