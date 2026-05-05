import React from 'react'

import { motion } from 'framer-motion'


const AnimationText = () => {
  return (
    <div>
      <div className='flex flex-col w-full lg:w-[80%] gap-13 px-5 text-xl mt-10 font-bold'>
            <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 1 }}
            >
                <div className='text-white bg-blue-800 py-3 px-6 rounded-full'>
                    Get started
                </div>
            </motion.div>

            <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 2 }}
            >
                <p className='text-white bg-amber-400 py-3 px-6 rounded-full'>
                    Discover opportunities
                </p>
            </motion.div>

            <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 3 }}
            >
                <p className='text-white bg-emerald-700 py-3 px-6 rounded-full'>
                    Connect with trusted users
                </p>
            </motion.div>

        </div>
    </div>
  )
}

export default AnimationText
