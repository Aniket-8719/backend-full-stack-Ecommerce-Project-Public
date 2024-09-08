import React from 'react';
import { Link } from 'react-router-dom';
import ReactStars from "react-rating-stars-component";

const ProductCard = ({product}) => {
  const options ={
    edit: false,
    color: "rgba(20,20,20,0.1)",
    activeColor: "tomato",
    size: window.innerWidth < 600 ? 20 : 25,
    value: product.ratings,
    isHalf: true,
}
  return (
    <Link to={`/product/${product._id}`}>
      <div className="w-full max-w-sm bg-white  rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 hover:shadow-lg hover:-translate-y-1 ease-in duration-100 border-gray-300 border">
        <div className="bg-slate-100 h-64 flex items-center justify-center rounded-t-lg">
          <img className="w-full p-4 h-full object-cover" src={product.images[0].url} alt={product.name} />
        </div>
        <div className="px-5 py-5">
          <a href="/">
            <h5 className="text-xl font-semibold tracking-tight text-gray-900 text-left dark:text-white">
              {product.name}
            </h5>
          </a>
          {/* <p>{product._id}</p> */}
          {/* <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p> */}
          <div className="flex items-center  mb-5">
            <div className="flex items-center space-x-1 rtl:space-x-reverse">
              <ReactStars {...options} /> <span>({product.numOfReviews} Reviews)</span>
            </div>
            <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-bg-indigo-600 ml-3">
              {product.ratings.toFixed(2)}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-3xl font-bold text-gray-900 dark:text-white">
              {`₹${product.price}`}
            </span>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default ProductCard
