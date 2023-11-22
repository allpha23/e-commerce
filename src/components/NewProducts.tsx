import React from 'react';
import useAxios from '../hooks/use-axios';
import axiosInstance from '../helper/axios-instance';
import ProductCard from './ProductCard';
import { ProductType } from '../interfaces';

export default function NewProducts() {
  const [products] = useAxios({
    axiosInstance,
    url: 'sites/MLB/search?seller_id=230474128',
    othersConfig: { params: { limit: 12 } },
  });

  return (
    <div className="bg-zinc-200 px-10 py-7">
      <h2 className="text-3xl font-bold">Acabaram de Chegar</h2>
      <div className="grid grid-cols-2 gap-7 pt-7 md:grid-cols-4">
        {products?.results.length > 0 && products.results.map((product: ProductType) => (
          <div key={product.id}>
            <ProductCard
              title={product.title}
              thumbnail={product.thumbnail}
              price={product.price}
              id={product.id}
            />
          </div>
      ))}
      </div>
    </div>
  );
}
