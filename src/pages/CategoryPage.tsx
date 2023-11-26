import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import useAxios from '../hooks/use-axios';
import axiosInstance from '../helper/axios-instance';
import { ProductType } from '../interfaces';
import ProductCard from '../components/ProductCard';
import Pagination from '../components/Pagination';

const LIMIT = 12;

export default function CategoryPage() {
  const { id } = useParams();
  const [offset, setOffset] = useState(0);
  const [sort, setSort] = useState('');

  const [products, loading] = useAxios({
    axiosInstance,
    url: `sites/MLB/search?seller_id=230474128&category=${id}&sort=${sort}`,
    othersConfig: { params: { limit: LIMIT, offset } },
  });

  return (
    <div className="bg-zinc-200 min-h-screen px-10 py-7 mt-20">
      <div className="flex justify-between">
        <h2 className="text-3xl font-bold">{products?.filters[0].values[0].name}</h2>
        <select
          className="bg-zinc-300 px-4 appearance-none rounded-lg max-h-9"
          name="sort"
          id="sort"
          onChange={(e) => setSort(e.target.value)}
        >
          <option value="" selected>Ordenar</option>
          <option value="price_asc">Menor preço</option>
          <option value="price_desc">Maior preço</option>
        </select>
      </div>
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
