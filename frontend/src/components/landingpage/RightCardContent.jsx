import React from 'react'

const RightCardContent = (props) => {
  return (
    <div className='absolute top-0 left-0 h-full w-full p-4 flex flex-col justify-between'>
        <h2 className='bg-white text-xl font-medium rounded-full h-7 w-7 flex justify-center items-center'>{(props.id)+1}</h2>
        <div>
            <div className='flex justify-between'>
                <button style={{backgroundColor:props.color}} className='text-white font-normal px-6 py-1 rounded-full'>{props.tag}</button>
            </div>
        </div>
    </div>
  )
}

export default RightCardContent
