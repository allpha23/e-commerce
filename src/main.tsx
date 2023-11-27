import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import App from './App';
import './styles/globals.css';
import { store, persistor } from './store/store';
import Home from './pages/Home';
import Cart from './pages/Cart';
import AllProducts from './pages/AllProducts';
import ProductPage from './pages/ProductPage';
import Categories from './pages/Categories';
import Account from './pages/Account';
import CategoryPage from './pages/CategoryPage';
import Payment from './pages/Payment';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: 'product/:id',
        element: <ProductPage />,
      },
      {
        path: 'allproducts',
        element: <AllProducts />,
      },
      {
        path: 'categories',
        element: <Categories />,
      },
      {
        path: 'category/:id',
        element: <CategoryPage />,
      },
      {
        path: 'account',
        element: <Account />,
      },
      {
        path: 'cart',
        element: <Cart />,
      },
      {
        path: 'cart/payment',
        element: <Payment />,
      },
    ],
  },
], { basename: '/e-commerce' });

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RouterProvider router={router} />
      </PersistGate>
    </Provider>
  </React.StrictMode>,
);
