import React from 'react'
import { Link } from 'react-router-dom'
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import newRequest from '../utils/newRequest';
import getCurrentUser from "../utils/getCurrentUser"

const MyGigs = () => {

  const currentUser = getCurrentUser();

  const queryClient = useQueryClient();

  const { isLoading, error, data } = useQuery({
    queryKey: ["myGigs"],
    queryFn: () =>
      newRequest.get(`/gigs?userId=${currentUser._id}`).then((res) => {
        return res.data;
      }),
  });

  const mutation = useMutation({
    mutationFn: (id) => {
      return newRequest.delete(`/gigs/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["myGigs"]);
    },
  });

  const handleDelete = (id) => {
    mutation.mutate(id);
  };

  return (
    <div className="flex justify-center text-[#555]">
      {isLoading ? (
        "loading"
      ) : error ? (
        "error"
      ) : (
        <div className="w-[1400px] py-[50px] px-0">
          <div className="flex justify-between">
            <h1>Gigs</h1>
            {currentUser.isSeller && (
              <Link to="/add">
                <button className='bg-[#1dbf73] text-white font-medium border-none p-3 cursor-pointer'>Add New Gig</button>
              </Link>
            )}
          </div>
          <table className='w-full'>
            <tr className='h-14'>
              <th className='text-left'>Image</th>
              <th className='text-left'>Title</th>
              <th className='text-left'>Price</th>
              <th className='text-left'>Sales</th>
              <th className='text-left'>Action</th>
            </tr>
            {data.map((gig) => (
              <tr key={gig._id}>
                <td>
                  <img className="w-[50px] h-6 object-cover" src={gig.cover} alt="" />
                </td>
                <td>{gig.title}</td>
                <td>{gig.price}</td>
                <td>{gig.sales}</td>
                <td>
                  <img
                    className="w-5 cursor-pointer"
                    src="./img/delete.png"
                    alt=""
                    onClick={() => handleDelete(gig._id)}
                  />
                </td>
              </tr>
            ))}
          </table>
        </div>
      )}
    </div>
  );
}

export default MyGigs