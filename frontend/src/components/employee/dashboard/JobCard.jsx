const JobCard = () => {
  return (
    <div className="bg-gray-900 p-4 rounded-xl">
      <h2 className="text-lg font-semibold">Cleaning Job</h2>
      <p className="text-gray-400">₹500/day</p>

      <button className="mt-3 px-4 py-2 bg-linear-to-r from-purple-600 to-indigo-600 rounded-lg">
        Apply
      </button>
    </div>
  );
};

export default JobCard;