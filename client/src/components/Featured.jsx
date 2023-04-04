import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";

const Featured = () => {

  const [input, setInput] = useState("");
  const navigate = useNavigate();

  const handleSubmit = () => {
    navigate(`/gigs?search=${input}`);
  };

        return (
            <div className="max-w-[1640px] mx-auto p-4">
              <div className="max-h-[500px] relative">
                {/* Overlay */}
                <div className="absolute w-full h-full text-gray-200 max-h-[500px] bg-black/30 flex flex-col justify-center">
                  <h1 className="px-4 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold">
                    The <span className="text-[#15DB95]">Best</span>
                  </h1>
                  <h1 className="px-4 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold">
                    {" "}
                    <span className="text-[#15DB95]">Global</span> Talent!
                  </h1>

                    {/* Search bar */}
          <div className="flex flex-col sm:flex-row justify-center mt-4">
            <input
              type="text"
              className="border border-grey-400 text-gray-700 py-2 px-4 rounded-md w-full max-w-md"
              placeholder="Search for Gigs"
              onChange={(e) => setInput(e.target.value)}
            />
          
          <button className='w-[120px] h-14 border-none bg-[#15DB95] text-white self-end cursor-pointer' onClick={handleSubmit}>Search</button>
          </div>
                </div>
            
                <img
                  className="w-full max-h-[500px] object-cover"
                  src="./img/globalfreelance.jpeg"
                  alt="hero section"
                />
              </div>
            
            </div>
          );
        };

export default Featured