import React, { useReducer, useState }  from 'react'
import { gigReducer, INITIAL_STATE } from "../reducers/gigReducer"
import upload from '../utils/upload';
import { useMutation, useQueryClient } from "@tanstack/react-query";
import newRequest from '../utils/newRequest';
import { useNavigate } from "react-router-dom";


const Add = () => {

  const [singleFile, setSingleFile] = useState(undefined);
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);

  const [state, dispatch] = useReducer(gigReducer, INITIAL_STATE);

  const handleChange = (e) => {
    dispatch({
      type: "CHANGE_INPUT",
      payload: { name: e.target.name, value: e.target.value },
    });
  };
  const handleFeature = (e) => {
    e.preventDefault();
    dispatch({
      type: "ADD_FEATURE",
      payload: e.target[0].value,
    });
    e.target[0].value = "";
  };

  const handleUpload = async () => {
    setUploading(true);
    try {
      const cover = await upload(singleFile);

      const images = await Promise.all(
        [...files].map(async (file) => {
          const url = await upload(file);
          return url;
        })
      );
      setUploading(false);
      dispatch({ type: "ADD_IMAGES", payload: { cover, images } });
    } catch (err) {
      console.log(err);
    }
  };

  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (gig) => {
      return newRequest.post("/gigs", gig);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["myGigs"]);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate(state);
    // navigate("/mygigs")
  };

  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8"> 
      <div className="max-w-screen-lg mx-auto py-8 px-4"> 
        <h1 className='text-3xl text-gray-700 font-light mb-6'>Add New Gig</h1> 

        <div className="flex flex-col gap-6 md:flex-row md:justify-between">
          <div className="flex-grow flex flex-col gap-4">
            <label htmlFor="" className='text-gray text-lg '>Title</label>
            <input
            className='p-4 border border-solid'
              type="text"
              name="title"
              placeholder="e.g. I will do something I'm really good at"
              onChange={handleChange}
            />
            <label htmlFor="" className='text-gray text-lg'>Category</label>
            <select name="cat" id="cat" onChange={handleChange} className='p-5 border border-solid'>
              <option value="design">Design</option>
              <option value="web">Web Development</option>
              <option value="animation">Animation</option>
              <option value="music">Music</option>
            </select>
            <div className="">
              <div className="flex flex-col gap-4">
                <label htmlFor="" className='text-gray text-lg'>Cover Image</label>
                <input
                className='p-4'
                  type="file"
                  onChange={(e) => setSingleFile(e.target.files[0])}
                />
                <label htmlFor="" className='text-gray text-lg'>Upload Images</label>
                <input
                className='p-4'
                  type="file"
                  multiple
                  onChange={(e) => setFiles(e.target.files)}
                />
              </div>
              <button onClick={handleUpload} className='border-none p-4 text-white font-medium text-lg bg-[#1dbf73] cursor-pointer'>
                {uploading ? "uploading" : "Upload"}
              </button>
            </div>
            <label htmlFor="" className='text-gray text-lg'>Description</label>
            <textarea
            className='p-4 border border-solid'
              name="desc"
              id=""
              placeholder="Brief descriptions to introduce your service to customers"
              cols="0"
              rows="16"
              onChange={handleChange}
            ></textarea>
            <button onClick={handleSubmit} className='border-none p-4 text-white font-medium text-lg bg-[#1dbf73] cursor-pointer'>Create</button>
          </div>
          <div className="flex-grow flex flex-col gap-4">
            <label htmlFor="" className='text-gray text-lg'>Service Title</label>
            <input
            className='p-4 border border-solid'
              type="text"
              name="shortTitle"
              placeholder="e.g. One-page web design"
              onChange={handleChange}
            />
            <label htmlFor="" className='text-gray text-lg'>Short Description</label>
            <textarea
            className='p-4 border border-solid'
              name="shortDesc"
              onChange={handleChange}
              id=""
              placeholder="Short description of your service"
              cols="30"
              rows="10"
            ></textarea>
            <label htmlFor="" className='text-gray text-lg'>Delivery Time (e.g. 3 days)</label>
            <input type="number" name="deliveryTime" onChange={handleChange} className='p-4 border border-solid' />
            <label htmlFor="" className='text-gray text-lg'>Revision Number</label>
            <input
            className='p-4 border border-solid'
              type="number"
              name="revisionNumber"
              onChange={handleChange}
            />
            <label htmlFor="" className='text-gray text-lg'>Add Features</label>
            <form action="" className="flex justify-between" onSubmit={handleFeature}>
              <input type="text" placeholder="e.g. page design" className='w-[80%] border border-solid' />
              <button type="submit">add</button>
            </form>
            <div className="flex gap-5">
              {state?.features?.map((f) => (
                <div className="item" key={f}>
                  <button
                  className='h-8 text-xs font-normal bg-transparent text-red-600 border-solid flex items-center gap-5'
                    onClick={() =>
                      dispatch({ type: "REMOVE_FEATURE", payload: f })
                    }
                  >
                    {f}
                    <span>X</span>
                  </button>
                </div>
              ))}
            </div>
            <label htmlFor="" className='text-gray text-lg'>Price</label>
            <input type="number" onChange={handleChange} name="price" className='p-5 border border-solid' />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Add