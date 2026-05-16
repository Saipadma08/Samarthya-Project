import axios from "axios";

import React, {
  useEffect,
  useState,
} from "react";

const RecentActivity = () => {

  const [
    activities,
    setActivities,
  ] = useState([]);

  useEffect(() => {

    fetchActivities();

  }, []);

  const fetchActivities =
    async () => {

      try {

        const token =
          localStorage.getItem("token");

        const response =
          await axios.get(

            "http://localhost:3000/api/applications/employee",

            {
              headers: {
                Authorization:
                  `Bearer ${token}`,
              },
            }
          );

        const apps =
          response.data.applications || [];

        const recent =
          apps.slice(0, 5).map(
            (item) => {

              return {

                id: item._id,

                text:
                  item.status ===
                  "Accepted"

                  ? `Accepted for ${item.job?.title}`

                  : item.status ===
                    "Rejected"

                  ? `Rejected from ${item.job?.title}`

                  : `Applied for ${item.job?.title}`,
              };
            }
          );

        setActivities(recent);

      } catch (error) {

        console.log(
          error.response?.data ||
          error.message
        );
      }
    };

  return (

    <div className="
      bg-white
      rounded-2xl
      border
      border-slate-200
      p-6
      shadow-sm
    ">

      <h2 className="
        text-2xl
        font-bold
        mb-5
      ">

        Recent Activity

      </h2>

      <div className="space-y-3">

        {
          activities.length === 0

          ? (

            <p className="text-gray-500">

              No recent activity

            </p>
          )

          : (

            activities.map(
              (activity) => (

                <div
                  key={activity.id}
                  className="
                    bg-cyan-600
                    text-white
                    rounded-lg
                    px-4
                    py-3
                    text-sm
                  "
                >

                  {activity.text}

                </div>
              )
            )
          )
        }

      </div>

    </div>
  );
};

export default RecentActivity;