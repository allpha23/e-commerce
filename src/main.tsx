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
        path: 'cart',
        element: <Cart />,
      },
      {
        path: 'allproducts',
        element: <AllProducts />,
      },
      {
        path: 'product/:id',
        element: <ProductPage />,
      },
      {
        path: 'categories',
        element: <Categories />,
      },
      {
        path: 'account',
        element: <Account />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RouterProvider router={router} />
      </PersistGate>
    </Provider>
  </React.StrictMode>,
);
