import { FaStar } from "react-icons/fa";

const TrustScoreCard = () => {
  return (
    <div
      className="
        bg-white/80
        backdrop-blur-md
        rounded-2xl
        shadow-lg
        p-6
        border border-blue-900
      "
    >

      <h3 className="text-lg font-semibold text-black mb-3">
        Trust Score
      </h3>

      <div className="flex gap-1 text-yellow-500 text-xl mb-2">

        <FaStar />
        <FaStar />
        <FaStar />
        <FaStar />
        <FaStar className="opacity-30" />

      </div>

      <p className="text-sm text-blue-900  opacity-80">
        Based on completed jobs and reviews
      </p>

    </div>
  );
};

export default TrustScoreCard;