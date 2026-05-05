import React from 'react'
import { Link } from 'react-router-dom'

const SignupButtons = () => {
  return (
    <div className='flex flex-col gap-5 px-6'>
        <h2 className="text-4xl font-bold text-gray-800 text-center">
          Sign up
        </h2>
      <div>
        <p className='text-mauve-700 text-sm text-center'>
            Signing up on Samarthya gives you access to a secure and inclusive platform designed to connect the right people with the right opportunities. By creating an account, you become part of a reliable system that promotes transparency, efficiency, and equal opportunity for everyone.
        </p>
      </div>

      <div className='flex justify-center gap-5 lg:gap-8 mt-2'>

          {/* Employee Card */}
          <div className='flex flex-col justify-between bg-cyan-600 text-white shadow-xl w-1/2 lg:w-1/3 p-5 rounded-xl hover:bg-cyan-700 transition'>

            <div className='flex flex-col gap-2'>
              <h2 className='text-xl font-semibold'>👷 Employee</h2>

              <p className='text-sm text-gray-100'>
                Find safe & verified jobs based on your skills and experience.
              </p>
            </div>

            <Link
              to="/signup/employee"
              className="mt-3 bg-white text-cyan-700 font-semibold text-sm px-4 py-2 rounded-lg w-fit hover:bg-gray-100 hover:scale-105 transition duration-300"
            >
              Sign up as Employee
            </Link>

          </div>


          {/* Employer Card */}
          <div className='flex flex-col gap-5 lg:gap-10 justify-between bg-cyan-600 text-white shadow-xl w-1/2 lg:w-1/3 p-5 rounded-xl hover:bg-cyan-700 transition'>

            <div className='flex flex-col gap-2'>
              <h2 className='text-xl font-semibold'>🏢 Employer</h2>

              <p className='text-sm text-gray-100'>
                Hire trusted and verified workers for jobs and services.
              </p>
            </div>

            <Link
              to="/signup/employer"
              className="mt-3 bg-white text-cyan-700 font-semibold text-sm px-4 py-2 rounded-lg w-fit hover:bg-gray-100 hover:scale-105 transition duration-300"
            >
              Sign up as Employer
            </Link>

          </div>
        </div>

    </div>
  )
}

export default SignupButtons
