import Carousel from "react-material-ui-carousel";
import { useDispatch, useSelector } from "react-redux";
import { getProductDetails, newReview } from "../../actions/productAction";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import ReactStars from "react-rating-stars-component";
import ReviewCard from "./ReviewCard";
import Loader from "../Layouts/Loader";
import MetaData from "../Layouts/MetaData";
import { toast } from "react-toastify";
import { addItemsToCart } from "../../actions/cartAction";

import { clearErrors } from "../../actions/orderAction";
import { NEW_REVIEW_RESET } from "../../constants/productConstants";

const ProductDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { loading, error, product } = useSelector(
    (state) => state.productDetails
  );
  const { success, error: reviewError } = useSelector(
    (state) => state.newReview
  );
  const { user } = useSelector((state) => state.user);

  const [quantity, setQuantity] = useState(1);
  const [open, setOpen] = useState(false);
  const modalRef = useRef();

  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      setOpen(false);
    }
  };

  useEffect(() => {
    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    // Cleanup event listener on component unmount
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const reviewSubmitHandler = () => {
    const myForm = new FormData();

    myForm.set("rating", rating);
    myForm.set("comment", comment);
    myForm.set("productId", product._id);
    myForm.set("userImg", user.avatar.url);
    myForm.set("userImgId", user.avatar.public_id);

    dispatch(newReview(myForm));

    setOpen(false);
  };

  console.log(user.avatar.url);

  const increaseQuantity = () => {
    if (product.Stock <= quantity) return;

    const qty = quantity + 1;
    setQuantity(qty);
  };

  const decreaseQuantity = () => {
    if (1 >= quantity) return;

    const qty = quantity - 1;
    setQuantity(qty);
  };

  const addToCartHandler = () => {
    dispatch(addItemsToCart(id, quantity));
    toast.success("Item Added To Cart");
  };
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    if (reviewError) {
      toast.error(reviewError);
      dispatch(clearErrors());
    }

    if (success) {
      toast.success("Review Submitted Successfully");
      dispatch({ type: NEW_REVIEW_RESET });
    }

    dispatch(getProductDetails(id));
  }, [dispatch, id, error, success, reviewError]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : product ? (
        <>
          <MetaData title={`${product.name} -- Ecommerce`} />
          <div className="flex flex-col lg:flex-row lg:max-w-[100vw] w-[100%] p-[6vmax] box-border bg-white justify-between mt-8 sm:mt-0">
            <div className="w-[100%] flex flex-col justify-evenly items-center p-[2vmax] max-w-lg">
              <Carousel className="w-[25vmax]">
                {product.images &&
                  product.images.map((item, i) => (
                    <img
                      className="object-cover w-full h-full"
                      key={item.url}
                      src={item.url}
                      alt={`${i} Slide`}
                    />
                  ))}
              </Carousel>
            </div>
            <div className="flex flex-col justify-start items-start gap-4 pt-8 lg:w-2/4">
              <div>
                <span className="text-violet-600 font-semibold text-lg lg:text-xl">
                  Quality of Products
                </span>
                <h1 className="text-3xl lg:text-4xl font-bold">
                  {product.name}
                </h1>
              </div>
              <p className="text-sm lg:text-base">Product #{product._id}</p>
              <div>
                <ReactStars
                  size={20}
                  value={product.ratings}
                  edit={false}
                  precision={0.5}
                />
                <span className="text-sm lg:text-base">
                  ({product.numOfReviews} Reviews)
                </span>
              </div>
              <div className="detailsBlock-3">
                <h1 className="text-lg lg:text-xl">₹{product.price}</h1>
                <div className="detailsBlock-3-1 flex items-center">
                  <div className="detailsBlock-3-1-1 flex items-center">
                    <button
                      onClick={decreaseQuantity}
                      className="text-xs sm:text-sm lg:text-base px-2 sm:px-3 py-1 sm:py-2 bg-slate-300"
                    >
                      -
                    </button>
                    <input
                      className="text-xs sm:text-sm lg:text-base w-12 sm:w-16 h-6 sm:h-8 text-center border border-gray-300"
                      readOnly
                      type="number"
                      value={quantity}
                    />
                    <button
                      onClick={increaseQuantity}
                      className="text-xs sm:text-sm lg:text-base px-2 sm:px-3 py-1 sm:py-2 bg-slate-300"
                    >
                      +
                    </button> 
                  </div>  
                  <button
                    onClick={addToCartHandler}
                    className={`${
                      product.Stock < 1
                        ? "hidden"
                        : "text-sm lg:text-base px-4 py-2 ml-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded"
                    }`}
                    disabled={product.Stock < 1}
                  >
                    Add to Cart
                  </button>
                </div>
                <p className="text-sm lg:text-base mt-2">
                  Status:{" "}
                  <b
                    className={
                      product.Stock < 1 ? "text-red-600" : "text-green-600"
                    }
                  >
                    {product.Stock < 1 ? "Out of Stock" : "In Stock"}
                  </b>
                </p>
              </div>
              <div className="flex justify-center items-center text-sm lg:text-base">
                Description: {product.description}
              </div>
              <button
                onClick={() => setOpen(!open)}
                className="text-sm lg:text-base px-4 py-2 bg-green-500 hover:bg-green-600 text-white font-semibold rounded mt-4"
              >
                Submit Review
              </button>
            </div>
          </div>

          {/* New review dialog box */}
          <div
            className={`${
              open
                ? "fixed inset-0 flex justify-center items-center bg-gray-900 bg-opacity-50 z-10"
                : "hidden"
            }`}
          >
            <div
              ref={modalRef}
              className="flex flex-col justify-start items-start gap-2 mx-2 bg-white shadow-lg border-2 border-gray-300 rounded-md p-4 w-full max-w-lg"
            >
              <h1>Submit Review</h1>
              <ReactStars
                size={50}
                value={rating}
                onChange={(newRating) => setRating(newRating)}
              />
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Comment here..."
                rows={5}
                className="w-full border rounded-md p-2"
              ></textarea>
              <div className="flex justify-end gap-2 mt-2 items-center w-full">
                <button
                  onClick={() => setOpen(!open)}
                  className="w-full hover:bg-red-700 bg-red-500 text-white py-1.5 px-2 rounded-sm"
                >
                  Close
                </button>
                <button
                  onClick={reviewSubmitHandler}
                  className="w-full bg-violet-600 hover:bg-violet-700 text-white py-1.5 px-2.5 rounded-sm"
                >
                  Submit
                </button>
              </div>
            </div>
          </div>

          <h3 className="text-center text-2xl mb-2 sm:text-3xl sm:w-[35vmax] sm:mb-[68px] lg:text-3xl lg:w-[40vmax] lg:mb-16 font-semibold  m-auto p-[1vmax] pb-4 my-4">
            REVIEWS
          </h3>

          <div className="mb-4">
            {product.reviews && product.reviews.length > 0 ? (
              <div className="flex overflow-x-auto gap-4 sm:gap-8 p-2">
                <div
                  className="flex space-x-4 sm:space-x-6 lg:space-x-8"
                  style={{
                    scrollSnapType: "x mandatory",
                  }}
                >
                  {product.reviews.map((review, index) => (
                    <ReviewCard key={index} review={review} />
                  ))}
                </div>
              </div>
            ) : (
              <p className="text-center text-xl mb-32">No Reviews Yet</p>
            )}
          </div>
        </>
      ) : (
        <p className="text-center text-xl mb-32">Product not found</p>
      )}
    </>
  );
};

export default ProductDetails;
