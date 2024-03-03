import React from 'react'
import { IoIosCloseCircleOutline } from "react-icons/io";
import UserRowComponent from './UserRowComponent';

const UserListModal = ({ closeModal }) => {
    return (
        <>
            <div className='absolute top-0 left-0 w-screen h-screen bg-white bg-opacity-75'>
                <IoIosCloseCircleOutline className=' text-red-500 m-auto hover:text-white hover:bg-red-500 hover:cursor-pointer text-4xl' onClick={() => {
                    closeModal(false)
                }} />
                <div className='w-[100%] h-[85%] overflow-y-auto' >
                <UserRowComponent/>
                <UserRowComponent/>
       
                </div>
            </div>

        </>
    )
}

export default UserListModal
