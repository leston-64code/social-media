import React from 'react'
import { SiLoop } from "react-icons/si"
import { RxHamburgerMenu } from "react-icons/rx";

const Navbar = () => {
  return (
    <>
      <div className='flex flex-row h-12 bg-black'>
        <div className='md:w-[25%] w-[50%] h-auto  flex flex-row items-center justify-center'>
          <SiLoop className="md:w-[30px] md:h-[30px] text-4xl align-middle animate-spin text-red-500" />
          <p className='font-semibold ml-5 text-white'>LinkLoop</p>
        </div>
        <div className='md:w-[75%] w-[50%] h-auto '>
          <RxHamburgerMenu />
        </div>
      </div>
    </>
  )
}

export default Navbar
