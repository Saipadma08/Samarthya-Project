import React from 'react'

const About = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-10">

      <div className="max-w-5xl mx-auto">

        <h1 className="text-4xl font-bold mb-4">
          About Samarthya
        </h1>

        <p className="text-gray-600 mb-6">
          Samarthya is a secure and inclusive employment platform that connects
          workers and employers through verified profiles, trusted job postings,
          and a safe hiring system.
        </p>


        {/* Mission */}
        <div className="bg-white p-6 rounded-xl shadow mb-6">

          <h2 className="text-2xl font-semibold mb-2">
            Our Mission
          </h2>

          <p className="text-gray-600">
            Our goal is to provide equal opportunity for all individuals,
            including transgender and gender-diverse people, to find safe,
            verified, and dignified employment.
          </p>

        </div>


        {/* Features */}
        <div className="grid md:grid-cols-3 gap-6">

          <div className="bg-white p-6 rounded-xl shadow">
            <h3 className="font-semibold text-lg mb-2">
              Verified Jobs
            </h3>
            <p className="text-gray-600">
              Employers are verified to ensure safe job opportunities.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <h3 className="font-semibold text-lg mb-2">
              Trust Score
            </h3>
            <p className="text-gray-600">
              Users gain trust score based on work history.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <h3 className="font-semibold text-lg mb-2">
              Secure Platform
            </h3>
            <p className="text-gray-600">
              Admin monitoring keeps platform safe.
            </p>
          </div>

        </div>

      </div>

    </div>
  )
}

export default About
