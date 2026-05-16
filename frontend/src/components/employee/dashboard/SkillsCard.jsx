const SkillsCard = ({ skills = [] }) => {

  return (

    <div
      className="
        bg-white/75
        rounded-2xl
        shadow-md
        p-6
        border border-blue-900
      "
    >

      <h3
        className="
          text-lg
          font-semibold
          text-cyan-950
          mb-4
        "
      >
        Skills
      </h3>

      <div
        className="
          flex
          flex-wrap
          gap-2
        "
      >

        {
          skills.length > 0 ? (

            skills.map((skill, i) => (

              <span
                key={i}
                className="
                  bg-cyan-600
                  text-white
                  px-3
                  py-2
                  rounded-full
                  text-sm
                  font-medium
                "
              >

                {skill}

              </span>
            ))

          ) : (

            <p className="text-gray-500">

              No skills added yet

            </p>
          )
        }

      </div>

    </div>
  );
};

export default SkillsCard;