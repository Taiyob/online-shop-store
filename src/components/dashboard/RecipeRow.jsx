import axios from "axios";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";


/* eslint-disable react/prop-types */
const RecipeRow = ({ recipe, index, onDelete }) => {
    const handleDelete = async () => {
        console.log("Deleting recipe...", recipe.id);
        await Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const response = await axios.delete(`http://localhost:3000/recipes/${recipe?.id}`);
                    console.log(response);
                    if (response?.status == 200) {
                        Swal.fire({
                            title: "Deleted!",
                            text: "Your file has been deleted.",
                            icon: "success"
                        });
                        onDelete(recipe?.id);
                    }
                } catch (error) {
                    console.error("Error deleting recipe:", error);
                    Swal.fire({
                        title: "Error!",
                        text: "An error occurred while deleting the recipe.",
                        icon: "error"
                    });
                }
            }
        });
    }
    return (
        <tr>
            <th>{index + 1}</th>
            <td>{recipe?.title}</td>
            <td>{recipe?.description}</td>
            <td>{recipe?.image}</td>
            <td>{recipe?.category}</td>
            <td>12/16/2024</td>
            <td>{recipe?.price}</td>
            <td>
                <div style={{ display: 'flex', gap: '5px' }}>
                    <Link to={`/dashboard/edit-recipe/${recipe?.id}`} className="btn btn-xs btn-neutral">Edit</Link>
                    <button onClick={handleDelete} className="btn btn-xs btn-error">Delete</button>
                </div>
            </td>
        </tr>
    );
};

export default RecipeRow;