import { AiFillHome } from "react-icons/ai";
import { IoMdSearch } from "react-icons/io";
import { FaUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const BottomMenu = () => {
    const navigate=useNavigate()
    return (
        <>
            <div className='flex flex-row h-12 items-center bg-black'>
                <div className='w-[33.3%] h-full flex items-center justify-center text-2xl hover:cursor-pointer text-white'>
                    <AiFillHome onClick={()=>{
                        navigate("/home")
                    }}/>
                </div>
                <div className='w-[33.3%] h-full flex items-center justify-center text-2xl hover:cursor-pointer text-white'>
                    <IoMdSearch onClick={()=>{
                        navigate("/home/search")
                    }}/>
                </div>
                <div className='w-[33.3%] h-full flex items-center justify-center text-2xl hover:cursor-pointer text-white'>
                    <FaUserCircle onClick={()=>{
                        navigate("/home/profile")
                    }}/>
                </div>
            </div>
        </>
    )
}

export default BottomMenu
