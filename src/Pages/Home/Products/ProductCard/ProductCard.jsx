import PropTypes from 'prop-types'; 
const ProductCard = ({ productItem }) => {
    const {
        name,
        brand,
        image,
        description,
        price,
        category,
        ratings,
        createdAtDate,
        createdAtTime,
    } = productItem;

    return (
        <div className="max-w-md overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800 ">
            <div className="px-4 py-2">
                <h1 className="text-xl font-bold text-gray-800 uppercase dark:text-white">{name}</h1>
                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                    {description}
                </p>
            </div>

            <img
                className="object-cover w-full h-72 mt-2 border-y border-gray-200"
                src={image}
                alt={name}
            />

            <div className="flex items-center justify-between px-4 py-2 bg-gray-900">
                <h1 className="text-lg font-bold text-white">৳{price}</h1>
                <button className="px-2 py-1 text-xs font-semibold text-gray-900 uppercase transition-colors duration-300 transform bg-white rounded hover:bg-gray-200 focus:bg-gray-400 focus:outline-none">
                    Add to cart
                </button>
            </div>
        </div>
    );
};

export default ProductCard;

ProductCard.propTypes = {
    productItem: PropTypes.object.isRequired,
};