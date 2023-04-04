import React from 'react'

const Footer = () => {
  return (
    <footer className="bg-[#15DB95] py-6 md:py-12">
      <div className="container mx-auto text-white flex flex-col md:flex-row items-center justify-between">
        {/* logo  */}
        <h1 className="text-xl md:text-2xl font-medium mb-4 md:mb-0">GlobalFreelance</h1>
        
        <p className="text-sm md:text-base">
          Copyright &copy; 2023.
          All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;


