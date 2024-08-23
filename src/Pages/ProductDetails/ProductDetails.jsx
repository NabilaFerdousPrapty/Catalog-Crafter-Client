import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useParams } from 'react-router-dom';
import { axiosSecure } from '../../hooks/UseAxiosSecure';

const ProductDetails = () => {
    const {id}= useParams();
    console.log(id);
    const { data: product = {}, isLoading, refetch, error } = useQuery({
      queryKey: ["product", id],
      queryFn: async () => {
          const { data } = await axiosSecure.get(`/products/${id}`);
          return data;
      },
      keepPreviousData: true,
  });
  
  if (error) {
      console.error('Error fetching product:', error);
  }
  
  console.log('Product:', product);
  
  
    
  if (isLoading) {
    return <div>Loading...</div>;
}
console.log(product);


    return (
        <div>
            
        </div>
    );
};

export default ProductDetails;