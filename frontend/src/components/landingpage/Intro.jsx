import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

import SamarthyaText from '../../assets/Samarthya-text.png'

const Intro = () => {
  return (
    <div className='h-full w-full flex flex-col justify-center'>
        <div className='flex flex-col gap-3 p-7'>
            <div className='mb-7 lg:hidden flex justify-center'>
                <div className='w-28 h-6 shadow-2xl flex overflow-hidden bg-cover bg-center' style={{ backgroundImage: `url(${SamarthyaText})` }}></div>
            </div>
            <h1 className="text-5xl font-bold">
              SAMARTHYA
            </h1>

            <h2 className="text-3xl text-gray-600">
              Inclusive Employment Platform
            </h2>

            <p className='font-medium text-gray-600'>
            Samarthya is a secure and inclusive platform that connects workers and employers through verified profiles, trusted job postings, and a safe hiring system. The platform promotes dignity of labor, equal opportunity, and reliable employment for all users.
            </p>
        </div>

        <div className='flex flex-col gap-4 ps-12 text-4xl font-bold'>
            <motion.div
            initial={{ x: -50 }}
            // animate={{ x: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: false, amount: 0.5 }}
            transition={{ duration: 1 }}
            >
                <p className='text-cyan-600'>
                    Empower
                </p>
            </motion.div>

            <motion.div
            initial={{ x: -50 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: false, amount: 0.5 }}
            transition={{ duration: 1.5 }}
            >
                <p className='text-amber-400'>
                    Inclusivity
                </p>
            </motion.div>

            <motion.div
            initial={{ x: -50 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: false, amount: 0.5 }}
            transition={{ duration: 2 }}
            >
                <p className=' text-emerald-700'>
                    Build
                </p>
            </motion.div>

            <motion.div
            initial={{ x: -50 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: false, amount: 0.5 }}
            transition={{ duration: 2.5 }}
            >
                <p className='text-purple-500'>
                    Opportunities
                </p>
            </motion.div>
        </div>
        
    </div>
  )
}

export default Intro
