import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../firebase/firebase.config";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
//import axios from "axios";

const DashboardHome = () => {
  const [userInfo, setUserInfo] = useState();
  const [user] = useAuthState(auth);
  console.log(user);

  //   useEffect(() => {
  //     const result = axios.get(`http://localhost:5000/user/${user?.email}`);
  //     setUserInfo(result);
  //     console.log(userInfo);
  //   }, [userInfo, user?.email]);

  useEffect(() => {
    fetch(`http://localhost:5000/user/${user?.email}`)
      .then((res) => res.json())
      .then((data) => setUserInfo(data));
  }, [user]);

  console.log(userInfo);

  return (
    <>
      <div>
        <h1>{userInfo?.name}</h1>
        <h1>{userInfo?.email}</h1>
        <Link to={`/dashboard/profile-update/${userInfo?._id}`}>Update</Link>
      </div>
    </>
  );
};

export default DashboardHome;
