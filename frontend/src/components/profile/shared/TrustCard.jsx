import React, {
  useEffect,
  useState,
} from "react";

import axios from "axios";

import {
  Star,
} from "lucide-react";

const TrustCard = ({
  userId,
}) => {

  const [
    trustScore,
    setTrustScore,
  ] = useState(0);

  useEffect(() => {

    if (userId) {
      fetchTrustScore();
    }

  }, [userId]);

  const fetchTrustScore =
    async () => {

      try {

        const response =
          await axios.get(
            `http://localhost:3000/api/reviews/trust-score/${userId}`
          );

        setTrustScore(
          response.data.trustScore
        );
        setTotalReviews(
          response.data.reviews?.length || 0
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
      p-5
      mt-5
      w-full
    ">

      <p className="
        text-lg
        font-semibold
        mb-4
      ">
        Trust Score
      </p>

      <div className="
        flex
        items-center
        gap-3
      ">

        <div className="
          w-12
          h-12
          rounded-full
          bg-yellow-50
          flex
          items-center
          justify-center
        ">

          <Star
            size={24}
            className="text-yellow-500"
            fill="currentColor"
          />

        </div>

        <div>

          <p className="
            text-3xl
            font-bold
            text-gray-800
          ">
            {trustScore}
            <span className="
              text-lg
              text-gray-400
              ml-1
            ">
              /5
            </span>
          </p>

          <p className="
            text-sm
            text-gray-500
          ">
            Based on reviews
          </p>

        </div>

      </div>

    </div>
  );
};

export default TrustCard;