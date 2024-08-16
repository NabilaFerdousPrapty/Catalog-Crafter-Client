import React, { useState } from "react";
import UseAxiosCommon from "../../../hooks/UseAxiosCommon";
import { useQuery } from "@tanstack/react-query";
import ProductCard from "./ProductCard/ProductCard";
import { HashLoader } from "react-spinners";
import Pagination from "./ProductCard/Pagination";

const Products = ({ totalCount }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(6); 
  const axiosCommon = UseAxiosCommon();

  const { data: products = [], isLoading } = useQuery({
    queryKey: ["products", currentPage],
    queryFn: async () => {
      const { data } = await axiosCommon.get(
        `/products?page=${currentPage}&limit=${productsPerPage}`
      );
      return data;
    },
    keepPreviousData: true, 
  });

  const totalPages = Math.ceil(totalCount.count / productsPerPage); 
  // console.log(products);
  // console.log(totalCount.count);
  // console.log(productsPerPage);
  
  // console.log(totalPages);
  

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
        console.log(newPage);
        console.log(setCurrentPage);
        
        
    }
  };

  return (
    <div>
      <div className="container px-6 py-16 mx-auto">
      <h1 className="text-3xl font-semibold text-gray-800  lg:text-4xl text-center py-3">
        Welcome to <span className="text-blue-500">Electronics</span> Store
      </h1>
      <div className="lg:max-w-lg mx-auto border-2 border-blue-500 rounded-lg p-6">
                    <h1 className="text-3xl font-semibold text-gray-800  lg:text-4xl"> 
                      Search for  All Types of <br/>
                      <span className="text-blue-500">
                      Electronics
                      </span></h1>

                    <p className="mt-3 text-gray-600 dark:text-gray-400">
                      Find the best electronics products at the best prices.
                       <span className="font-medium text-blue-500">
                        Buy now!
                        </span> 
                        What are you waiting for?
                        </p>

                    <div className="flex flex-col mt-6 space-y-3 lg:space-y-0 lg:flex-row">
                        <input id="text" type="text" className="px-4 py-2 text-gray-700 bg-white border rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-opacity-40 focus:ring-blue-300" placeholder="Product name"/>

                        <button className="w-full px-5 py-2 text-sm tracking-wider text-white uppercase transition-colors duration-300 transform bg-blue-600 rounded-lg lg:w-auto lg:mx-4 hover:bg-blue-500 focus:outline-none focus:bg-blue-500">
                            Search
                        </button>
                    </div>
                </div>
        <div className="grid lg:gap-4 gap-2 mt-4 sm:grid-cols-1 lg:grid-cols-3 md:grid-cols-2">
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
