import React from 'react'
import marvelgif from '../../assets/marvel-avengers.gif'

function Loading() {
  return (
    <div className='mx-auto'>
        <img src={marvelgif} alt="</>" className='w-1/3 mx-auto' />
        <div className='p-8 font-bold text-lg'>Loading...</div>
    </div>
  )
}

export default Loading