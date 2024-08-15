import React from 'react';
import UseAxiosCommon from '../../../hooks/UseAxiosCommon';
import {
  
    useQuery,
  } from '@tanstack/react-query'
  
const Products = () => {
    const axiosCommon = UseAxiosCommon();
    const { data: products = [], isLoading } = useQuery({
      queryKey: ["products"],
      queryFn: async () => {
        const { data } = await axiosCommon.get("/products");
        return data;
      },
    });
  if (!isLoading) {
    console.log(products);
    
  }
    
    return (
        <div>
            
        </div>
    );
};

export default Products;