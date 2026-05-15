import React from 'react'

import { FiSearch } from 'react-icons/fi'

import { useNavigate } from 'react-router-dom'

const SearchBar = () => {

  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className='rounded-full w-40 lg:w-60 bg-linear-to-br from-cyan-500 via-sky-500 to-teal-700 px-px shadow-sm shadow-gray-300 hover:border-x hover:border-y hover:border-cyan-600'>
      <button
        onClick={() => navigate(`/${user.role}/search`)}
        className="flex items-center bg-white  px-3 py-2 rounded-full w-full backdrop-blur cursor-pointer"
      >

        <FiSearch className="text-gray-600" />

        <p className='mx-2 text-sm text-gray-500'>
          Search...
        </p>

      </button>
    </div>

    

  )

}

export default SearchBar