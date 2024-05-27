import axios from "axios";
import { useEffect, useState } from "react";
import Header from "../../shared/Header";
import DashboardCard from "../../components/dashboard/DashboardCard";

const AllRecipeCard = () => {
    const [recipes, setRecipes] = useState();

    useEffect(() => {
        async function load() {
            const data = await axios.get('http://localhost:3000/recipes');
            if (data?.status == 200) {
                setRecipes(data?.data);
            }
        }
        load();
    }, []);
    return (
        <div>
            <Header headerText='Welcome To Dashboard' />
            <div className="lg:grid grid-cols-4 gap-4 md:grid grid-cols-3 p-8">
                {recipes?.map((recipe) => <DashboardCard key={recipe?.id} recipe={recipe} />)}
            </div>
        </div>
    );
};

export default AllRecipeCard;