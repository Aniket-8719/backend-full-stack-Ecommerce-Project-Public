import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addItemsToCart, removeItemsFromCart } from "../../actions/cartAction";
import { IoMdClose } from "react-icons/io";
import EmptyCart from "../pages/EmptyCart";
import { Link, useNavigate } from "react-router-dom";

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);

  const increaseQuantity = (id, quantity, Stock, event) => {
    event.preventDefault();
    if (Stock <= quantity) return;
    const Newqty = quantity + 1;

    dispatch(addItemsToCart(id, Newqty));
  };

  const decreaseQuantity = (id, quantity, event) => {
    event.preventDefault();
    const Newqty = quantity - 1;
    if (1 >= quantity) return;
    dispatch(addItemsToCart(id, Newqty));
  };

  const removeItem = (id) => {
    dispatch(removeItemsFromCart(id));
  };

  const checkOutHandler = () => {
    navigate("/shipping");
  };

  return (
    <>
      {cartItems.length == 0 ? (
        <EmptyCart />
      ) : (
        <div className="bg-white mt-8">
          <div className="max-w-2xl mx-auto pt-16 pb-24 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
            <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Shopping Cart
            </h1>
            <div className="mt-12 lg:grid lg:grid-cols-12 lg:gap-x-12 lg:items-start xl:gap-x-16">
              <section aria-labelledby="cart-heading" className="lg:col-span-7">
                <h2 id="cart-heading" className="sr-only">
                  Items in your shopping cart
                </h2>

                {cartItems &&
                  cartItems.map((item) => (
                    <ul
                      id={item.product}
                      role="list"
                      className="border-t border-b border-gray-200 divide-y divide-gray-200"
                    >
                      <li className="flex py-6 sm:py-10">
                        <div className="flex-shrink-0 max-w-[100px] max-h-[200px] sm:max-w-[150px] sm:max-h-[250px]">
                          <img
                            src={item.image}
                            className="w-full h-full rounded-md object-center object-cover "
                          />
                        </div>

                        <div className="ml-4 flex-1 flex flex-col justify-between sm:ml-6">
                          <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
                            <div>
                              <div className="flex justify-between">
                                <h3 className="text-sm">
                                  <a
                                    href="#"
                                    className="font-medium text-gray-700 hover:text-gray-800"
                                  >
                                    {item.name}
                                  </a>
                                </h3>
                              </div>
                              <div className="mt-1 flex text-sm">
                                <p className="text-gray-500">Sienna</p>

                                <p className="ml-4 pl-4 border-l border-gray-200 text-gray-500">
                                  Large
                                </p>
                              </div>

                              <div className="flex justify-between items-center -mb-2 mt-4 ">
                                <div>
                                  <h1 className="mt-1 text-sm font-medium text-gray-900">
                                    Original Price:
                                  </h1>
                                  <p className="mt-1 text-sm  text-gray-900">{`₹${item.price}`}</p>
                                </div>
                                <div>
                                  <h1 className="mt-1 text-sm font-medium text-gray-900">
                                    Total
                                  </h1>
                                  <p className="mt-1 text-sm  text-gray-900">{`₹${
                                    item.price * item.quantity
                                  }`}</p>
                                </div>
                              </div>
                            </div>

                            <div className="mt-4 sm:mt-0 sm:pr-9">
                              <label for="quantity-0" className="sr-only">
                                Quantity, Basic Tee
                              </label>
                              <div className="detailsBlock-3-1-1 flex items-center">
                                <button
                                  onClick={(e) =>
                                    decreaseQuantity(
                                      item.product,
                                      item.quantity,
                                      e
                                    )
                                  }
                                  className="text-sm lg:text-base px-2 py-1  bg-slate-300 "
                                >
                                  -
                                </button>
                                <input
                                  className="text-sm lg:text-base w-16 h-8 text-center border border-gray-300"
                                  readOnly
                                  type="number"
                                  value={item.quantity}
                                />
                                <button
                                  onClick={(e) =>
                                    increaseQuantity(
                                      item.product,
                                      item.quantity,
                                      item.stock,
                                      e
                                    )
                                  }
                                  className="text-sm lg:text-base px-2 py-1  bg-slate-300  "
                                >
                                  +
                                </button>
                              </div>

                              <div className="absolute top-0 right-0">
                                <button
                                  onClick={() => removeItem(item.product)}
                                  type="button"
                                  className="-m-2 p-2 inline-flex text-gray-400 hover:text-gray-500"
                                >
                                  <IoMdClose className="text-xl text-red-400" />
                                </button>
                              </div>
                            </div>
                          </div>

                          <p className="mt-4 flex text-sm text-gray-700 space-x-2">
                            {/* <!-- Heroicon name: solid/check --> */}
                            <svg
                              className="flex-shrink-0 h-5 w-5 text-green-500"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                              aria-hidden="true"
                            >
                              <path
                                fill-rule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clip-rule="evenodd"
                              />
                            </svg>
                            <span>In stock</span>
                          </p>
                        </div>
                      </li>
                    </ul>
                  ))}
              </section>

              {/* <!-- Order summary --> */}
              <section
                aria-labelledby="summary-heading"
                className="mt-16 bg-gray-50 rounded-lg px-4 py-6 sm:p-6 lg:p-8 lg:mt-0 lg:col-span-5"
              >
                <h2
                  id="summary-heading"
                  className="text-lg font-medium text-gray-900"
                >
                  Order summary
                </h2>

                <dl className="mt-6 space-y-4">
                 
                  <div className="border-t border-gray-200 pt-4 flex items-center justify-between">
                    <dt className="text-base font-medium text-gray-900">
                      Order total
                    </dt>
                    <dd className="text-base font-medium text-gray-900">{`₹${cartItems.reduce(
                      (acc, item) => acc + item.quantity * item.price,
                      0
                    )}`}</dd>
                  </div>
                </dl>

                <div className="mt-6">
                  <button
                    type="submit"
                    onClick={checkOutHandler}
                    className="w-full  text-center bg-indigo-600  text-white rounded-smborder border-transparent rounded-sm shadow-sm py-3 px-4 text-base font-medium  hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-indigo-500"
                  >
                    Checkout
                  </button>
                </div>
              </section>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Cart;
