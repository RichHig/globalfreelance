import React from 'react'
import { useQuery } from "@tanstack/react-query";
import newRequest from "../utils/newRequest"
import { useNavigate } from "react-router-dom";

const Orders = () => {

  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  const navigate = useNavigate();

  const { isLoading, error, data } = useQuery({
    queryKey: ["orders"],
    queryFn: () =>
      newRequest.get(`/orders`).then((res) => {
        return res.data;
      }),
  });

  const handleContact = async (order) => {
    const sellerId = order.sellerId;
    const buyerId = order.buyerId;
    const id = sellerId + buyerId;

    try {
      const res = await newRequest.get(`/conversations/single/${id}`);
      navigate(`/message/${res.data.id}`);
    } catch (err) {
      if (err.response.status === 404) {
        const res = await newRequest.post(`/conversations/`, {
          to: currentUser.seller ? buyerId : sellerId,
        });
        navigate(`/message/${res.data.id}`);
      }
    }
  };

  return (
    <div className="flex justify-center text-[#555]">
      {isLoading ? (
        "loading"
      ) : error ? (
        "error"
      ) : (
        <div className="w-full py-14 px-0">
          <div className="flex justify-between">
            <h1>Orders</h1>
          </div>
          <table className='w-full'>
            <tr className='h-[50px]'>
              <th className='text-left'>Image</th>
              <th className='text-left'>Title</th>
              <th className='text-left'>Price</th>
              <th className='text-left'>Contact</th>
            </tr>
            {data.map((order) => (
              <tr key={order._id}>
                <td>
                  <img className="w-[50px] h-[25px] object-cover" src={order.img} alt="" />
                </td>
                <td>{order.title}</td>
                <td>{order.price}</td>
                <td>
                  <img
                    className="w-[25px] cursor-pointer"
                    src="./img/message.png"
                    alt=""
                    onClick={() => handleContact(order)}
                  />
                </td>
              </tr>
            ))}
          </table>
        </div>
      )}
    </div>
  );
};

export default Orders