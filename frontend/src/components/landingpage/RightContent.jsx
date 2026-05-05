import React from 'react'
import RightCard from './RightCard'

const RightContent = (props) => {
    console.log(props.cards);
  return (
    <div id="right" className='h-full w-full p-6 flex flex-nowrap gap-10 overflow-x-auto rounded-4xl'>
      {props.cards.map(function (elem,index) {
        return <RightCard key={index} id={index} img={elem.img} tag={elem.tag} color={elem.color} />
      })}
      
    </div>
  )
}

export default RightContent
