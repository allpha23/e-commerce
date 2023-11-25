import React from 'react';
import { useParams } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa';
import useAxios from '../hooks/use-axios';
import axiosInstance from '../helper/axios-instance';
import ProductImages from '../components/ProductImages';
import { useAppDispatch } from '../store/store';
import { addTocart } from '../store/features/cart-slice';

export default function ProductPage() {
  const { id } = useParams();
  const [product] = useAxios({
    axiosInstance,
    url: `items/${id}`,
  });

  const [description] = useAxios({
    axiosInstance,
    url: `items/${id}/description`,
  });

  const dispatch = useAppDispatch();

  function addProductToCart() {
    dispatch(addTocart({
      product: {
        id: product.id,
        title: product.title,
        thumbnail: product.thumbnail,
        price: product.price,
      },
      amout: +1,
    }));
  }

  return (
    <div className="bg-zinc-200 pb-8">
      {product && (
        <div className="grid grid-cols-1 gap-10 pt-10 px-10 mt-20 md:grid-cols-[0.8fr_1.2fr]">
          <div className="flex items-center bg-zinc-50 p-7 rounded-lg min-h-[500px] max-h-[700px]">
            <ProductImages images={product.pictures} />
          </div>
          <div className="p-7">
            <h2 className="font-extrabold text-2xl mb-3">{product.title}</h2>
            <p className="mb-4">{description?.plain_text}</p>
            <div className="flex gap-5 items-center">
              <span className="font-semibold text-2xl">
                R$
                {(product.price).toFixed(2)}
              </span>
              <button
                className="h-9 flex items-center gap-1 px-4 font-semibold rounded-lg bg-green-900 text-zinc-50"
                onClick={addProductToCart}
              >
                <FaShoppingCart />
                Add ao corrinho
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
