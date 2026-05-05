import React from 'react'

import { FiSearch } from 'react-icons/fi'

const SearchBar = () => {
  return (
    <div className="flex items-center bg-gray-200 px-3 py-2 rounded-lg w-40 lg:w-60 backdrop-blur">
    
        <FiSearch className="text-gray-600" />

        <input
            type="text"
            placeholder="Search..."
            className="bg-transparent outline-none px-2 w-full text-sm"
        />

    </div>
  )
}

export default SearchBar
