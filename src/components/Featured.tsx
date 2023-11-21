import React from 'react';
import { FaShoppingCart } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import notebookImg from '../assets/img/notebook.png';
import { useAppDispatch } from '../store/store';
import { addTocart } from '../store/features/cart-slice';

export default function Featured() {
  const url = '/product/MLB3856687462';
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  function addFeaturedToCart() {
    dispatch(addTocart({
      product: {
        id: 'MLB3856687462',
        title: 'Notebook Ultrafino Ideapad',
        thumbnail: notebookImg,
        price: 2569,
      },
      amout: +1,
    }));
  }

  return (
    <div className="grid grid-cols-1 gap-5 p-20 bg-zinc-800 text-gray-50 md:grid-cols-2">
      <div className="order-2 md:order-1">
        <h1 className="font-bold text-4xl">Notebook Ultrafino Ideapad</h1>
        <p className="my-3 text-gray-300">
          O notebook Lenovo Linux Lenovo foi projetado para tornar sua vida mais fácil.
          Seu design elegante e inovador e sua comodidade para transportá-lo,
          farão com que seja seu PC favorito. Qualquer tarefa que você proponha,
          seja em casa ou na oficina,
          você fará isso com facilidade graças ao seu poderoso desempenho.
        </p>
        <div className="flex gap-3">
          <button
            className="h-9 text-xs font-semibold rounded-lg border-2 px-3 md:text-sm"
            onClick={() => navigate(url)}
          >
            Ler mais
          </button>
          <button
            className="h-9 text-sm font-semibold rounded-lg bg-gray-50 text-zinc-950 px-3"
            onClick={addFeaturedToCart}
          >
            <FaShoppingCart className="inline-block mr-2 mb-1" />
            Add ao carrinho
          </button>
        </div>
      </div>
      <div className="flex justify-center order-1 md:order-2">
        <img className="w-96 max-h-72" src={notebookImg} alt="notebook ultrafino" />
      </div>
    </div>
  );
}
