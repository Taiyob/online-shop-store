import axios from "axios";
import { useEffect, useState } from "react";
import RecipeRow from "../../components/dashboard/RecipeRow";

const ManageAllRecipe = () => {
    const [totalPrice, setTotalPrice] = useState(0);
    const [recipes, setRecipes] = useState([]);
    const [itemsPerPage, setItemPerPage] = useState(5);
    const [currentPage, setCurrentPage] = useState(0);
    const [count, setCount] = useState(0);
    console.log(count);
    const numberOfPages = Math.ceil(count / itemsPerPage);


    const pages = [...Array(numberOfPages).keys()];

    const handleChange = (e) => {
        const val = parseInt(e.target.value);
        setItemPerPage(val);
        setCurrentPage(0);
    }

    useEffect(() => {
        fetch('http://localhost:5000/recipesCount')
            .then(res => res.json())
            .then(data => setCount(data.count))
    }, [])

    useEffect(() => {
        async function load() {
            const data = await axios.get(`http://localhost:5000/recipes?page=${currentPage}&size=${itemsPerPage}`);
            if (data?.status == 200) {
                setRecipes(data?.data);
            }
            let totalPriceSum = 0;
            for (const recipe of data?.data) {
                totalPriceSum += parseFloat(recipe.price);
            }
            setTotalPrice(totalPriceSum);
        }
        load();

    }, [currentPage, itemsPerPage]);

    const handleDelete = (deletedRecipeId) => {
        setRecipes(recipes.filter(recipe => recipe.id !== deletedRecipeId));
        console.log("Recipes after deletion:", recipes);
    };

    const handlePreviousPage = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1);
        }
    }

    const handleNextPage = () => {
        if (currentPage < pages.length - 1) {
            setCurrentPage(currentPage + 1);
        }
    }

    return (
        <div>
            <div className="w-full px-16 my-10 overflow-x-auto">
                <h3 className="mb-4 text-4xl">Manage All Recipes</h3>
                <table className="table table-cell table-xs">
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
                    <tfoot>
                        <tr>
                            <th colSpan="6" className="text-right">Total Price:</th>
                            <th>{totalPrice.toFixed(2)}</th>
                            <th></th>
                        </tr>
                    </tfoot>
                </table>
                <div className="mt-10">
                    <button onClick={handlePreviousPage} className="mr-2 btn btn-outline btn-xs">Previous</button>
                    {
                        pages?.map(page => <button key={page} onClick={() => setCurrentPage(page)} className={`px-2 text-black ${currentPage === page ? 'bg-blue-500' : ''}`}>{page}</button>)
                    }
                    <button onClick={handleNextPage} className="ml-2 btn btn-outline btn-xs">Next</button>
                    <select value={itemsPerPage} onChange={handleChange}>
                        <option value="5">5</option>
                        <option value="10">10</option>
                        <option value="15">15</option>
                        <option value="20">20</option>
                    </select>
                </div>
            </div>
        </div>
    );
};

export default ManageAllRecipe;