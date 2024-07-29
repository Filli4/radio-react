
import React from 'react';

const SkeletonLoader = () => {
  return (
    <div className='m-4 sm:m-2'>
    <div className="bg-slate-700 h-[550px] w-72 sm:w-96 md:w-[400px] lg:w-[450px] rounded-xl animate-pulse flex flex-col justify-center items-center  m-2">
    <div className="w-56 h-52 bg-slate-400 rounded-2xl flex sm:w-64 sm:h-60 md:w-72 md:h-64 lg:w-80 lg:h-72 m-2"></div>

    <div className="w-24 h-10 my-5 bg-slate-400 rounded flex sm:w-28 sm:h-12 md:w-32 md:h-14 lg:w-36 lg:h-16 m-2"></div>

      
    <div className="w-64 mt-12 h-32 bg-slate-500 rounded flex sm:w-72 sm:h-36 md:w-80 md:h-40 lg:w-96 lg:h-48 m-2"></div>

           
     
      
    </div>
    </div>
  );
};

export default SkeletonLoader;
