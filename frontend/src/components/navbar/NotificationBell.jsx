import React from 'react'
import { FiBell } from 'react-icons/fi'

const NotificationBell = () => {
  return (
    <div className="p-2 hover:bg-gray-100 rounded-full cursor-pointer text-xl transition">
        <FiBell />
    </div>
  )
}

export default NotificationBell
