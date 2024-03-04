import React from 'react'
import { useNavigate } from 'react-router-dom'

const UserRowComponent = ({name,email,imglink,user_id}) => {
    const navigate=useNavigate()
    return (
        <>
            <div className="w-[100%] py-2 border-b-[0.1px] border-gray-300 flex flex-row items-center bg-white">
                <div className="w-[25%] h-auto flex justify-center" onClick={()=>{
                    navigate(`/home/user/${user_id}`)
                }}>
                    {
                        imglink != null && imglink !== undefined?
                        <img src={imglink} className='rounded-full w-[40px] h-[40px] bg-black' alt=''/>
                        :
                        <img  className='rounded-full w-[40px] h-[40px] bg-black' alt=''/>
                    }
                </div>
                <div className="flex flex-col w-[75%]" onClick={()=>{
                    navigate(`/home/user/${user_id}`)
                }}>
                    <p className="text-sm font-semibold">{name}</p>
                    <p className="text-[10px] font-semibold text-gray-400"> {email} </p>
                </div>
            </div>
        </>
    )
}

export default UserRowComponent
