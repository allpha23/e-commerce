import React, { useState } from 'react';
import { FaShoppingCart, FaUser, FaBars } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../store/store';

export default function Navbar() {
  const products = useAppSelector((state) => state.cartItems.products);
  const [mobileNav, setMobileNav] = useState(false);

  return (
    <nav className="h-20 flex justify-between items-center font-semibold text-xl px-10 bg-zinc-800 text-gray-50">
      <div>
        <Link to="/">e-commerce</Link>
      </div>
      <ul className={mobileNav
        ? 'mobile-nav-active'
        : 'mobile-nav'}
      >
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="allproducts">Todos</Link>
        </li>
        <li>
          <Link to="categories">Categorias</Link>
        </li>
        <li>
          <Link to="account"><FaUser /></Link>
        </li>
        <li>
          <Link className="flex" to="cart">
            <FaShoppingCart />
            <span className="text-sm top-0 ml-1">{products.length}</span>
          </Link>
        </li>
      </ul>
      <button
        className="md:hidden"
        onClick={() => setMobileNav((prev) => !prev)}
      >
        <FaBars />
      </button>
    </nav>
  );
}
