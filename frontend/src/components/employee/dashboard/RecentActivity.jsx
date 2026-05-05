const RecentActivity = () => {

  const activities = [
    "Applied for Hairstyling Service",
    "Completed Editorial Make-up",
    "Profile updated successfully",
  ];

  return (
    <div
      className="
        bg-white/80
        backdrop-blur-md
        rounded-2xl
        shadow-lg
        p-6
        border border-blue-200
      "
    >

      <h3 className="text-lg font-semibold text-black mb-4">
        Recent Activity
      </h3>

      <div className="space-y-2">

        {activities.map((item, index) => (
          <div
            key={index}
            className="
              bg-cyan-600
            
              p-3
              rounded-lg
              text-sm
              text-white
            "
          >
            {item}
          </div>
        ))}

      </div>

    </div>
  );
};

export default RecentActivity;