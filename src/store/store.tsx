import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { CartReducer } from './features/cart-slice';
import { UserReducer } from './features/user-slice';
import { OrderReducer } from './features/order-slice';

const persistConfig = {
  key: 'root',
  storage,
};

const rootReducer = combineReducers({
  cartItems: CartReducer,
  user: UserReducer,
  order: OrderReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
});

const persistor = persistStore(store);

export const useAppDispatch:() => typeof store.dispatch = useDispatch;
export const useAppSelector:TypedUseSelectorHook<ReturnType<typeof store.getState>> = useSelector;
export { store, persistor };
