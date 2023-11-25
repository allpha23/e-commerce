import React from 'react';
import { Link } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa';
import { useAppDispatch } from '../store/store';
import { addTocart } from '../store/features/cart-slice';
import { ProductType } from '../interfaces';

export default function ProductCard({
  title, thumbnail, price, id,
}: ProductType) {
  const url = `/product/${id}`;
  const dispatch = useAppDispatch();

  function addProductToCart() {
    dispatch(addTocart({
      product: {
        id,
        title,
        thumbnail,
        price,
      },
      amout: +1,
    }));
  }

  return (
    <div>
      <Link to={url} className="h-40 mb-2 flex justify-center items-center rounded-lg bg-zinc-100">
        <img className="h-32 max-w-full mix-blend-multiply" src={thumbnail} alt={title} />
      </Link>
      <div className="min-h-[71px]">
        <Link to={url} className="font-normal">{title}</Link>
      </div>
      <div className="mb-1 flex justify-between items-center">
        <span className="font-bold text-lg md:text-xl">
          R$
          {price.toFixed(2)}
        </span>
      </div>
      <button
        className="h-8 w-full flex justify-center items-center text-sm text-bold rounded-lg border-2 border-green-700 text-green-700 px-1 duration-300 active:scale-90 md:text-sm md:px-2"
        onClick={addProductToCart}
      >
        <FaShoppingCart className="mr-1" />
        Comprar
      </button>
    </div>
  );
}
