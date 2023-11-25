import React from 'react';
import { FaLongArrowAltRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import useAxios from '../hooks/use-axios';
import axiosInstance from '../helper/axios-instance';
import ProductCard from './ProductCard';
import { ProductType } from '../interfaces';

type CategoryWrapperType = {
  id: string
};

export default function CategoryWrapper({ id }: CategoryWrapperType) {
  const url = `/category/${id}`;
  const [category1, loading] = useAxios({
    axiosInstance,
    url: `sites/MLB/search?seller_id=230474128&category=${id}`,
    othersConfig: { params: { limit: 3 } },
  });

  return (
    <div className="grid grid-cols-2 gap-7 py-7 md:grid-cols-4">
      {!loading && category1.results.map((product: ProductType) => (
        <div key={product.id}>
          <ProductCard
            title={product.title}
            thumbnail={product.thumbnail}
            price={product.price}
            id={product.id}
          />
        </div>
      ))}
      <Link to={url} className="h-full flex text-base px-4 justify-center items-center bg-zinc-300 rounded-lg md:text-xl">
        Todos
        <FaLongArrowAltRight className="ml-2" />
      </Link>
    </div>
  );
}
