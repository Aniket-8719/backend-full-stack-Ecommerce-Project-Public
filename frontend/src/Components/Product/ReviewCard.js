import React from "react";
import ReactStars from "react-rating-stars-component";

const ReviewCard = ({ review }) => {
  const options = {
    size: 20,
    value: review.rating,
    edit: false,
    precision: 0.5,
  };

  return (
    <div className="flex flex-col border-gray items-center justify-center border-2 p-4 min-w-[200px] sm:min-w-[240px] lg:min-w-[280px]">
      <div className="flex w-16 h-16 sm:w-20 sm:h-20 text-center">
        {review && review.avatar && (
          <img
            className="w-full h-full mb-3 rounded-full shadow-lg"
            src={review.avatar.url}
            alt="User Avatar"
          />
        )}
      </div>
      <div className="flex flex-col items-center justify-center mt-2 px-2 sm:px-4">
        {review && (
          <h5 className="mb-1 text-sm sm:text-xl font-medium text-gray-900">
            {review.name}
          </h5>
        )}
        <div className="text-xs sm:text-lg">
          <ReactStars  {...options} />
          <span className="text-xs sm:text-sm lg:text-base">{review.comment}</span>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
