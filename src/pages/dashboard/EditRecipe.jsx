import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const EditRecipe = () => {
    const [categories, setCategories] = useState();
    const [recipeDetail, setRecipeDetail] = useState();

    const {id} = useParams();

    useEffect(() => {
        async function load() {
            const data = await axios.get('http://localhost:3000/categories');
            if (data?.status == 200) {
                setCategories(data?.data);
            }

            const recipeInfo = await axios.get(`http://localhost:3000/recipes/${id}`);
            if(recipeInfo?.status == 200){
                setRecipeDetail(recipeInfo?.data);
            }
        }
        load();
    }, [id]);

    const handleCreateRecipe = async(e)=>{
        e.preventDefault();

        const form = e.target;
        const title = form.title.value;
        const categories = form.categories.value;
        const description = form.description.value;
        const image = form.image.value;
        const price = form.price.value;

        const recipeData = {title,categories,description,image,price};

        await axios.patch(`http://localhost:3000/recipes/${id}`, recipeData);
    }
    return (
        <div>
            <section className="p-6 dark:bg-gray-100 dark:text-gray-900">
                <form onSubmit={handleCreateRecipe} action="" className="container flex flex-col mx-auto space-y-12">
                    <fieldset className="grid grid-cols-4 gap-6 p-6 rounded-md shadow-sm dark:bg-gray-50">
                        <div className="space-y-2 col-span-full lg:col-span-1">
                            <p className="font-medium">Recipe</p>
                            <p className="text-xs">Update Here!!!</p>
                        </div>
                        <div className="grid grid-cols-6 gap-4 col-span-full lg:col-span-3">
                            <div className="col-span-full sm:col-span-3">
                                <label htmlFor="title" className="text-sm">Title</label>
                                <input id="title" type="text" defaultValue={recipeDetail?.title} className="w-full rounded-md border border-black p-2" />
                            </div>
                            <div className="col-span-full sm:col-span-3">
                                <label htmlFor="categories" className="text-sm">Category</label>
                                <select name="categories" id="categories" className="w-full rounded-md border border-black p-2">
                                    {categories?.map((category) => <option key={category?.id} selected={category?.title == recipeDetail?.category} value={category?.title}>{category?.title}</option>)}
                                </select>
                            </div>
                            <div className="col-span-full">
                                <label htmlFor="description" className="text-sm">Description</label>
                                <textarea id="description" defaultValue={recipeDetail?.description} className="w-full rounded-md border border-black p-2"></textarea>
                            </div>
                            <div className="col-span-full sm:col-span-3">
                                <label htmlFor="image" className="text-sm">Image Link</label>
                                <input id="image" type="text" defaultValue={recipeDetail?.image} className="w-full rounded-md border border-black p-2" />
                            </div>
                            <div className="col-span-full sm:col-span-3">
                                <label htmlFor="price" className="text-sm">Price</label>
                                <input id="price" type="number" defaultValue={recipeDetail?.price} className="w-full rounded-md border border-black p-2" />
                            </div>
                            <div className="col-span-full">
                                <div className="flex items-center space-x-2">
                                    <button type="submit" className="px-4 py-2 border rounded-md btn btn-transparent bg-transparent">Update</button>
                                </div>
                            </div>
                        </div>
                    </fieldset>
                </form>
            </section>
        </div>
    );
};

export default EditRecipe;