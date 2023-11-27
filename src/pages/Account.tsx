import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAppDispatch, useAppSelector } from '../store/store';
import { createUser } from '../store/features/user-slice';
import { UserType } from '../interfaces';

type CreatePaymentFormData = z.infer<typeof createPaymentFormSchema>;

const createPaymentFormSchema = z.object({
  name: z.string().min(1, 'O nome é obrigatório'),
  email: z.string().min(1, 'O e-mail é obrigatório').email('Formato de e-mail inválido'),
  city: z.string().min(1, 'A cidade é obrigatória'),
  postalCode: z.coerce.number().int().gte(10000000, 'O CEP precisa ter 8 caracteres').lte(99999999, 'O CEP precisa ter 8 caracteres'),
  address: z.string().min(1, 'O endereço é obrigatório'),
  country: z.string().min(1, 'O país é obrigatória'),
});

export default function Account() {
  const dispatch = useAppDispatch();
  const orderData = useAppSelector((state) => state.order);

  const { register, handleSubmit, formState: { errors } } = useForm<CreatePaymentFormData>({
    resolver: zodResolver(createPaymentFormSchema),
  });

  function saveUser(data: UserType) {
    dispatch(createUser(data));
  }

  return (
    <div className="bg-zinc-200 pb-7 mt-20 min-h-screen">
      <div className="grid grid-cols-1 gap-10 pt-10 px-0 md:px-10 md:grid-cols-[1.3fr_0.7fr]">
        <div className="bg-zinc-50 p-7 rounded-lg">
          <h2 className="text-3xl">Pedidos</h2>
          {orderData.orders.map((item) => (
            <div>
              <div className="grid grid-cols-2 my-2">
                <div className="text-zinc-500">
                  <div className="text-zinc-950 text-lg font-medium">{item.orderTime?.toString()}</div>
                  <div>{item.name}</div>
                  <div>{item.email}</div>
                  <div>{item.address}</div>
                  <div className="flex">
                    <div>{item.city}</div>
                    <span>,</span>
                    <div className="ml-1">{item.country}</div>
                  </div>
                </div>
                <div>
                  {item.products.map((product) => (
                    <div className="flex gap-1 text-zinc-400">
                      <div>{product.amout}</div>
                      <span>x</span>
                      <div className="text-zinc-950 font-semibold">{product.product.title}</div>
                    </div>
                ))}
                </div>
              </div>
              <div className="h-[2px] bg-zinc-300" />
            </div>
            ))}
        </div>
        <form
          className="bg-zinc-50 p-7 rounded-lg max-h-[700px]"
          onSubmit={handleSubmit(saveUser)}
        >
          <h2 className="font-extrabold text-2xl mb-3">Detalhes da Conta</h2>
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
          <button className="h-9 w-full font-semibold rounded-lg bg-zinc-950 text-zinc-50 btn-animation">
            Salvar
          </button>
        </form>
      </div>
    </div>
  );
}
