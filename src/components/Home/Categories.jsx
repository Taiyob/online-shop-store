import { useEffect, useState } from "react";
import Header from "../../shared/Header";
import CategoriesCard from "./CategoriesCard";

const Categories = () => {
    const [categories, setCategories] = useState();

    useEffect(()=>{
        // fetch('http://localhost:3000/categories')
        // .then((res)=> res.json())
        // .then((data)=> setCategories(data));
        async function load(){
            const res = await fetch('http://localhost:5000/categories');
            const data = await res.json();
            setCategories(data);
        }
        load();
    },[]);
    return (
        <div className="px-16">
            <Header headerText= 'Our Recipe Category'></Header>
            <div className="flex flex-wrap justify-center lg:justify-between">
                {categories?.map((category)=> <CategoriesCard key={category?.id} categories={category} />)}
            </div>
        </div>
    );
};

export default Categories;