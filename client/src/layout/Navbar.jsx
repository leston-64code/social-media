import React from 'react'
import { SiLoop } from "react-icons/si"
import { RxHamburgerMenu } from "react-icons/rx";

const Navbar = () => {
  return (
    <>
      <div className='flex flex-row h-12 bg-black'>
        <div className='w-[25%] h-auto  flex flex-row items-center justify-center'>
          <SiLoop className="w-[30px] h-[30px] align-middle animate-spin text-red-500" />
          <p className='font-semibold ml-5 text-white'>LinkLoop</p>
        </div>
        <div className='w-[75%] h-auto '>
          <RxHamburgerMenu />
        </div>
      </div>
    </>
  )
}

export default Navbar
