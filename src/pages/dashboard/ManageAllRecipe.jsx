import axios from "axios";
import { useEffect, useState } from "react";
import RecipeRow from "../../components/dashboard/RecipeRow";

const ManageAllRecipe = () => {
    const [recipes, setRecipes] = useState([]);

    useEffect(() => {
        async function load() {
            const data = await axios.get('http://localhost:3000/recipes');
            if (data?.status == 200) {
                setRecipes(data?.data);
            }
        }
        load();
    }, []);

    const handleDelete = (deletedRecipeId) => {
        setRecipes(recipes.filter(recipe => recipe.id !== deletedRecipeId));
        console.log("Recipes after deletion:", recipes);
    };

    return (
        <div>
            <div className="overflow-x-auto w-full px-16 my-10">
                <h3 className="text-4xl mb-4">Manage All Recipes</h3>
                <table className="table table-xs table-cell">
                    <thead>
                        <tr>
                            <th>SL</th>
                            <th>Title</th>
                            <th>Description</th>
                            <th>Image link</th>
                            <th>Category</th>
                            <th>Date</th>
                            <th>Price</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {recipes?.map((recipe, index) => <RecipeRow key={recipe?.id} recipe={recipe} index={index} onDelete={handleDelete} />)}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageAllRecipe;