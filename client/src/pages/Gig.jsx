import Slider from 'react-slick';
import React from 'react'
import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import newRequest from "../utils/newRequest"
import Reviews from '../components/Reviews';

const Gig = () => {
  const { id } = useParams();

  const { isLoading, error, data } = useQuery({
    queryKey: ["gig"],
    queryFn: () =>
      newRequest.get(`/gigs/single/${id}`).then((res) => {
        return res.data;
      }),
  });

  const userId = data?.userId;

  const {
    isLoading: isLoadingUser,
    error: errorUser,
    data: dataUser,
  } = useQuery({
    queryKey: ["user"],
    queryFn: () =>
      newRequest.get(`/users/${userId}`).then((res) => {
        return res.data;
      }),
    enabled: !!userId,
  });

  return (
    <div className="flex justify-center">
      {isLoading ? (
        "loading"
      ) : error ? (
        "Something went wrong!"
      ) : (
        <div className="max-w-screen-xl px-4 py-8 mx-auto flex flex-col md:flex-row md:gap-x-8">
          <div className="flex flex-col gap-5 md:flex-grow-2">
            <span className="font-light uppercase text-sm text-[#555]">
              Fiverr {">"} Graphics & Design {">"}
            </span>
            <h1 className="text-2xl md:text-3xl">{data.title}</h1>
            {isLoadingUser ? (
              "loading"
            ) : errorUser ? (
              "Something went wrong!"
            ) : (
              <div className="flex items-center gap-3">
                <img
                  className="w-8 h-8 rounded-full object-cover"
                  src={dataUser.img || "/img/noavatar.jpg"}
                  alt=""
                />
                <span className='text-sm font-medium'>{dataUser.username}</span>
                {!isNaN(data.totalStars / data.starNumber) && (
                  <div className="flex items-center gap-1">
                    {Array(Math.round(data.totalStars / data.starNumber))
                      .fill()
                      .map((item, i) => (
                        <img src="/img/star.png" alt="" key={i} className="h-4 w-4" />
                      ))}
                    <span className='text-sm font-bold text-[#ffc108]'>{Math.round(data.totalStars / data.starNumber)}</span>
                  </div>
                )}
              </div>
            )}
            <Slider slidesToShow={1} arrowsScroll={1} className="bg-[#F5F5F5] max-h-[500px] w-full">
              {data.images.map((img) => (
                <img key={img} src={img} alt="" className='object-cover w-full' />
              ))}
            </Slider>
            <h2 className='text-xl md:text-2xl font-normal'>About This Gig</h2>
            <p className='text-lg md:text-xl font-light leading-6 text-[#555]'>{data.desc}</p>
            {isLoadingUser ? (
              "loading"
            ) : errorUser ? (
              "Something went wrong!"
            ) : (
              <div className="mt-14 flex flex-col gap-5">
                <h2>About The Seller</h2>
                <div className="flex items-center gap-5">
                  <img className='w-[100px] h-[100px] md:w-[150px] md:h-[150px] rounded-[50%] object-cover' src={dataUser.img || "/img/noavatar.jpg"} alt=""  />
                  <div className="flex flex-col gap-3">
                    <span>{dataUser.username}</span>
                    {!isNaN(data.totalStars / data.starNumber) && (
                      <div className="flex items-center gap-2">
                        {Array(Math.round(data.totalStars / data.starNumber))
                          .fill()
                          .map((item, i) => (
                            <img className='h-4 w-4' src="/img/star.png" alt="" key={i} />
                          ))}
                        <span className='text-sm font-bold text-[#ffc108]'>
                          {Math.round(data.totalStars / data.starNumber)}
                        </span>
                      </div>
                    )}
                    <button className='bg-green-400 text-white rounded-md border border-solid p-3'>Contact Me</button>
                  </div>
                </div>
                <div className="border border-solid rounded-md p-5 mt-5">
                  <div className="flex justify-between flex-wrap">
                    <div className="w-full md:w-1/2 flex flex-col gap-3 mb-5">
                      <span className="font-normal">From</span>
                      <span className="desc">{dataUser.country}</span>
                    </div>
                    <div className="w-full md:w-1/2 flex flex-col gap-3 mb-5">
                      <span className="font-normal">Member since</span>
                      <span className="desc">Aug 2022</span>
                    </div>
                    <div className="w-full md:w-1/2 flex flex-col gap-3 mb-5">
                      <span className="font-normal">Avg. response time</span>
                      <span className="desc">4 hours</span>
                    </div>
                    <div className="w-full md:w-1/2 flex flex-col gap-3 mb-5">
                      <span className="font-normal">Last delivery</span>
                      <span className="desc">1 day</span>
                    </div>
                    <div className="w-full md:w-1/2 flex flex-col gap-3 mb-5">
                      <span className="font-normal">Languages</span>
                      <span className="desc">English</span>
                    </div>
                  </div>
                  <hr />
                  <p>{dataUser.desc}</p>
                </div>
              </div>
            )}
            <Reviews gigId={id} />
          </div>
          <div className="flex flex-col flex-grow border border-gray-300 rounded-md p-5 gap-5 md:max-h-[500px] sticky top-14 md:top-[150px]">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <h3 className='font-semibold text-lg md:text-xl'>{data.shortTitle}</h3>
              <h2 className='font-normal text-lg md:text-xl'>$ {data.price}</h2>
            </div>
            <p className='text-gray-600 my-3 mx-0 text-sm md:text-base'>{data.shortDesc}</p>
            <div className="flex flex-col md:flex-row items-center justify-between text-xs md:text-sm">
              <div className="flex items-center gap-3 mb-1 md:mb-0">
                <img className='w-5' src="/img/clock.png" alt="" />
                <span>{data.deliveryDate} Days Delivery</span>
              </div>
              <div className="flex items-center gap-3 mb-1 md:mb-0">
                <img className='w-5' src="/img/recycle.png" alt="" />
                <span>{data.revisionNumber} Revisions</span>
              </div>
            </div>
            <div className="features">
              {data.features.map((feature) => (
                <div className="flex items-center gap-3 font-light text-gray-600 mb-1" key={feature}>
                  <img className='w-4' src="/img/greencheck.png" alt="" />
                  <span className='text-sm md:text-base'>{feature}</span>
                </div>
              ))}
            </div>
            <Link to={`/pay/${id}`}>
            <button className='bg-[#1dbf73] p-3 text-white font-medium text-lg md:text-xl cursor-pointer'>Continue</button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}


export default Gig