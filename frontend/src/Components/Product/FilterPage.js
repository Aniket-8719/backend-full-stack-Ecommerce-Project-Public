// FilterPage.js

import React from "react";
import { VscClose } from "react-icons/vsc";
import Slider from "@material-ui/core/Slider"
import Typography from "@material-ui/core/Typography"

const FilterPage = ({ open, setOpen , priceRange , setPriceRange, category, setCategory,ratings, setRatings}) => {

  const priceHandler = (event, newPrice)=>{
    setPriceRange(newPrice);
  }

  // Function to handle filter changes
  const handleFilterChange = (filterType, value) => {
    switch (filterType) {
      case "category":
        setCategory(value);
        break;
      case "ratings":
        setRatings(value);
        break;
      default:
        break;
    }
  };

  return (
    <div
      className={`container  mx-auto  p-4 fixed left-0 top-0 pt-4 z-50 bg-white shadow-md max-w-[70%] md:max-w-[25%] h-full overflow-y-auto transition-all duration-500 ease-in-out ${
        open ? "left-0" : "left-[-490px]"
      }`}
    >
      <div className="flex justify-between ">
        <h1 className="text-2xl font-bold mb-4">Filter</h1>
        <div onClick={() => setOpen(false)} className="text-4xl cursor-pointer">
          <VscClose />
        </div>
      </div>
      <div className="flex flex-col w-full gap-4">
        {/* Price Range */}
        <div className="flex flex-col">
          <Typography>Price</Typography>
          <Slider
          value={priceRange}
          onChange={priceHandler}
          valueLabelDisplay="auto"
          aria-labelledby="range-slider"
          min={0}
          max={250000}
          />
            
          
         
        </div>

        {/* Category */}
        <div className="flex flex-col">
          <label htmlFor="category" className="mb-2">
            Category:
          </label>
          <select
            id="category"
            className="border p-2 rounded-md border-gray-500"
            value={category}
            onChange={(e) => handleFilterChange("category", e.target.value)}
          >
            <option value="">All</option>
            <option value="Books">Fashion</option>
            <option value="Books">Books</option>
            <option value="Laptop">Laptop</option>
            <option value="Kitchen">Kitchen</option>
            <option value="Footwear">Footwear</option>
            <option value="Camera">Camera</option>
            <option value="Attire">Attire</option>
            <option value="Electronics">Electronics</option>
            <option value="SmartPhones">SmartPhones</option>
          </select>
        </div>

        {/* Ratings Range */}
        <div className="flex flex-col">
          <label htmlFor="ratings" className="mb-2">
            Ratings Range:
          </label>
          <select
            id="ratings"
            className="border p-2 rounded-md border-gray-500"
            value={ratings}
            onChange={(e) => handleFilterChange("ratings", e.target.value)}
          >
            <option value="0">All</option>
            <option value="1">1 Star & Above</option>
            <option value="2">2 Stars & Above</option>
            <option value="3">3 Stars & Above</option>
            <option value="4">4 Stars & Above</option>
            <option value="5">5 Stars</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default FilterPage;
