import React from 'react'
import Navbar from './Navbar'
import BottomMenu from './BottomMenu'
import { Outlet } from 'react-router-dom'
import { Toaster } from 'react-hot-toast';

const MainLayout = () => {
    return (
        <>
            <div className='w-screen h-screen maindiv flex flex-col'>
                <Navbar />
                <div className='flex-1 overflow-y-auto'>
                    <Outlet />
                </div>
                <BottomMenu />
            </div>
            <Toaster />
        </>
    )
}

export default MainLayout
