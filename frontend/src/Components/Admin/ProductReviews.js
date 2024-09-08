import React, { useEffect, useState } from "react";
import MetaData from "../Layouts/MetaData";
import AdminDropdown from "./AdminDropdown";
import { toast } from "react-toastify";
import { clearError } from "../../actions/userAction";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteReviews, getAllReviews } from "../../actions/productAction";
import { DELETE_REVIEW_RESET } from "../../constants/productConstants";
import { FaSpinner } from "react-icons/fa";
import { MdDelete, MdOutlineProductionQuantityLimits } from "react-icons/md";

const ProductReviews = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { error: deleteError, isDeleted } = useSelector(
    (state) => state.review
  );

  const { error, reviews, loading } = useSelector(
    (state) => state.productReviews
  );

  const [productId, setProductId] = useState("");

  const deleteReviewHandler = (reviewId) => {
    dispatch(deleteReviews(reviewId, productId));
  };

  const productReviewsSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(getAllReviews(productId));
  };

  useEffect(() => {
    if (productId.length === 24) {
      dispatch(getAllReviews(productId));
    }
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }

    if (deleteError) {
      toast.error(deleteError);
      dispatch(clearError());
    }

    if (isDeleted) {
      toast.success("Review Deleted Successfully");
      navigate("/admin/reviews");
      dispatch({ type: DELETE_REVIEW_RESET });
    }
  }, [dispatch, toast, error, deleteError, navigate, isDeleted, productId]);

  const columns = [
    { header: "Review ID", key: "id" },
    { header: "Name", key: "name" },
    { header: "Comment", key: "comment" },
    { header: "Rating", key: "rating" },
    { header: "Actions", key: "actions" },
  ];

  const rows = [];
  reviews &&
    reviews.forEach((item) => {
      rows.push({
        id: item._id,
        name: item.name,
        comment: item.comment ? item.comment : "N/A",
        rating: item.rating,
      });
    });
  return (
    <>
      <MetaData title={`ALL REVIEWS -- Admin`} />
      <div className="flex justify-center">
        <AdminDropdown />
        <div className="md:ml-60 w-full mx-8 ml-8 md:mx-0 max-w-[1180px] mt-16 mb-16">
          <div className="w-full flex flex-col items-center bg-gray-200 p-8 ">
            <form
              className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full md:w-1/2 lg:w-1/3"
              onSubmit={productReviewsSubmitHandler}
            >
              <h1 className="text-2xl font-bold text-center mb-6">
                Product ID
              </h1>

              <div className="mb-4 flex items-center relative z-10">
                <MdOutlineProductionQuantityLimits className="absolute left-3 text-gray-600 " />
                <input
                  type="text"
                  placeholder="Product id"
                  required
                  value={productId}
                  onChange={(e) => setProductId(e.target.value)}
                  className="shadow appearance-none border rounded w-full py-2 px-3 pl-10 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>

              <button
                type="submit"
                disabled={loading ? true : false}
                className="w-full bg-indigo-600 text-white  py-2 px-4 rounded focus:outline-none focus:shadow-outline hover:bg-indigo-500 flex items-center justify-center"
              >
                {loading ? (
                  <div className="flex items-center">
                    <FaSpinner className="animate-spin mr-2" />
                    Processing...
                  </div>
                ) : (
                  "Get All Reviews"
                )}
              </button>
            </form>
          </div>

          {/* review table */}
          <div className="w-full">
                        <div className="bg-white mt-4 overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-tomato">
                                    <tr>
                                        {columns.map((col) => (
                                            <th
                                                key={col.key}
                                                scope="col"
                                                className="px-6 py-3 bg-gray-900 text-white text-left text-md font-medium uppercase tracking-wider"
                                            >
                                                {col.header}
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {rows.map((row) => (
                                        <tr key={row.id}>
                                            <td className="px-6 py-4 whitespace-nowrap">{row.id}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">{row.name}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">{row.comment}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">{row.rating}</td>
                                
                                            <td className="px-6 py-4 whitespace-nowrap flex gap-8 items-center">
                                                
                                                <button 
                                                onClick={() => deleteReviewHandler(row.id)}
                                                >
                                                    <MdDelete className="flex w-full text-xl text-center text-red-600 cursor-pointer" />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                           {reviews.length == 0 &&  <h1 className="text-center my-16 text-2xl">No Reviews found</h1>}
                        </div>
                    </div>
        </div>
      </div>
    </>
  );
};

export default ProductReviews;
