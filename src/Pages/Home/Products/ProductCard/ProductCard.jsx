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
  
    // Combine date and time into a single Date object
    const dateTimeString = `${createdAtDate}T${createdAtTime}Z`; 
    const localTime = new Date(dateTimeString).toLocaleTimeString(); // Convert to local time
  
    return (
      <div className="max-w-md overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800 ">
        <div className="px-4 py-2 ">
          <h1 className="text-xl font-bold text-gray-800 uppercase dark:text-white">
            {name}
          </h1>
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
            {description}
          </p>
        </div>
        <div className="md:flex-row flex-col items-center justify-between px-4 py-2 bg-gray-900">
          <h1 className="text-sm font-semibold text-white">
            <span className="font-mono px-2 text-amber-500">Category:</span>
            {category}
          </h1>
          <h1 className="text-sm font-semibold text-white">
            <span className="font-mono px-2 text-amber-500">Brand:</span>
            {brand}
          </h1>
        </div>
        <div className="md:flex-row flex-col items-center justify-between px-4 py-2 bg-gray-900">
          <h1 className="text-sm font-semibold text-white">
            <span className="font-mono px-2 text-amber-500">Listed at:</span>
            {createdAtDate}
            <span className="font-mono md:px-2 text-amber-500">on</span> 
             {localTime} 
          </h1>
        </div>
        <img
          className="object-cover w-full h-72  mt-2 border-y border-gray-200 object-center  lg:hover:overflow-y-visible hover:scale-105 transition-transform duration-300"
          src={image}
          alt={name}
        />
  
        <div className="flex items-center justify-between px-4 py-2 bg-gray-900">
          <h1 className="text-lg font-bold text-white">
            <span className="text-sm">⭐</span>
            {ratings}
          </h1>
          <h1 className="text-lg font-bold text-white">৳{price}</h1>
  
          <br />
          <button className="px-2 py-1 text-xs font-semibold text-gray-900 uppercase transition-colors duration-300 transform bg-amber-300 rounded hover:bg-gray-200 focus:bg-gray-400 focus:outline-none mx-2">
            Add to cart
          </button>
  
          <button className="px-2 py-1 text-xs font-semibold text-gray-900 uppercase transition-colors duration-300 transform bg-teal-100 rounded hover:bg-gray-200 focus:bg-gray-400 focus:outline-none">
            View Details
          </button>
        </div>
       
      </div>
    );
  };
  
  export default ProductCard;
  