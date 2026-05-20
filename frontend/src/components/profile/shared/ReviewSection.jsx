import React, {
  useEffect,
  useState,
} from "react";

import axios from "axios";

import {
  Star,
} from "lucide-react";

const ReviewSection = ({
  userId,
}) => {

  const [
    reviews,
    setReviews,
  ] = useState([]);

  useEffect(() => {

    if (userId) {
      fetchReviews();
    }

  }, [userId]);

  const fetchReviews =
    async () => {

      try {

        const response =
          await axios.get(
            `http://localhost:3000/api/reviews/${userId}`
          );

        setReviews(
          response.data.reviews
        );

      } catch (error) {

        console.log(error);
      }
    };

  return (

    <div className="
      bg-white
      rounded-2xl
      shadow-sm
      border border-gray-100
      p-6
      mt-5
    ">

      <p className="
        text-xl
        font-semibold
        mb-5
      ">
        Reviews
      </p>

      {
        reviews.length === 0
        ? (
          <p className="
            text-gray-500
            text-sm
          ">
            No reviews yet
          </p>
        )
        : (
          <div className="
            flex
            flex-col
            gap-4
            max-h-80
            overflow-y-auto
            pr-2
          ">

           {
  reviews.slice(0,4).map((item) => (

    <div
      key={item._id}
      className="
        border-b
        border-slate-200
        pb-4
        mb-4
      "
    >

      <div className="
        flex
        items-center
        gap-3
        mb-2
      ">

        <img
          src={
            item.reviewerId?.profileImage ||

            "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
          }

          alt=""

          className="
            w-10
            h-10
            rounded-full
            object-cover
          "
        />

        <div>

          <p className="
            font-semibold
            text-slate-800
          ">
            {item.reviewerId?.name}
          </p>

          <div className="
            text-yellow-500
            text-sm
          ">
            {"★".repeat(item.rating)}
          </div>

        </div>

      </div>

      <p className="
        text-slate-600
        text-sm
        leading-relaxed
      ">
        {item.review}
      </p>

    </div>
  ))
}

          </div>
        )
      }

    </div>
  );
};

export default ReviewSection;