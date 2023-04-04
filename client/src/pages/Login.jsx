import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
import newRequest from "../utils/newRequest";


const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await newRequest.post("/auth/login", { username, password });
      localStorage.setItem("currentUser", JSON.stringify(res?.data));
      navigate("/")
    } catch (err) {
      console.log(err)
      setError(err.response?.data);
    }
  };

  return (
    <div className="flex items-center justify-center">
      <form className='w-[360px] py-[100px] px-0 flex flex-col gap-5' onSubmit={handleSubmit}>
        <h1 className='text-gray-700 mb-5 text-2xl font-extrabold'>Sign in</h1>
        <label className='text-gray-600 text-lg' htmlFor="">Username</label>
        <input className='p-5 border border-solid'
          name="username"
          type="text"
          placeholder="johndoe"
          onChange={(e) => setUsername(e.target.value)}
        />

        <label className='text-gray-600 text-lg' htmlFor="">Password</label>
        <input className='p-5 border border-solid'
          name="password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className='border-none p-5 text-white font-medium text-lg bg-[#1dbf73] cursor-pointer hover:bg-green-600' type="submit">Login</button>
        {error && error}
      </form>
    </div>
  );
}

export default Login