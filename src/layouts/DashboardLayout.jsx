import { useSignOut } from "react-firebase-hooks/auth";
import { Link, Outlet, useNavigate } from "react-router-dom";
import auth from "../firebase/firebase.config";
import Swal from "sweetalert2";

const DashboardLayout = () => {
    const [signOut] = useSignOut(auth);
    const navigate = useNavigate();

    const handleSignOut = async () => {
        const successLogOut = await signOut();
        if (successLogOut) {
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "You are now sign out",
                showConfirmButton: false,
                timer: 1500
            });
            navigate('/');
        }
    }
    return (
        <div>
            <div className="drawer lg:drawer-open">
                <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content flex flex-col items-center justify-center">
                    {/* Page content here */}
                    <Outlet />
                    <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">Open drawer</label>
                </div>
                <div className="drawer-side">
                    <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
                    <ul className="menu p-4 w-80 min-h-screen bg-base-200 text-base-content flex flex-col justify-between">
                        {/* Sidebar content here */}
                        <div>
                            <li><Link to='/dashboard/card-recipe'>All Recipe Cards</Link></li>
                            <li><Link to='/dashboard/manage-recipe'>Manage All Recipe</Link></li>
                            <li><Link to='/dashboard/add-recipe'>Add Recipe</Link></li>
                        </div>
                        <div className="flex gap-6">
                            <Link to={`/`} className="btn btn-primary">Home</Link>
                            <Link onClick={handleSignOut} className="btn btn-primary">Logout</Link>
                        </div>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default DashboardLayout;