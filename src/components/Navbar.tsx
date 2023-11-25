import React, { useState } from 'react';
import {
 FaShoppingCart, FaUser, FaBars, FaTimes,
} from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../store/store';

export default function Navbar() {
  const products = useAppSelector((state) => state.cartItems.products);
  const [mobileNav, setMobileNav] = useState(false);

  function handleNavClick() {
    if (mobileNav) setMobileNav(false);
  }

  return (
    <nav className="h-20 absolute top-0 w-full z-50 left-0 flex justify-between items-center font-semibold text-xl px-10 bg-zinc-800 text-gray-50">
      <div>
        <Link to="/">e-commerce</Link>
      </div>
      <ul className={mobileNav
        ? 'mobile-nav mobile-nav-active'
        : 'mobile-nav'}
      >
        <li>
          <Link to="/" onClick={() => handleNavClick()}>Home</Link>
        </li>
        <li>
          <Link to="allproducts" onClick={() => handleNavClick()}>Todos</Link>
        </li>
        <li>
          <Link to="categories" onClick={() => handleNavClick()}>Categorias</Link>
        </li>
        <li>
          <Link to="account" onClick={() => handleNavClick()}><FaUser /></Link>
        </li>
        <li>
          <Link className="flex" to="cart" onClick={() => handleNavClick()}>
            <FaShoppingCart />
            <span className="text-sm top-0 ml-1">{products.length}</span>
          </Link>
        </li>
      </ul>
      <button
        className="md:hidden"
        onClick={() => setMobileNav((prev) => !prev)}
      >
        {mobileNav ? <FaTimes /> : <FaBars />}
      </button>
    </nav>
  );
}
