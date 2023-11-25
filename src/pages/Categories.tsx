import React from 'react';
import useAxios from '../hooks/use-axios';
import axiosInstance from '../helper/axios-instance';
import CategoryWrapper from '../components/CategoryWrapper';

type FilterType = {
  id: string,
  name: string,
  type: string,
  values: []
};

type CategoryType = {
  id: string,
  name: string,
  results: number,
};

export default function Categories() {
  const [categories, loading] = useAxios({
    axiosInstance,
    url: 'sites/MLB/search?seller_id=230474128',
    othersConfig: { params: { limit: 3 } },
  });

  return (
    <div className="bg-zinc-200 min-h-screen">
      <div className="py-7 px-10 mt-20">
        {!loading && categories.available_filters
          .find((filter: FilterType) => filter.id === 'category')
          .values.map((category: CategoryType) => (
            <div key={category.id}>
              <h2 className="text-3xl font-bold">{category.name}</h2>
              <CategoryWrapper id={category.id} />
            </div>
        ))}
      </div>
    </div>
  );
}
