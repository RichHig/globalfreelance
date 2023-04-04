import React from 'react'
import { Link } from 'react-router-dom'

const catCard = ({item}) => {
  return (
      <Link to='/gigs?cat=design'>
    <div className='w-[252px] h-[344px] text-white rounded-md cursor-pointer relative'>
        <img className='w-[100%] h-[100%] object-cover' src={item.img} alt="" />
        <span className='absolute font-light top-4 left-4'>{item.desc}</span>
        <span className='absolute left-4 top-10 font-medium text-2xl'>{item.title}</span>
    </div>
    </Link>
  )
}

export default catCard