import React from 'react'
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Link, useParams } from 'react-router-dom'
import newRequest from '../utils/newRequest';

const Message = () => {

  const { id } = useParams();
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  const queryClient = useQueryClient();

  const { isLoading, error, data } = useQuery({
    queryKey: ["messages"],
    queryFn: () =>
      newRequest.get(`/messages/${id}`).then((res) => {
        return res.data;
      }),
  });

  const mutation = useMutation({
    mutationFn: (message) => {
      return newRequest.post(`/messages`, message);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["messages"]);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate({
      conversationId: id,
      desc: e.target[0].value,
    });
    e.target[0].value = "";
  };


  return (
    <div className="flex justify-center">
      <div className="max-w-screen-xl m-2 md:m-4 lg:m-8 lg:w-[1200px]">
        <span className="text-[#555] font-light text-sm">
          <Link to="/messages">Messages</Link> {">"} John Doe {">"}
        </span>
        {isLoading ? (
          "loading"
        ) : error ? (
          "error"
        ) : (
          <div className="my-8 mx-0 gap-5 max-w-[600px] text-lg">
            {data.map((m) => (
              <div className={m.userId === currentUser._id ? "owner item" : "item"} key={m._id}>
                <img
                  src="https://images.pexels.com/photos/270408/pexels-photo-270408.jpeg?auto=compress&cs=tinysrgb&w=1600"
                  alt=""
                  className='w-[40px] h-[40px] rounded-[50%] object-cover'
                />
                <p className='max-w-[500px] rounded-br-lg rounded-tr-lg rounded-bl-lg bg-blue-400 text-white p-3 mt-2'>{m.desc}</p>
              </div>
            ))}
          </div>
        )}
        <hr className='border border-solid border-green-400 mb-5' />
        <form className="flex flex-col md:flex-row items-center justify-between" onSubmit={handleSubmit}>
          <textarea type="text" placeholder="write a message" className='w-[80%] h-[100px] p-[10px] border border-solid border-gray-400 rounded-lg' />
          <button type="submit" className='bg-green-400 p-5 text-white font-medium border-none rounded-xl cursor-pointer w-full md:w-[100px] mt-2 md:mt-0'>Send</button>
        </form>
      </div>
    </div>
  );
};

export default Message