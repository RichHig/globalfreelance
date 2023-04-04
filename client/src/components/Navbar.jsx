import React, {useState} from 'react'
import { Link, useNavigate} from "react-router-dom";
import newRequest from '../utils/newRequest';
import { FaBars, FaTimes } from "react-icons/fa"
import { AiOutlineMenu } from "react-icons/ai"

const Navbar = () => {
  
  const [open, setOpen] = useState(false);
  const [nav, setNav] = useState(false)
  const currentUser = JSON.parse(localStorage.getItem("currentUser"))
  const navigate = useNavigate()
  const handleClick = () => setInterval(!nav)

  const handleLogout = async () => {
    try {
      await newRequest.post("/auth/logout")
      localStorage.setItem("currentUser", null)
      navigate("/")
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className='max-w-[1640px] mx-auto flex justify-between items-center p-4 bg-[#15DB95]'>
    {/* left side */}
    <div className='font-bold w-24 text-lg text-white'>
      <Link to='/'>
      <span>GlobalFreelance</span>
      </Link>
    </div>
    {/* right side  */}
  
    <div className='sm:flex items-center gap-6 font-medium text-white'>
      <span className='whitespace-nowrap hidden sm:flex cursor-pointer'>Explore Gigs</span>
      {!currentUser?.isSeller && <span className='hidden sm:flex cursor-pointer'>Become a Freelancer</span>}
      {currentUser ? (
            <div className="flex items-center gap-3 cursor-pointer relative" onClick={()=>setOpen(!open)}>
              <img
              className='w-8 h-8 rounded-full object-cover'
                src={currentUser.img || "../img/noavatar.jpg"}
                alt=""
              />
              <span>{currentUser?.username}</span>
              {open && <div className="absolute top-12 right-0 p-5 bg-white rounded-xl z-50 border border-gray-300 flex flex-col gap-3 w-52 font-normal text-gray-500">
                {currentUser.isSeller && (
                  <>
                    <Link className="link" to="/mygigs">
                      Gigs
                    </Link>
                    <Link className="link" to="/add">
                      Add New Gig
                    </Link>
                  </>
                )}
                <Link className="link" to="/orders">
                  Orders
                </Link>
                <Link className="link" to="/messages">
                  Messages
                </Link>
                <Link className="link" onClick={handleLogout}>
                  Logout
                </Link>
              </div>}
            </div>
          ) : (
            <div className='flex items-center mr-6'>
              <Link to="/login" className='pr-2'>Sign in</Link>
              <Link className="link" to="/register">
              <button className='py-1 px-5 border border-solid cursor-pointer bg-white text-green-400 rounded-md  hover:bg-green-300 hover:text-white'>Join</button>
              </Link>
            </div>
          )}
    </div>
    
   
    </div>
    
    
  )
}

export default Navbar