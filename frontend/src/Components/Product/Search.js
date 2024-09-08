import React, { useState } from "react";
import {useNavigate} from "react-router-dom";
import { FaFilter } from "react-icons/fa";

const Search = ({setOpen}) => {
  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate();
  const searchSumbitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/products/${keyword}`);
    } else {
      navigate("/products");
    }

    
  };
  return (
    <form
      class="flex items-center max-w-lg mx-8 sm:mx-auto md:mx-auto lg:mx-auto"
      onClick={searchSumbitHandler}
    >

      <div class="relative w-full">
        <div onClick={()=>setOpen(!false)} class="absolute inset-y-0 start-0 flex items-center ps-3 cursor-pointer">
        <FaFilter className="text-gray-500"/>
        </div>
        <input
          type="text"
          id="simple-search"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-l-lg cur focus:ring-blue-500 focus:border-blue-500 block w-full  py-[16px] lg:py-[20px]  pl-12  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Search product name..."
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          required
        />
      </div>
      <button
        type="submit"
        class="px-8 py-[18px] lg:py-[22px] text-sm font-medium text-white bg-indigo-700 rounded-r-lg border border-indigo-600 hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-indigo-200 dark:bg-indigo-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        <svg
          class="w-4 h-4"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 20 20"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
          />
        </svg>
      </button>
    </form>
  );
};

export default Search;
