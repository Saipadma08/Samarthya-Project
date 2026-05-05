import { FaRupeeSign } from "react-icons/fa";

const EarningsCard = () => {

  return (

    <div className="
      bg-gradient-to-r
      from-green-600
      to-green-900
      text-white
      rounded-2xl
      shadow-lg
      p-6
      flex
      justify-between
      items-center
    ">

      <div>

        <p className="text-sm opacity-80">
          Monthly Earnings
        </p>

        <h2 className="
          text-3xl
          font-bold
          mt-1
        ">
          ₹12,500
        </h2>

        <p className="
          text-sm
          mt-2
          opacity-80
        ">
          +12% from last month
        </p>

      </div>

      <FaRupeeSign className="
        text-5xl
        opacity-70
      "/>

    </div>

  );

};

export default EarningsCard;