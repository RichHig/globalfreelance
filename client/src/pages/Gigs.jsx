import React, { useState, useRef, useEffect } from 'react'
import GigCard from '../components/GigCard'
import { useQuery } from "@tanstack/react-query";
import newRequest from "../utils/newRequest"
import { useLocation } from "react-router-dom";

const Gigs = () => {
  const [sort, setSort] = useState('Sales')
 const [open, setOpen] = useState(false)
 const minRef = useRef()
 const maxRef =useRef()

 const { search } = useLocation();

  const { isLoading, error, data, refetch } = useQuery({
    queryKey: ["gigs"],
    queryFn: () =>
      newRequest
        .get(
          `/gigs${search}&min=${minRef.current.value}&max=${maxRef.current.value}&sort=${sort}`
        )
        .then((res) => {
          return res.data;
        }),
  });

  console.log(data);

 const reSort = (type) => {
   setSort(type)
   setOpen(false)
 };

 useEffect(() => {
  refetch();
}, [sort, refetch]);

const apply = () => {
  refetch();
};

  return (
    <div className='flex justify-center'>
      <div className="w-full max-w-screen-xl py-7 px-4 md:px-8 lg:px-12 flex flex-col gap-4">
        <span className='font-light text-sm text-[#555] uppercase'>GlobalFreelance - GRAPHICS & DESIGN </span>
        <h1 className='text-3xl md:text-4xl lg:text-5xl font-bold'>AI Artists</h1>
        <p className='text-gray-600 font-light text-base'>Explore the boundaries of art and technlogy with GlobalFreelance's AI Artists</p>
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-5">
          <div className="flex flex-col md:flex-row items-center gap-3 text-gray-500 font-light">
            <span>Budget</span>
            <input className='p-1 border border-solid rounded outline-none' ref={minRef} type="text" placeholder='Min' />
            <input className='p-1 border border-solid rounded outline-none' ref={maxRef} type="text" placeholder='Max' />
            <button className='flex py-1 px-2 bg-[#1dbf73] text-white border-none font-medium rounded cursor-pointer' onClick={apply}>Apply</button>
          </div>
          <div className="relative flex items-center gap-3">
            <span className='text-gray-500 font-light'>SortBy</span>
            <div className="font-medium">{sort === "sales" ? "Best Selling" : "Newest"}</div>
            <img className='w-4 cursor-pointer' src="./img/down.png" alt="" onClick={() => setOpen(!open)} />
            {open && (
            <div className="p-5 bg-white border border-gray-200 rounded-md absolute top-7 right-0 z-10 flex flex-col gap-5 text-gray-500">
              {sort === "sales" ? (
              <span className='cursor-pointer' onClick={() => reSort("createdAt")}>Newest</span>
              ) : (
              <span className='cursor-pointer' onClick={() => reSort("sales")}>Best Selling</span>
              )}
              <span className='cursor-pointer' onClick={() => reSort("sales")}>Popular</span>
            </div>
            )}
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {isLoading
            ? "loading"
            : error
            ? "Something went wrong!"
            : data.map((gig) => <GigCard key={gig._id} item={gig} />)}
        </div>
      </div>
    </div>
  )
}

export default Gigs