import React from 'react'

import { FiSearch } from 'react-icons/fi'

import { useNavigate } from 'react-router-dom'

const SearchBar = () => {

  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  return (

    <button
      onClick={() => navigate(`/${user.role}/search`)}
      className="flex items-center bg-gray-200 px-3 py-2 rounded-lg w-40 lg:w-60 backdrop-blur cursor-pointer"
    >

      <FiSearch className="text-gray-600" />

      <p className='mx-2 text-sm text-gray-500'>
        Search...
      </p>

    </button>

  )

}

export default SearchBar