import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAppSelector, useAppDispatch } from '../store/store';
import {
  increase, decrease, remove, clear,
} from '../store/features/cart-slice';
import { ProductType } from '../interfaces';

type CreatePaymentFormData = z.infer<typeof createPaymentFormSchema>;

const createPaymentFormSchema = z.object({
  name: z.string().min(1, 'O nome é obrigatório'),
  email: z.string().min(1, 'O e-mail é obrigatório').email('Formato de e-mail inválido'),
  city: z.string().min(1, 'A cidade é obrigatória'),
  postalCode: z.coerce.number().int().gte(10000000, 'O CEP precisa ter 8 caracteres').lte(99999999, 'O CEP precisa ter 8 caracteres'),
  address: z.string().min(1, 'O endereço é obrigatório'),
  country: z.string().min(1, 'O país é obrigatória'),
});

export default function Cart() {
  const { register, handleSubmit, formState: { errors } } = useForm<CreatePaymentFormData>({
    resolver: zodResolver(createPaymentFormSchema),
  });
  const products = useAppSelector((state) => state.cartItems.products);
  const dispatch = useAppDispatch();
  let total = 0;
  products.forEach((item) => {
    total += item.product.price * item.amout;
  });

  function increaseAmout(product: ProductType) {
    dispatch(increase(product));
  }

  function decreaseAmout(product: ProductType, amout: number) {
    if (amout > 1) dispatch(decrease(product));
    else dispatch(remove(product));
  }

  function createPayment(data: any) {
    console.log(data);
  }

  function clearCart() {
    dispatch(clear());
  }

  return (
    <div className="bg-zinc-200 pb-7 min-h-screen">
      <div className="grid grid-cols-1 gap-10 pt-10 px-10 md:grid-cols-[1.3fr_0.7fr]">
        <div className="bg-zinc-50 p-7 rounded-lg">
          <h2 className="font-extrabold text-3xl">Carrinho</h2>
          {!products?.length && (
            <div className="mt-2">Seu carrinho está vazio...</div>
          )}
          {!!products?.length && (
            <table className="w-full mt-2">
              <thead>
                <tr>
                  <th>PRODUTO</th>
                  <th>QUANTIDADE</th>
                  <th className="text-center">PREÇO</th>
                </tr>
              </thead>
              <tbody>
                {products.map((el) => (
                  <tr key={el.product.id}>
                    <td>
                      <img
                        className="max-h-[90px] max-w-[90px]"
                        src={el.product.thumbnail}
                        alt={el.product.title}
                      />
                      <div>
                        {el.product.title}
                      </div>
                    </td>
                    <td>
                      <button
                        className="bg-zinc-300 h-7 px-3 rounded-md"
                        onClick={() => increaseAmout(el.product)}
                      >
                        +
                      </button>
                      <span className="px-3 py-1 block">
                        {el.amout}
                      </span>
                      <button
                        className="bg-zinc-300 h-7 px-3 rounded-md"
                        onClick={() => decreaseAmout(el.product, el.amout)}
                      >
                        -
                      </button>
                    </td>
                    <td className="text-center">
                      R$
                      {(el.product.price * el.amout).toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
          <div className="flex justify-between mt-3">
            <div className="font-bold text-xl">Total</div>
            <span className="font-semibold text-lg">
              R$
              {total.toFixed(2)}
            </span>
          </div>
          <div className="text-center mt-3">
            <button
              className="h-9 px-4 font-semibold rounded-lg border-2 border-red-500 text-red-500"
              onClick={clearCart}
            >
              Limpar carrinho
            </button>
          </div>
        </div>
        {!!products?.length && (
        <form
          className="bg-zinc-50 p-7 rounded-lg max-h-[550px]"
          onSubmit={handleSubmit(createPayment)}
        >
          <h2 className="font-extrabold text-3xl mb-3">Informações do Pedido</h2>
          {errors.name && <span className="text-red-500">{errors.name.message}</span>}
          <input
            className="card-input"
            type="text"
            placeholder="Name"
            {...register('name')}
          />
          {errors.email && <span className="text-red-500">{errors.email.message}</span>}
          <input
            className="card-input"
            type="email"
            placeholder="Email"
            {...register('email')}
          />
          <div className="flex items-end gap-2">
            <div>
              {errors.city && <span className="text-red-500">{errors.city.message}</span>}
              <input
                className="card-input"
                type="text"
                placeholder="Cidade"
                {...register('city')}
              />
            </div>
            <div>
              {errors.postalCode && <span className="text-red-500">{errors.postalCode.message}</span>}
              <input
                className="card-input"
                type="text"
                placeholder="Codigo Postal"
                {...register('postalCode')}
              />
            </div>
          </div>
          {errors.address && <span className="text-red-500">{errors.address.message}</span>}
          <input
            className="card-input"
            type="text"
            placeholder="Endereço"
            {...register('address')}
          />
          {errors.country && <span className="text-red-500">{errors.country.message}</span>}
          <input
            className="card-input"
            type="text"
            placeholder="País"
            {...register('country')}
          />
          <button className="h-9 w-full font-semibold rounded-lg bg-zinc-950 text-zinc-50">Continuar Para o Pagamento</button>
        </form>
      )}
      </div>
    </div>
  );
}
