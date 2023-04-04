import React from 'react'

const Works = () => {
  return (
    <div className='max-w-screen-lg h-auto m-auto px-4 py-12 bg-white'>
      <div className='mx-auto text-base sm:flex sm:flex-wrap items-center justify-center'>
        <div className='sm:w-1/2 sm:pr-8'>
          <h1 className='text-2xl font-medium mb-6'>Global Freelance provides global talent at a click</h1>
          <div className='my-4'>
            <div className="flex items-center font-medium text-lg">
              <img src="./img/check.png" alt="" />
              <span>The best for every budget</span>
            </div>
            <p className='py-2'>
              Find high-quality services at every price point. No hourly rates,
              just project-based pricing.
            </p>
          </div>
          <div className='my-4'>
            <div className="flex items-center font-medium text-lg">
              <img src="./img/check.png" alt="" />
              <span>Quality work done quickly</span>
            </div>
            <p className='py-2'>
              Find the right freelancer to begin working on your project within
              minutes.
            </p>
          </div>
          <div className='my-4'>
            <div className="flex items-center font-medium text-lg">
              <img src="./img/check.png" alt="" />
              <span>Protected payments, every time</span>
            </div>
            <p className='py-2'>
              Always know what you'll pay upfront. Your payment isn't released
              until you approve the work.
            </p>
          </div>
          <div className='my-4'>
            <div className="flex items-center font-medium text-lg">
              <img src="./img/check.png" alt="" />
              <span>24/7 support</span>
            </div>
            <p className='py-2'>
              Get help with any questions or problems you have, whenever you
              need it.
            </p>
          </div>
        </div>
        <div className='sm:w-1/2'>
          <img src="https://images.pexels.com/photos/6476808/pexels-photo-6476808.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="" className='w-full sm:max-w-full md:max-w-2xl md:max-h-screen' />
        </div>
      </div>
    </div>
  )
}

export default Works