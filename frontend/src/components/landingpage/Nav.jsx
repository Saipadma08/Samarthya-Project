import React from 'react'
import { Link } from 'react-router-dom'
import { HashLink } from "react-router-hash-link"

import Logo from '../../assets/logo-4.png'
import SamarthyaText from "../../assets/Samarthya-text.png"

const Nav = () => {
    return (
        <div className='flex flex-col'>
            <div className='h-16 bg-white flex items-center justify-between px-6 sticky top-0 z-50 shadow-md shadow-gray-300'>
                <div className='w-11 h-11 rounded-full shadow-2xl flex overflow-hidden bg-cover bg-center' style={{ backgroundImage: `url(${Logo})` }}>
                </div>

                <div className='my-3 items-center justify-center hidden lg:block'>
                    <div className='w-48 h-8 shadow-2xl flex overflow-hidden bg-cover bg-center' style={{ backgroundImage: `url(${SamarthyaText})` }}>
                    </div>
                </div>

                <div>
                    <div className='flex gap-2'>
                        <Link to="/" className='bg-cyan-600 text-amber-50 font-medium text-xs lg:text-[2vh] px-0.5 lg:px-3 py-1 uppercase rounded-lg w-16 lg:w-24 text-center'>Home</Link>
                        <HashLink smooth to="/#signup" className='bg-cyan-600 text-amber-50 font-medium text-xs lg:text-[2vh] px-0.5 lg:px-3 py-1 uppercase rounded-lg w-16 lg:w-24 text-center'>Sign up</HashLink>
                        <Link to="/login" className='bg-cyan-600 text-amber-50 font-medium text-xs lg:text-[2vh] px-0.5 lg:px-3 py-1 uppercase rounded-lg w-16 lg:w-24 text-center'>Log in</Link>
                    </div>
                </div>
            </div>
            <div className='flex justify-center my-3 lg:hidden'>
          <div className='w-44 h-6 shadow-2xl flex overflow-hidden bg-cover bg-center' style={{ backgroundImage: `url(${SamarthyaText})` }}></div>
        </div>
        </div>

    )
}

export default Nav
