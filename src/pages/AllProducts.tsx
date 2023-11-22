import React, { useState } from 'react';
import ProductCard from '../components/ProductCard';
import useAxios from '../hooks/use-axios';
import axiosInstance from '../helper/axios-instance';
import Pagination from '../components/Pagination';
import { ProductType } from '../interfaces';

const LIMIT = 12;

export default function AllProducts() {
  const [offset, setOffset] = useState(0);

  const [products, loading] = useAxios({
    axiosInstance,
    url: 'sites/MLB/search?seller_id=230474128',
    othersConfig: { params: { limit: LIMIT, offset } },
  });

  return (
    <div className="bg-zinc-200 px-10 py-7">
      <h2 className="text-3xl font-bold">Todos os produtos</h2>
      <div className="grid grid-cols-2 gap-7 pt-7 md:grid-cols-4">
        {!loading && products.results.map((product: ProductType) => (
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
      {products?.paging && (
        <Pagination
          limit={LIMIT}
          total={products.paging.total}
          offset={offset}
          setOffset={setOffset}
        />
      )}
    </div>
  );
}
