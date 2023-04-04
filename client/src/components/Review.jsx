import React from 'react'
import { useQuery } from "@tanstack/react-query";
import newRequest from "../utils/newRequest"

const Review = ({ review }) => {

    const { isLoading, error, data } = useQuery(
        {
          queryKey: [review.userId],
          queryFn: () =>
            newRequest.get(`/users/${review.userId}`).then((res) => {
              return res.data;
            }),
        },
      );
    
    
      return (
        <div className="flex flex-col gap-5 my-5 mx-0">
          {isLoading ? (
            "loading"
          ) : error ? (
            "error"
          ) : (
            <div className="flex items-center">
              <img className="h-12 w-12 rounded-[50%]" src={data.img || "/img/noavatar.jpg"} alt="" />
              <div className="info">
                <span className='pl-2'>{data.username}</span>
                <div className="flex items-center gap-3 text-gray-600">
                  <span className='pl-2'>{data.country}</span>
                </div>
              </div>
            </div>
          )}
          <div className="flex gap-1">
            {Array(review.star)
              .fill()
              .map((item, i) => (
                <img className='h-4 w-4' src="/img/star.png" alt="" key={i} />
              ))}
            <span className='text-sm font-bold text-[#ffc108]' >{review.star}</span>
          </div>
          <p>{review.desc}</p>
          <div className="flex items-center gap-3">
            <span>Helpful?</span>
            <img className='w-4' src="/img/like.png" alt="" />
            <span>Yes</span>
            <img className='w-4' src="/img/dislike.png" alt="" />
            <span>No</span>
          </div>
        </div>
      );
    };

export default Review