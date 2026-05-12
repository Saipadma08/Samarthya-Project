import React from 'react'

const Skills = ({ profile }) => {

  return (
    <div>
      <div className="bg-white rounded-xl shadow p-5 mt-5">

        <p className="text-xl font-semibold mb-3">
          Skills
        </p>

        <div className="flex flex-wrap gap-2">

          {profile?.skills?.length > 0 ? (

            profile.skills.map((skill, index) => (

              <span
                key={index}
                className="bg-cyan-100 text-cyan-700 px-3 py-1 rounded"
              >
                {skill}
              </span>

            ))

          ) : (

            <p className="text-gray-500">
              No skills added
            </p>

          )}

        </div>

      </div>
    </div>
  )
}

export default Skills