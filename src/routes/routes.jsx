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
import AllRecipeCard from "../pages/dashboard/AllRecipeCard";
import RecipeDetails from "../pages/dashboard/RecipeDetails";
import PrivateRoutes from "./PrivateRoutes";
import ProfileUpdate from "../pages/dashboard/ProfileUpdate";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
    ],
  },
  {
    path: "/sign-in",
    element: <Signin></Signin>,
  },
  {
    path: "/sign-up",
    element: <Signup></Signup>,
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoutes>
        <DashboardLayout></DashboardLayout>
      </PrivateRoutes>
    ),
    children: [
      {
        index: true,
        element: <DashboardHome />,
      },
      {
        path: "card-recipe",
        element: <AllRecipeCard />,
      },
      {
        path: "details-recipe/:id",
        element: <RecipeDetails />,
      },
      {
        path: "manage-recipe",
        element: <ManageAllRecipe />,
      },
      {
        path: "edit-recipe/:id",
        element: <EditRecipe />,
      },
      {
        path: "add-recipe",
        element: <AddRecipe />,
      },
      {
        path: "profile-update/:id",
        element: <ProfileUpdate />,
        loader: ({ params }) =>
          fetch(`http://localhost:5000/get/user/${params.id}`),
      },
    ],
  },
]);
