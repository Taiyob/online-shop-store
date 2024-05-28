import { Link, useNavigate } from "react-router-dom";
import GoogleLogin from "../components/auth/GoogleLogin";
import auth from "../firebase/firebase.config";
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect } from "react";

const Signup = () => {
    const [user] = useAuthState(auth);
    const navigate = useNavigate();
    const from = location?.state?.from?.pathname || '/';

    useEffect(() => {
        if (user) {
            navigate(from, { replace: true });
        }
    }, [from, navigate, user])

    return (
        <div>
            <div className="min-h-screen bg-base-200 flex items-center justify-center">
                <div className="flex flex-col lg:flex-row-reverse items-center justify-center gap-2">
                    <div className="text-center lg:text-left">
                        <h1 className="text-5xl font-bold">Sign Up</h1>
                    </div>
                    <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                        <form className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email" placeholder="email" className="input input-bordered" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type="password" placeholder="password" className="input input-bordered" required />
                                <label className="label">
                                    <a href="#">Already have an account? <Link to='/sign-in' className="label-text-alt link link-hover text-xl">Sign in</Link></a>
                                </label>
                            </div>
                            <div className="form-control mt-6">
                                <button className="btn btn-primary">Sign up</button>
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