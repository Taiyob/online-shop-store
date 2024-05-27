import axios from "axios";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";


/* eslint-disable react/prop-types */
const RecipeRow = ({ recipe }) => {
    const handleDelete = () => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                const result = axios.delete(`http://localhost:3000/recipes/${recipe?.id}`);
                if (result?.data?.deletedCount > 0) {
                    Swal.fire({
                        title: "Deleted!",
                        text: "Your file has been deleted.",
                        icon: "success"
                    });
                }
            }
        });
    }
    return (
        <tr>
            <th>{recipe?.id}</th>
            <td>{recipe?.title}</td>
            <td>{recipe?.description}</td>
            <td>{recipe?.image}</td>
            <td>{recipe?.category}</td>
            <td>12/16/2020</td>
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