import React, { useEffect, useState } from "react";
import { getProduct } from "../../actions/productAction";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import Loader from "../Layouts/Loader";
import ProductCard from "../Home/ProductCard";
import Search from "./Search";
import FilterPage from "./FilterPage";
import Pagination from "react-js-pagination";
import MetaData from "../Layouts/MetaData";

const Products = () => {
  
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [priceRange, setPriceRange] = useState([0, 250000]);
  const [category, setCategory] = useState("");
  const [ratings, setRatings] = useState(0);
  const { products, productsCount, resultPerPage, error, loading } =
  useSelector((state) => state.products);
  const { keyword } = useParams();
  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
  };
  useEffect(() => {
    dispatch(getProduct(keyword, currentPage, priceRange, category,ratings));
  }, [dispatch, keyword, currentPage, priceRange, category,ratings]);
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
        <MetaData title="PRODUCTS -- ECOMMERCE"/>
          <div className="mb-16"> 
            <div className="mt-[150px]">
              <Search setOpen={setOpen} /> 
            </div>  
            <div>
              <FilterPage
                open={open}
                setOpen={setOpen}
                priceRange={priceRange}
                setPriceRange={setPriceRange}
                category={category}
                setCategory={setCategory}
                ratings={ratings}
                setRatings={setRatings}
              />
            </div>
            <div className="mt-24">
            <h1
            className="text-left text-4xl 
        sm:text-5xl mx-4 md:mx-auto  lg:max-w-[1400px] md:max-w-[900px]
        lg:text-5xl mt-16
        font-semibold mb-8 border-b-2 border-gray-500 m-auto p-[1vmax]"
          >
            All Products
           
          </h1>
            </div>
            <div
              className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-8 items-center justify-center px-8  mx-auto md:mx-auto lg:max-w-[1400px] md:max-w-[900px]"
              id="container"
            >
              {products &&
                products.map((product) => <ProductCard product={product} />)}
            </div>
          

          {/* pagination */}
          {productsCount > resultPerPage && (
            <div className="flex justify-center m-[6vmax]">
              <Pagination
                activePage={currentPage}
                itemsCountPerPage={resultPerPage}
                totalItemsCount={productsCount}
                onChange={setCurrentPageNo}
                nextPageText="Next"
                prevPageText="Prev"
                firstPageText="1st"
                lastPageText="Last"
                itemClass="page-item"
                linkClass="page-link"
                activeClass="pageItemActive"
                activeLinkClass="pageLinkActive"
              />
            </div>
          )}
          </div>
        </>
      )}
    </>
  );
};

export default Products;
