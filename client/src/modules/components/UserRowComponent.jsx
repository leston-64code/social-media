import React from 'react'

const UserRowComponent = ({name,email,imglink}) => {
    return (
        <>
            <div className="w-[100%] py-2 border-b-[0.1px] border-gray-300 flex flex-row items-center bg-white">
                <div className="w-[25%] h-auto flex justify-center">
                    {
                        imglink != null && imglink !== undefined?
                        <img src={imglink} className='rounded-full w-[40px] h-[40px] bg-black' />
                        :
                        <img  className='rounded-full w-[40px] h-[40px] bg-black' />
                    }
                </div>
                <div className="flex flex-col w-[75%]">
                    <p className="text-sm font-semibold">{name}</p>
                    <p className="text-[10px] font-semibold text-gray-400"> {email} </p>
                </div>
            </div>
        </>
    )
}

export default UserRowComponent
