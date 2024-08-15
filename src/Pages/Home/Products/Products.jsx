import React from 'react';
import UseAxiosCommon from '../../../hooks/UseAxiosCommon';
import {
  
    useQuery,
  } from '@tanstack/react-query'
import ProductCard from './ProductCard/ProductCard';
  
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
    if (isLoading) {
        return <div>Loading...</div>;
      }

    return (
        <div>
            <div className="container px-6 py-16 mx-auto">
                <h2 className="text-2xl font-semibold text-gray-800 text-center">Products</h2>
                <div className="grid gap-6 mt-4 sm:grid-cols-2 lg:grid-cols-3  md:grid-cols-2">
                    {products.map((product) => (
                        <ProductCard productItem={product} key={product._id}>

                        </ProductCard>
                    ))}
                </div>
            </div>
            
        </div>
    );
};

export default Products;