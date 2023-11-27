/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { OrderType } from '../../interfaces';

type OrderState = {
  orders: OrderType[]
};

const initialState: OrderState = {
  orders: [],
};

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    addOrder: (state, action: PayloadAction<OrderType>) => {
      state.orders.push({
        ...action.payload,
      });
    },
  },
});

export const OrderReducer = orderSlice.reducer;

export const { addOrder } = orderSlice.actions;
