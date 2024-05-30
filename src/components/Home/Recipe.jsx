import { useEffect, useState } from "react";
import Header from "../../shared/Header";
import RecipeCard from "./RecipeCard";

const Recipe = () => {
    const [recipes, setRecipe] = useState();

    useEffect(()=>{
        async function load(){
            const res = await fetch('http://localhost:5000/recipes');
            const data = await res.json();
            setRecipe(data);
        }
        load();
    },[]);
    return (
        <div className="pb-4 px-16">
            <Header headerText= 'Our Newest Recipe'/>
            <div className="grid grid-cols-4 gap-6">
                {recipes?.reverse()?.slice(0,4)?.map((recipe)=> <RecipeCard key={recipe?.id} recipes={recipe} />)}
            </div>
        </div>
    );
};

export default Recipe;