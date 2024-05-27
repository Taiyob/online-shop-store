import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const RecipeDetails = () => {
    const [recipe, setRecipe] = useState();
    const { id } = useParams();
    console.log(id);

    useEffect(() => {
        async function load() {
            const recipeData = await axios.get(`http://localhost:3000/recipes/${id}`);
            if (recipeData?.status == 200) {
                setRecipe(recipeData?.data);
            }
        }
        load();
    }, [id])

    return (
        <div>
            <Link to={`/dashboard/card-recipe`} className="justify-left">Back</Link>
            <div className="p-8">
                <div className="w-full bg-base-100">
                    <figure><img src='https://images.pexels.com/photos/1639562/pexels-photo-1639562.jpeg?auto=compress&cs=tinysrgb&w=600' alt="Shoes" /></figure>
                    <div className="mt-4">
                        <div className="flex justify-between items-center">
                            <h2 className="card-title">{recipe?.title}</h2>
                            <h5 className="p-2 bg-slate-200 rounded">{recipe?.category}</h5>
                        </div>
                        <p>{recipe?.description}</p>
                        <div className="card-actions justify-end mt-4">
                            <button className="btn btn-primary">Order Now</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RecipeDetails;