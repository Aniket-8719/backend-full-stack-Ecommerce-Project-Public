import ProductCard from "./ProductCard";
import Product1 from "../assests/productsImg/apple watch - Google Search_files/Apple_watch-experience-for-entire-family-hero_09152020_big.jpg.large.jpg";
import MetaData from "../Layouts/MetaData";
import React, { useEffect } from "react";
import { getProduct } from "../../actions/productAction";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../Layouts/Loader";
import Hero from "./Hero";
import { useAlert } from "react-alert";
import { IoIosArrowRoundForward } from "react-icons/io";
import { Link } from "react-router-dom";
import CompanyServices from "./CompanyServices";


const Home = () => {
  const dispatch = useDispatch();
  const { loading, error, products } = useSelector((state) => state.products);
  useEffect(() => {
    dispatch(getProduct());
  }, [dispatch, error]);
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title={"Ecommerce"}></MetaData>
          <div className="mx-2 md:mx-auto lg:max-w-[1400px] md:max-w-[900px] mt-16">
            <Hero />
          </div>
         <div className="mb-8">
         <CompanyServices/>
         </div>
          <h1
            className="text-left text-4xl 
        sm:text-5xl max-w-[500px] sm:max-w-[1400px] mx-2 sm:mx-auto
        lg:text-5xl mt-16
        font-semibold mb-8 border-b-2 border-gray-500 m-auto p-[1vmax]"
          >
            Featured Products
          </h1>
          <div
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-8 items-center justify-center px-8  mx-auto md:mx-auto lg:max-w-[1400px] md:max-w-[900px]"
            id="container"
          >
            {products &&
              products.slice(0, 4).map((product) => <ProductCard product={product} />)}
          </div>
          <Link to={"/products"} className="flex items-end justify-center my-8 mx-auto mx-w-[200px] text-blue-900 font-semibold">
            <h1 className="text-xl "><u>See all products</u></h1>
            <IoIosArrowRoundForward className="text-2xl font-bold flex items-end"/>
          </Link>
        </>
      )}
    </>
  );
};

export default Home;
