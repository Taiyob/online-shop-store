import { Link, useNavigate } from "react-router-dom";
import GoogleLogin from "../components/auth/GoogleLogin";
import auth from "../firebase/firebase.config";
import {
  useAuthState,
  useCreateUserWithEmailAndPassword,
} from "react-firebase-hooks/auth";
import { useEffect, useState } from "react";
import axios from "axios";

const Signup = () => {
  const [err, setErr] = useState();
  const userInfo = useAuthState(auth);
  const [createUserWithEmailAndPassword, user, loading, error] =
    useCreateUserWithEmailAndPassword(auth);
  const navigate = useNavigate();
  const from = location?.state?.from?.pathname || "/";

  const handleSignUp = (e) => {
    e.preventDefault();

    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;

    createUserWithEmailAndPassword(email, password).then(async (data) => {
      if (!loading) {
        //const userName = data?.user?.displayName;
        const userInfo = {
          email: data?.user?.email,
          name: name,
        };
        const insertUser = await axios.post(
          `http://localhost:5000/user`,
          userInfo
        );
        console.log(insertUser);
      }
    });
  };

  useEffect(() => {
    if (userInfo[0]) {
      navigate(from, { replace: true });
    }
    if (error) {
      setErr(error?.message);
    }
  }, [from, navigate, userInfo, error]);

  console.log(user, loading);

  return (
    <div>
      <div className="flex items-center justify-center min-h-screen bg-base-200">
        <div className="flex flex-col items-center justify-center gap-2 lg:flex-row-reverse">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold">Sign Up</h1>
          </div>
          <div className="w-full max-w-sm shadow-2xl card shrink-0 bg-base-100">
            <form onSubmit={handleSignUp} className="card-body">
              {err && <p className="text-red-500">{err}</p>}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Name</span>
                </label>
                <input
                  name="name"
                  type="text"
                  placeholder="Name"
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  name="email"
                  type="email"
                  placeholder="email"
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  name="password"
                  type="password"
                  placeholder="password"
                  className="input input-bordered"
                  required
                />
                <label className="label">
                  <a href="#">
                    Already have an account?{" "}
                    <Link
                      to="/sign-in"
                      className="text-xl label-text-alt link link-hover"
                    >
                      Sign in
                    </Link>
                  </a>
                </label>
              </div>
              <div className="mt-6 form-control">
                <button type="submit" className="btn btn-primary">
                  Sign up
                </button>
              </div>
            </form>
            <div className="mb-5 mx-7">
              <GoogleLogin />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
