import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const AddRecipe = () => {
    const [categories, setCategories] = useState();
    const navigate = useNavigate();

    useEffect(() => {
        async function load() {
            const data = await axios.get('http://localhost:5000/categories');
            if (data?.status == 200) {
                setCategories(data?.data);
            }
        }
        load();
    }, []);

    const handleCreateRecipe = async (e) => {
        e.preventDefault();

        const form = e.target;
        const id = form.id.value;
        const title = form.title.value;
        const category = form.category.value;
        const description = form.description.value;
        const image = form.image.value;
        const price = form.price.value;
        form.reset();

        const recipeData = { id, title, category, description, image, price };

        if (recipeData) {
            Swal.fire({
                title: "Are you sure?",
                text: "You want to create this!",
                icon: "info",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, create it!"
            }).then(async (result) => {
                if (result.isConfirmed) {
                    const result = await axios.post('http://localhost:3000/recipes', recipeData);
                    if (result?.status == 201) {
                        Swal.fire({
                            title: "Created!",
                            text: "Your recipe has been created.",
                            icon: "success"
                        });
                        navigate('/dashboard/manage-recipe');
                    }
                }
            });
        }
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
                                <input name="id" id="id" type="number" placeholder="Id" className="w-full p-2 border border-black rounded-md" />
                            </div>
                            <div className="col-span-full sm:col-span-3">
                                <label htmlFor="title" className="text-sm">Title</label>
                                <input name="title" id="title" type="text" placeholder="Title" className="w-full p-2 border border-black rounded-md" />
                            </div>
                            <div className="col-span-full sm:col-span-3">
                                <label htmlFor="category" className="text-sm">Category</label>
                                <select name="category" id="category" className="w-full p-2 border border-black rounded-md">
                                    {categories?.map((category) => <option key={category?.id} value={category?.title}>{category?.title}</option>)}
                                </select>
                            </div>
                            <div className="col-span-full">
                                <label htmlFor="description" className="text-sm">Description</label>
                                <textarea name="description" id="description" placeholder="" className="w-full border border-black rounded-md"></textarea>
                            </div>
                            <div className="col-span-full sm:col-span-3">
                                <label htmlFor="image" className="text-sm">Image Link</label>
                                <input name="image" id="image" type="text" placeholder="Image Link" className="w-full p-2 border border-black rounded-md" />
                            </div>
                            <div className="col-span-full sm:col-span-3">
                                <label htmlFor="price" className="text-sm">Price</label>
                                <input name="price" id="price" type="number" placeholder="Price" className="w-full p-2 border border-black rounded-md" />
                            </div>
                            <div className="col-span-full">
                                <div className="flex items-center space-x-2">
                                    <button type="submit" className="px-4 py-2 bg-transparent border rounded-md btn btn-transparent">Add</button>
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