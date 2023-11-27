/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserType } from '../../interfaces';

const initialState: UserType = {
  name: '',
  email: '',
  address: '',
  postalCode: undefined,
  city: '',
  country: '',
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    createUser: (state, action: PayloadAction<UserType>) => ({
        ...state,
        ...action.payload,
    }),
    deleteUser: (state) => ({
      ...state,
      ...initialState,
    }),
  },
});

export const UserReducer = userSlice.reducer;

export const { createUser } = userSlice.actions;
