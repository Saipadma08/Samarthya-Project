import React from 'react'
import { FiMessageSquare } from 'react-icons/fi'

const MessageIcon = () => {
  return (
    <div className="p-2 hover:bg-gray-100 rounded-full cursor-pointer text-xl transition">
        <FiMessageSquare />
    </div>
  )
}

export default MessageIcon
