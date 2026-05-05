const StatsCard = ({ title, value }) => {

  return (

    <div
      className="
        bg-slate-800
        text-white
        rounded-xl
        shadow-md
        p-5
        hover:shadow-lg
        transition
        w-full
      "
    >

      <p className="
        text-sm
        text-gray-300
      ">
        {title}
      </p>

      <h2 className="
        text-2xl
        font-bold
        mt-2
      ">
        {value}
      </h2>

    </div>

  );

};

export default StatsCard;