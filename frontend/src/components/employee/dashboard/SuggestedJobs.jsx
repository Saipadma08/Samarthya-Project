const SuggestedJobs = () => {

  const jobs = [
    { title: "Body painting", pay: "₹1500" },
    { title: "Bridal Make-up", pay: "₹18000" },
    { title: "Editorial/Print Make-up", pay: "₹6000" },
  ];

  return (
    <div
      className="
        bg-white/85
        backdrop-blur-md
        rounded-2xl
        shadow-lg
        p-6
        border border-blue-200
      "
    >

      <h3 className="text-lg font-semibold text-black mb-4">
        Suggested Jobs
      </h3>

      <div className="space-y-3">

        {jobs.map((job, index) => (
          <div
            key={index}
            className="
              flex justify-between items-center
              bg-gradient-to-r
              from-cyan-100
              to-purple-200
              p-3
              rounded-xl
            "
          >

            <div>

              <p className="font-medium text-black">
                {job.title}
              </p>

              <p className="text-sm text-blue-900">
                {job.pay}
              </p>

            </div>

            <button
              className="
                bg-blue-700
                text-white
                px-4 py-1
                rounded-lg
                text-sm
                hover:bg-blue-800
                transition
              "
            >
              Apply
            </button>

          </div>
        ))}

      </div>

    </div>
  );
};

export default SuggestedJobs;