import React from "react";
import { Link } from "react-router-dom";
import { Sparkles, ArrowRight } from "lucide-react";

const CompleteProfile = ({
  completion,
  editLink,
  message
}) => {

  return (

    <div
      className="
        mt-6
        w-full
        md:w-100
        rounded-3xl
        bg-linear-to-br
        from-cyan-500
        via-sky-500
        to-blue-600
        p-px
        shadow-lg
      "
    >

      <div
        className="
          rounded-3xl
          bg-white/95
          backdrop-blur
          px-6
          py-5
        "
      >

        {/* TOP */}
        <div className="flex items-start justify-between">

          <div>

            <div className="flex items-center gap-2">

              <div
                className="
                  w-8 h-8
                  rounded-2xl
                  bg-cyan-100
                  flex items-center justify-center
                "
              >
                <Sparkles
                  size={15}
                  className="text-cyan-600"
                />
              </div>

              <div>

                <h2 className="text-lg font-bold text-gray-800">
                  Complete Your Profile
                </h2>

                <p className="text-xs text-gray-500">
                  Build trust & improve visibility
                </p>

              </div>

            </div>

          </div>

          {/* Percentage */}
          <div
            className="
              flex items-center justify-center
              min-w-10 h-10
              rounded-xl
              bg-linear-to-br
              from-cyan-500
              to-blue-600
              text-white
              font-bold
              text-md
              shadow-md
            "
          >
            {completion}%
          </div>

        </div>

        {/* Progress Bar */}
        <div className="mt-6">

          <div
            className="
              h-4
              w-full
              rounded-full
              bg-gray-200
              overflow-hidden
            "
          >

            <div
              className="
                h-full
                rounded-full
                bg-linear-to-r
                from-cyan-500
                to-blue-600
                transition-all
                duration-700
              "
              style={{
                width: `${completion}%`
              }}
            />

          </div>

        </div>

        {/* Footer */}
        <div
          className="
            mt-5
            flex items-center justify-between
          "
        >

          {
            completion < 100 ? (

              <>

                <p className="text-xs text-gray-600 w-52">

                  {message}

                </p>

                <Link
                  to={editLink}
                  className="
                    flex items-center justify-center gap-1
                    bg-cyan-700
                    hover:bg-cyan-900
                    text-white
                    font-semibold
                    text-xs
                    px-2
                    h-11
                    w-28
                    rounded-full
                    transition-all
                  "
                >

                  Edit Profile

                  <ArrowRight size={12}/>

                </Link>

              </>

            ) : (

              <>

                <div>

                  <p className="text-sm font-semibold text-green-700">
                    ✅ Profile Completed
                  </p>

                  <p className="text-xs text-gray-500">
                    Your profile is ready
                  </p>

                </div>

                <Link
                  to={editLink}
                  className="
                    flex items-center justify-center
                    border border-gray-300
                    hover:bg-gray-100
                    text-gray-700
                    text-xs
                    font-medium
                    h-10
                    px-4
                    rounded-full
                  "
                >

                  Edit Profile

                </Link>

              </>

            )
          }

        </div>

      </div>

    </div>

  );

};

export default CompleteProfile;