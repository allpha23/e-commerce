import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaCheck } from 'react-icons/fa';

export default function Payment() {
  const navigate = useNavigate();

  return (
    <div className="bg-zinc-200 mt-20 min-h-screen px-10 py-7 flex flex-col items-center text-center">
      <div className="h-24 w-24 rounded-[50%] bg-green-500 flex justify-center items-center text-zinc-50">
        <FaCheck className="w-full h-full p-5" />
      </div>
      <h2 className="text-2xl font-bold my-4">Compra Realizada com sucesso!</h2>
      <p className="text-zinc-500 pb-5">Para acompanhar seus pedidos, acesse a área do usuário abaixo </p>
      <button
        className="h-9 px-5 font-semibold rounded-lg bg-zinc-950 text-zinc-50 btn-animation"
        onClick={() => navigate('/account')}
      >
        minha conta
      </button>
    </div>
  );
}
