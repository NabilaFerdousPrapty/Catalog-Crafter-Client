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
        <h2 className="text-2xl font-semibold text-gray-800 text-center">
          Products
        </h2>
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
