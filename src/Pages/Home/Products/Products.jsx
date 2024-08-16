import React, { useEffect, useState } from "react";
import UseAxiosCommon from "../../../hooks/UseAxiosCommon";
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
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const {
    data: products = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["products", currentPage, search],
    queryFn: async () => {
      const { data } = await axiosSecure.get(
        `/products?page=${currentPage}&limit=${productsPerPage}&search=${search}`
      );
      return data;
    },
    keepPreviousData: true,
  });

  const totalPages = Math.ceil(totalCount.count / productsPerPage);

  const onSubmit = (data) => {
    const { search } = data;
    setSearch(search);
    Swal.fire({
      icon: "info",
      title: "Please wait",
      text: `You searched for ${search}`,
      showConfirmButton: false,
      timer: 100,
    });
  };

  useEffect(() => {
    refetch();
  }, [search]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <HashLoader />
      </div>
    );
  }

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <div>
      <div id="shop" className="container px-6 py-16 mx-auto">
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
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col mt-6 space-y-3 lg:space-y-0 lg:flex-row"
          >
            <input
              id="text"
              type="text"
              {...register("search", { required: true })}
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
          {errors.search && (
            <p className="text-red-500">This field is required</p>
          )}
        </div>
        <div>
          <div className="md:flex justify-between items-center gap-5 border-4 border-teal-500 rounded-md max-w-5xl mx-auto py-8 px-1 my-2">
            <input
              type="text"
              name="brand"
              id="brand"
              placeholder="Brand Name"
              className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600  dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
            />
            <input
              type="text"
              name="category"
              id="category"
              placeholder="Category Name"
              className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600  dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
            />
            <select className="select select-success w-full max-w-xs">
              <option disabled selected>
                Pick your price range
              </option>
              <option>৳ 500 - ৳ 1000</option>
              <option>৳ 1000 - ৳ 2000</option>
              <option>৳ 2000 - ৳ 4000</option>
              <option>৳ 4000 - ৳ 8000</option>
              <option>৳ 8000 - ৳ 16000</option>
              <option>৳ 16000 - ৳ 32000</option>
              <option>৳ 32000 - ৳ 64000</option>
              <option>৳ 64000 - ৳ 128000</option>
            </select>
            <button
              type="submit"
              className="w-3/4 px-4 py-2 tracking-wide text-white transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:bg-blue-400 focus:ring focus:ring-blue-300 focus:ring-opacity-50"
            >
              Filter
            </button>
          </div>
          <h1 className="text-3xl font-semibold text-gray-800  lg:text-4xl text-center py-3">
            Sort by <span className="text-blue-500">Price and date</span>
          </h1>
          <div className=" md:flex justify-between items-center max-w-xs mx-auto border border-teal-500 rounded-box my-5">
            <div className="dropdown dropdown-hover">
              <div tabIndex={0} role="button" className="btn m-1 bg-gray-900 text-white">
              Price
              </div>
              <ul
                tabIndex={0}
                className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow"
              >
                <li>
                  <a>
                   Low to High
                  </a>
                </li>
                <li>
                  <a>
                    High to Low
                  </a>
                </li>
              </ul>
            </div>
            <div className="dropdown dropdown-hover">
              <div tabIndex={0} role="button" className="btn m-1 bg-gray-900 text-white">
              Date 
              </div>
              <ul
                tabIndex={0}
                className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow"
              >
                <li>
                  <a>
                   Newest First
                  </a>
                </li>
                <li>
                  <a>
                    Oldest First
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="grid lg:gap-4 gap-2 mt-4 sm:grid-cols-1 lg:grid-cols-3 md:grid-cols-2">
          {isLoading && (
            <div className="flex justify-center items-center h-screen">
              <HashLoader />
            </div>
          )}
          {!isLoading &&
            products.map((product) => (
              <ProductCard productItem={product} key={product._id} />
            ))}
        </div>
        <div className="flex lg:h-20 md:h-28 h-48 justify-center items-center flex-wrap">
          {/* Pagination */}
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  );
};

export default Products;
