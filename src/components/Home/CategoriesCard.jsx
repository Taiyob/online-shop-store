/* eslint-disable react/prop-types */
const CategoriesCard = ({categories}) => {
    return (
        <div>
            <section className="dark:bg-gray-100 dark:text-gray-800">
                <div className="container p-6 mx-auto space-y-6 text-center lg:p-8 lg:space-y-8">
                    <h1 className="text-red-950">{categories?.title}</h1>
                </div>
            </section>
        </div>
    );
};

export default CategoriesCard;