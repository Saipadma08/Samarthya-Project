import React from 'react'
import RightCardContent from './RightCardContent'

const RightCard = (props) => {
  return (
    <div className='lg:h-[72vh] w-60 overflow-hidden relative shrink-0 rounded-4xl'>
        <img className='h-full w-full object-cover' src={props.img} alt="" />
        {/* Dark Overlay */}
        <div className='absolute inset-0 bg-black/20'></div>
        <RightCardContent id={props.id} tag={props.tag} color={props.color} />
    </div>
  )
}

export default RightCard
