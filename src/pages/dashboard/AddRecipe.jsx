import axios from "axios";
import { useEffect, useState } from "react";

const AddRecipe = () => {
    const [categories, setCategories] = useState();

    useEffect(() => {
        async function load() {
            const data = await axios.get('http://localhost:3000/categories');
            if (data?.status == 200) {
                setCategories(data?.data);
            }
        }
        load();
    }, []);

    const handleCreateRecipe = async(e)=>{
        e.preventDefault();

        const form = e.target;
        const id = form.id.value;
        const title = form.title.value;
        const categories = form.categories.value;
        const description = form.description.value;
        const image = form.image.value;
        const price = form.price.value;

        const recipeData = {id,title,categories,description,image,price};

        await axios.post('http://localhost:3000/recipes', recipeData);
    }
    return (
        <div>
            <section className="p-6 dark:bg-gray-100 dark:text-gray-900">
                <form onSubmit={handleCreateRecipe} action="" className="container flex flex-col mx-auto space-y-12">
                    <fieldset className="grid grid-cols-4 gap-6 p-6 rounded-md shadow-sm dark:bg-gray-50">
                        <div className="space-y-2 col-span-full lg:col-span-1">
                            <p className="font-medium">Recipe</p>
                            <p className="text-xs">Create New!!!</p>
                        </div>
                        <div className="grid grid-cols-6 gap-4 col-span-full lg:col-span-3">
                            <div className="col-span-full">
                                <label htmlFor="id" className="text-sm">Id</label>
                                <input name="id" id="id" type="number" placeholder="Id" className="w-full rounded-md border border-black p-2" />
                            </div>
                            <div className="col-span-full sm:col-span-3">
                                <label htmlFor="title" className="text-sm">Title</label>
                                <input name="title" id="title" type="text" placeholder="Title" className="w-full rounded-md border border-black p-2" />
                            </div>
                            <div className="col-span-full sm:col-span-3">
                                <label htmlFor="categories" className="text-sm">Category</label>
                                <select name="categories" id="categories" className="w-full rounded-md border border-black p-2">
                                    {categories?.map((category) => <option key={category?.id} value={category?.title}>{category?.title}</option>)}
                                </select>
                            </div>
                            <div className="col-span-full">
                                <label htmlFor="description" className="text-sm">Description</label>
                                <textarea name="description" id="description" placeholder="" className="w-full rounded-md border border-black"></textarea>
                            </div>
                            <div className="col-span-full sm:col-span-3">
                                <label htmlFor="image" className="text-sm">Image Link</label>
                                <input name="image" id="image" type="text" placeholder="Image Link" className="w-full rounded-md border border-black p-2" />
                            </div>
                            <div className="col-span-full sm:col-span-3">
                                <label htmlFor="price" className="text-sm">Price</label>
                                <input name="price" id="price" type="number" placeholder="Price" className="w-full rounded-md border border-black p-2" />
                            </div>
                            <div className="col-span-full">
                                <div className="flex items-center space-x-2">
                                    <button type="submit" className="px-4 py-2 border rounded-md btn btn-transparent bg-transparent">Add</button>
                                </div>
                            </div>
                        </div>
                    </fieldset>
                </form>
            </section>
        </div>
    );
};

export default AddRecipe;