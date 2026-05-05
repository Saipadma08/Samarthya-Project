import React from 'react'
import { Link } from 'react-router-dom'
import { FiEdit } from 'react-icons/fi'

const EditProfileButton = () => {
  return (
    <div>
        <Link
        to="/employer/edit-profile"
        className="flex items-center justify-center gap-2 bg-cyan-600 text-white rounded-md px-3 h-8 lg:px-6 lg:h-10"
        >
            Edit Profile
            <FiEdit />
        </Link>
    </div>
  )
}

export default EditProfileButton
