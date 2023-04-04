import React from 'react'
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import newRequest from "../utils/newRequest"
import Review from './Review';

const Reviews = ({ gigId }) => {

    const queryClient = useQueryClient()
    const { isLoading, error, data } = useQuery({
      queryKey: ["reviews"],
      queryFn: () =>
        newRequest.get(`/reviews/${gigId}`).then((res) => {
          return res.data;
        }),
    });
  
    const mutation = useMutation({
      mutationFn: (review) => {
        return newRequest.post("/reviews", review);
      },
      onSuccess:()=>{
        queryClient.invalidateQueries(["reviews"])
      }
    });
  
    const handleSubmit = (e) => {
      e.preventDefault();
      const desc = e.target[0].value;
      const star = e.target[1].value;
      mutation.mutate({ gigId, desc, star });
    };
  
    return (
      <div className="mt-[50px]">
        <h2>Reviews</h2>
        {isLoading
          ? "loading"
          : error
          ? "Something went wrong!"
          : data.map((review) => <Review key={review._id} review={review} />)}
        <div className="mt-5 flex flex-col gap-5">
          <h3>Add a review</h3>
          <form action="" className="flex flex-col gap-5 border border-solid" onSubmit={handleSubmit}>
            <input type="text" placeholder="write your opinion" className='p-5' />
            <select className='w-[200px] p-5 self-end' name="" id="">
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
              <option value={4}>4</option>
              <option value={5}>5</option>
            </select>
            <button className='self-end w-[100px] border-none p-3 text-white bg-[#1dbf73] cursor-pointer'>Send</button>
          </form>
        </div>
      </div>
    );
  };

export default Reviews