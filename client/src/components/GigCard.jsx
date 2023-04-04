import React from 'react'
import { Link } from 'react-router-dom'
import { useQuery } from "@tanstack/react-query";
import newRequest from "../utils/newRequest"

const GigCard = ({item}) => {

    const { isLoading, error, data } = useQuery({
        queryKey: [item.userId],
        queryFn: () =>
          newRequest.get(`/users/${item.userId}`).then((res) => {
            return res.data;
          }),
      });

  return (
    <Link to={`/gig/${item._id}`} className='link'>
        <div className='w-[324px] h-[400px] border border-solid mb-10'>
            <img className='w-full h-[50%] object-cover' src={item.cover} alt="gig" />
            <div className="flex flex-col py-2 px-5 gap-4">
            {isLoading ? (
            "loading"
          ) : error ? (
            "Something went wrong!"
          ) : (
                <div className="flex items-start gap-3">
                    <img className='w-6 h-6 rounded-md object-cover' src={data.img || "/img/noavatar.jpg"} alt="profile" />
                    <span>{data.username}</span>
                </div>
                )}
                <p className='text-[#111]'>{item.desc}</p>
                <div className="flex items-center gap-1">
                    <img className='h-3 w-3' src="./img/star.png" alt="star" />
                    <span className='flex text-sm font-bold text-[#ffc100]'>{!isNaN(item.totalStars / item.starNumber) &&
                Math.round(item.totalStars / item.starNumber)}</span>
                </div>
            </div>
            <hr className='h-0 border-[0.5px] border-solid' />
            <div className="flex items-center justify-between px-5 py-2">
                <img className='w-4 h-4 cursor-pointer object-cover' src="./img/heart.png" alt="heart" />
                <div className=''>
                <span className='text-[#999] text-xs'>STARTING AT</span>
                <h2 className='text-[#555] text-base font-normal text-end'>${item.price}
                </h2>
                </div>
            </div>
        </div>
    </Link>
  )
}

export default GigCard