import React, {useState} from 'react'
import newRequest from "../utils/newRequest"
import upload from "../utils/upload"
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [file, setFile] = useState(null);
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    img: "",
    country: "",
    isSeller: false,
    desc: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setUser((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleSeller = (e) => {
    setUser((prev) => {
      return { ...prev, isSeller: e.target.checked };
    });
  };

const handleSubmit = async (e) => {
  e.preventDefault()

  const url = await upload(file);
  try {
    await newRequest.post("/auth/register", {
      ...user,
      img: url,
    });
    navigate("/")
  } catch (err) {
    console.log(err);
  }
};

  return (
    <div className="flex items-center justify-center">
      <form className='w-full md:w-3/4 lg:w-1/2 py-8 md:py-12 px-4 md:px-8 lg:px-12 flex flex-wrap gap-4 md:gap-8' onSubmit={handleSubmit}>
        {/* Left  */}
        <div className="flex flex-grow flex-col gap-3 justify-between">
          <h1 className='text-gray-400 mb-5'>Create a new account</h1>
          <label className='text-gray-400 text-lg' htmlFor="">Username</label>
          <input
          className='p-5 border border-solid'
            name="username"
            type="text"
            placeholder="johndoe"
            onChange={handleChange}
          />
          <label className='text-gray-400 text-lg' htmlFor="">Email</label>
          <input
          className='p-5 border border-solid'
            name="email"
            type="email"
            placeholder="email"
            onChange={handleChange}
          />
          <label className='text-gray-400 text-lg' htmlFor="">Password</label>
          <input className='p-5 border border-solid' name="password" type="password" onChange={handleChange} />
          <label className='text-gray-400 text-lg' htmlFor="">Profile Picture</label>
          <input className='p-5 border border-solid' type="file" onChange={(e) => setFile(e.target.files[0])} />
          <label className='text-gray-400 text-lg' htmlFor="">Country</label>
          <input
          className='p-5 border border-solid'
            name="country"
            type="text"
            placeholder="Usa"
            onChange={handleChange}
          />
          <button className='border-none p-5 text-white font-medium text-lg bg-[#1dbf73] cursor-pointer' type="submit">Register</button>
        </div>
        {/* Right  */}
        <div className="flex flex-grow flex-col gap-3 justify-between">
          <h1 className='text-gray-400 mb-5'>I want to become a seller</h1>
          <div className="flex items-center gap-3">
            <label className='text-gray-400 text-lg' htmlFor="">Activate the seller account</label>
            <label className="relative inline-block w-[50px] h-6">
              <input className='p-5 border border-solid' type="checkbox" onChange={handleSeller} />
              <span className="absolute cursor-pointer top-0 left-0 right-0 bottom-0 bg-[#ccc]"></span>
            </label>
          </div>
          <label className='text-gray-400 text-lg' htmlFor="">Phone Number</label>
          <input
          className='p-5 border border-solid'
            name="phone"
            type="text"
            placeholder="+1 234 567 89"
            onChange={handleChange}
          />
          <label className='text-gray-400 text-lg' htmlFor="">Description</label>
          <textarea
          className='p-5 border border-solid'
            placeholder="A short description of yourself"
            name="desc"
            id=""
            cols="30"
            rows="10"
            onChange={handleChange}
          ></textarea>
        </div>
      </form>
    </div>
  );
}

export default Register