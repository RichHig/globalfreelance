import React from 'react'
import { Link } from 'react-router-dom'

const ProjectCard = ({card}) => {
    return (
        <Link to='/' className="block sm:inline-block">
      <div className='w-[300px] bg-gray-300 h-[300px] rounded-md overflow-hidden cursor-pointer border-solid mt-6'>
         <img className='w-full h-[70%] object-cover' src={card.img} alt="" />
         <div className='flex items-center gap-5 p-4'>
             <img className='w-10 h-10 rounded-md object-cover' src={card.pp} alt="" />
             <div className='texts'>
                 <h2 className='flex text-sm font-medium'>{card.cat}</h2>
                 <span className='text-sm font-light'>{card.username}</span>
             </div>
         </div>
      </div>
      </Link>
    )
  }

export default ProjectCard