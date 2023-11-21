import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Product {
  id: string,
  title: string,
  thumbnail: string,
  price: number,
}

interface CartProduct {
  product: Product,
  amout: number,
}

type ProductId = {
  id: string
};

interface ProductState {
  products: CartProduct[]
}

const initialState: ProductState = {
  products: [],
};

export const CartSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    addTocart: (state, action: PayloadAction<CartProduct>) => {
      const cartItem = state.products.find(
        (products) => products.product.id === action.payload.product.id,
      );
      if (!cartItem) {
        state.products.push({
          product: {
            id: action.payload.product.id,
            title: action.payload.product.title,
            thumbnail: action.payload.product.thumbnail,
            price: action.payload.product.price,
          },
          amout: action.payload.amout,
        });
      } else {
        cartItem.amout += 1;
      }
    },
    increase: (state, action: PayloadAction<ProductId>) => {
      const cartItem = state.products.find((item) => item.product.id === action.payload.id);
      if (cartItem) cartItem.amout += 1;
    },
    decrease: (state, action: PayloadAction<ProductId>) => {
      const cartItem = state.products.find((item) => item.product.id === action.payload.id);
      if (cartItem) cartItem.amout += -1;
    },
    remove: (state, action: PayloadAction<ProductId>) => {
      const teste = state;
      teste.products = state.products.filter((item) => item.product.id !== action.payload.id);
    },
    clear: (state) => {
      const cartState = state;
      cartState.products = [];
    },
  },
});

export const CartReducer = CartSlice.reducer;

export const {
  addTocart, increase, decrease, remove, clear,
} = CartSlice.actions;
