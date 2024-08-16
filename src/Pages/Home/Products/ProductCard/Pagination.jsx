import { number } from "prop-types";
import React from "react";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pageNumbers = [];


  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
    // console.log(pageNumbers);
    
  }
//   console.log(currentPage,totalPages,onPageChange,pageNumbers);


  return (
    <div className="flex flex-wrap my-2 gap-2">
      <button
  onClick={() => onPageChange(currentPage - 1)}
  disabled={currentPage === 1}
  className={`px-4 py-2 mx-1 text-gray-700 transition-colors duration-300 transform bg-white rounded-md dark:bg-gray-800 dark:text-gray-200 hover:bg-blue-500 dark:hover:bg-blue-500 hover:text-white dark:hover:text-gray-200 ${
    currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''
  }`}
>
  <div className="flex items-center -mx-1">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="w-6 h-6 mx-1 rtl:-scale-x-100"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M7 16l-4-4m0 0l4-4m-4 4h18"
      />
    </svg>

    <span className="mx-1">Previous</span>
  </div>
</button>


{pageNumbers.map((number) => (
  <button
    key={number}
    onClick={() => onPageChange(number)}
    className={`px-4 py-2 mx-1  transition-colors duration-300 transform  rounded-md sm:inline border border-gray-800  ${
      currentPage === number ? 'bg-blue-500 text-white' : ''
    }`}
  >
    {number}
  </button>
))}

      

      <button
  onClick={() => onPageChange(currentPage + 1)}
  disabled={currentPage === totalPages}
  className={`px-4 py-2 mx-1 text-gray-700 transition-colors duration-300 transform bg-white rounded-md dark:bg-gray-800 dark:text-gray-200 hover:bg-blue-500 dark:hover:bg-blue-500 hover:text-white dark:hover:text-gray-200 ${
    currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''
  }`}
>
  <div className="flex items-center -mx-1">
    <span className="mx-1">Next</span>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="w-6 h-6 mx-1 rtl:-scale-x-100"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M17 8l4 4m0 0l-4 4m4-4H3"
      />
    </svg>
  </div>
</button>

    </div>
  );
};

export default Pagination;
