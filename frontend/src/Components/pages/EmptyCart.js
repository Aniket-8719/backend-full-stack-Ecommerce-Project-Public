import React from 'react';
import { Link } from 'react-router-dom';

const EmptyCart = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="text-center p-8 bg-white rounded shadow-md">
        <svg
          className="mx-auto h-12 w-12 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M3 3h18l-1 9H4L3 3zM5 21h14a2 2 0 002-2V7H3v12a2 2 0 002 2z"
          />
        </svg>
        <h2 className="mt-4 text-xl font-semibold text-gray-800">Your cart is empty</h2>
        <p className="mt-2 mb-4 text-gray-600">Add items to your cart to see them here.</p>
        <Link to={"/products"} className="mt-2 text-blue-600">View Product</Link>
      </div>
    </div>
  );
};

export default EmptyCart;
