import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/UseAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import ProductCard from "./ProductCard/ProductCard";
import { HashLoader } from "react-spinners";
import Pagination from "./ProductCard/Pagination";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

const Products = ({ totalCount }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(6);
  const [search, setSearch] = useState("");
  const axiosSecure = useAxiosSecure();
  const [filters, setFilters] = useState({
    brand: "",
    category: "",
    priceRange: "",
    priceSort: "", // Initialize priceSort
    dateSort: "",  // Initialize dateSort
  });

  // Separate useForm for search
  const {
    register: registerSearch,
    handleSubmit: handleSubmitSearch,
    formState: { errors: searchErrors },
  } = useForm();

  // Separate useForm for filter
  const {
    register: registerFilter,
    handleSubmit: handleSubmitFilter,
  } = useForm();

  const onFilterSubmit = (data) => {
    setFilters({
      ...filters,
      brand: data.brand || "",
      category: data.category || "",
      priceRange: data.priceRange || "",
      priceSort: data.priceSort || "",
      dateSort: data.dateSort || "",
    });
  };

  const onSearchSubmit = (data) => {
    setSearch(data.search);
    Swal.fire({
      icon: "info",
      title: "Please wait",
      text: `You searched for ${data.search}`,
      showConfirmButton: false,
      timer: 1000,
    });
  };

  const {
    data: products = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["products", currentPage, search, filters],
    queryFn: async () => {
      const { data } = await axiosSecure.get(
        `/products?page=${currentPage}&limit=${productsPerPage}&search=${search}&brand=${filters.brand}&category=${filters.category}&priceRange=${filters.priceRange}&priceSort=${filters.priceSort}&dateSort=${filters.dateSort}`
      );
      return data;
    },
    keepPreviousData: true,
  });

  useEffect(() => {
    refetch();
  }, [search, filters, currentPage]);

  const totalPages = Math.ceil(totalCount.count / productsPerPage);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };
console.log(filters);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <HashLoader />
      </div>
    );
  }

  return (
    <div>
      <div  className="container lg:px-6 px-1 py-16 mx-auto">
        <h1 className="text-3xl font-semibold text-gray-800  lg:text-4xl text-center py-3">
          Welcome to <span className="text-blue-500">Electronics</span> Store
        </h1>
       
        <div className="lg:max-w-lg mx-auto border-2 border-blue-500 rounded-lg p-6">
          <h1 className="text-3xl font-semibold text-gray-800  lg:text-4xl">
            Search for All Types of <br />
            <span className="text-blue-500">Electronics</span>
          </h1>

          <p className="mt-3 text-gray-600 dark:text-gray-400">
            Find the best electronics products at the best prices.
            <span className="font-medium text-blue-500">Buy now!</span>
            What are you waiting for?
          </p>

          <form
            onSubmit={handleSubmitSearch(onSearchSubmit)}
            className="flex flex-col  mt-6 space-y-3 lg:space-y-0 lg:flex-row justify-between items-center"
          >
            <input
              id="text"
              type="text"
              {...registerSearch("search", { required: true })}
              className="px-4 py-2 text-gray-700 bg-white border rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-opacity-40 focus:ring-blue-300"
              placeholder="Product name"
            />

            <button
              type="submit"
              className="w-full px-5 py-2 text-sm tracking-wider text-white uppercase transition-colors duration-300 transform bg-blue-600 rounded-lg lg:w-auto lg:mx-4 hover:bg-blue-500 focus:outline-none focus:bg-blue-500"
            >
              Search
            </button>
          </form>
          {searchErrors.search && (
            <p className="text-red-500">This field is required</p>
          )}
        </div>
        <div className="border-4 border-teal-500 rounded-md my-3 ">
          <h1 className="text-3xl font-semibold text-gray-800  lg:text-4xl text-center py-3">
            Filter by <span className="text-blue-500">Brand, Category and Price</span>
          </h1>
          <form onSubmit={handleSubmitFilter(onFilterSubmit)} className=" lg:flex-row flex-col mt-6 space-y-3 lg:space-y-0 ">
            <input
              type="text"
              name="brand"
              {...registerFilter("brand")}
              id="brand"
              placeholder="Brand Name"
              className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600  dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
            />
            <input
              type="text"
              {...registerFilter("category")}
              name="category"
              id="category"
              placeholder="Category Name"
              className="block w-full  px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600  dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
            />
            <select
             {...registerFilter("priceRange")}
             className="select select-success w-full  max-w-7xl">
              
              <option value="" disabled selected >
                Pick your price range
              </option>
              <option value="500-1000">৳ 500 - ৳ 1000</option>
              <option value="1000-2000">৳ 1000 - ৳ 2000</option>
              <option value="2000-4000">৳ 2000 - ৳ 4000</option>
              <option value="4000-8000">৳ 4000 - ৳ 8000</option>
              <option value="8000-16000">৳ 8000 - ৳ 16000</option>
              <option value="16000-32000">৳ 16000 - ৳ 32000</option>
              <option value="32000-64000">৳ 32000 - ৳ 64000</option>
              <option value="64000-128000" >৳ 64000 - ৳ 128000</option>
            </select>
           
          <div className="">
          <h1 className="text-3xl  font-semibold text-gray-800  lg:text-4xl text-center py-3">
            Sort by <span className="text-blue-500">Price and Date</span>
          </h1>
          <div className=" flex justify-between items-center max-w-xs mx-auto border border-teal-500 rounded-box my-5 px-3">
          <select
             {...registerFilter("priceSort")}
             className="select select-bordered bg-slate-900 text-white lg:w-1/4  md:w-1/2 w-[40%] max-w-xs">
              
              <option value="" disabled selected >
               Price
              </option>
              
              <option value="highToLow">
                High to Low
              </option>
              <option value="lowToHigh">Low to High</option>
            </select>
          <select
             {...registerFilter("dateSort")}
             className="select select-bordered bg-slate-900 text-white lg:w-1/4 md:w-1/2 w-[40%] max-w-xs">
              
              <option value="" disabled selected >
               Date
              </option>
              
              <option value="newestFirst">Newest First</option>
              <option value="oldestFirst">Oldest First</option>
            </select>
          </div>
          </div>
            <button
              type="submit"
              className=" w-full px-4 py-2 tracking-wide text-white transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:bg-blue-400 focus:ring focus:ring-blue-300 focus:ring-opacity-50"
            >
              Filter
            </button>
          </form>
        
        </div>
        
        <div id="shop" className="grid grid-cols-1 lg:gap-8 gap-4 gap-1 mt-8 md:grid-cols-2 xl:grid-cols-3">
          {products.length > 0 ? (
            products.map((product) => (
              <ProductCard key={product._id} productItem={product} />
            ))
          ) : (
            <p className="text-center text-2xl text-gray-800">
              No products found 
            </p>
          )}
        </div>
      </div>
      <div className="lg:py-10 py-6 flex justify-center">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default Products;
