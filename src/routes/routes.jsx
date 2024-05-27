import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home";
import Signin from "../pages/Signin";
import Signup from "../pages/Signup";
import DashboardLayout from "../layouts/DashboardLayout";
import DashboardHome from "../pages/dashboard/DashboardHome";
import ManageAllRecipe from "../pages/dashboard/ManageAllRecipe";
import EditRecipe from "../pages/dashboard/EditRecipe";
import AddRecipe from "../pages/dashboard/AddRecipe";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout />,
        children: [
            {
                index: true,
                element: <Home />,
            },
        ],
    },
    {
        path: '/sign-in',
        element: <Signin></Signin>,
    },
    {
        path: '/sign-up',
        element: <Signup></Signup>,
    },
    {
        path: '/dashboard',
        element: <DashboardLayout></DashboardLayout>,
        children: [
            {
                index: true,
                element: <DashboardHome />,
            },
            {
                path: 'manage-recipe',
                element: <ManageAllRecipe />,
            },
            {
                path: 'edit-recipe/:id',
                element: <EditRecipe />,
            },
            {
                path: 'add-recipe',
                element: <AddRecipe />,
            },
        ],
    }
]);