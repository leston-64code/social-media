import React, { useState } from 'react'
import Swal from 'sweetalert2'
import { MdAddAPhoto } from "react-icons/md";
import UserListModal from '../components/UserListModal'

const ProfilePage = () => {
    const [followersModal, setFollowersModal] = useState(false)
    const [followingModal, setFollowingModal] = useState(false)

    return (
        <>
            {
                followersModal === true ? <UserListModal closeModal={setFollowersModal} /> : null
            }
            {
                followingModal === true ? <UserListModal closeModal={setFollowingModal} /> : null
            }

            <div className="w-full h-[250px]" style={{ "backgroundImage": "linear-gradient(to top, #6a85b6 0%, #bac8e0 100%)" }}>

                {/* <img src="https://vojislavd.com/ta-template-demo/assets/img/profile-background.jpg" className="w-full h-full rounded-tl-lg rounded-tr-lg" /> */}
            </div>


            <div className='flex flex-row -mt-24 bg-blue'>
                <div className='w-[35%] bg-blue-00 flex flex-col justify-center items-center'>
                    <img src="https://vojislavd.com/ta-template-demo/assets/img/profile.jpg" className="ml-[10%] w-64 border-4 border-white rounded-full" alt="" />
                    <p className='text-2xl mt-2 font-semibold  w-full text-center'>Leston Aaron Salis</p>
                </div>
                <div className='w-[65%] bg-red-00 '>

                    <div className='flex flex-row mt-10' >
                        <div className='w-44 h-28 ml-8 border-[1px] border-lack flex flex-col items-center justify-center rounded-lg shadow-md bg-white'>
                            <p className='text-gray-600 text-md font-semibold'>Posts</p>
                            <p className='text-black font-bold text-4xl'>25</p>
                        </div>
                        <div className='w-44 h-28 ml-8 border-[1px] border-lack flex flex-col items-center justify-center rounded-lg shadow-md bg-white hover:cursor-pointer' onClick={() => {
                            setFollowersModal(true)
                        }}>
                            <p className='text-gray-600 text-md font-semibold'>Followers</p>
                            <p className='text-black font-bold text-4xl'>25</p>
                        </div>
                        <div className='w-44 h-28 ml-8 border-[1px] border-lack flex flex-col items-center justify-center rounded-lg shadow-md bg-white hover:cursor-pointer' onClick={() => {
                            setFollowingModal(true)
                        }}>
                            <p className='text-gray-600 text-md font-semibold'>Follwing</p>
                            <p className='text-black font-bold text-4xl'>25</p>
                        </div>
                    </div>
                    <div className='flex flex-row bg-blue-0 mt-5 pl-12'>
                        <button type="button" class="text-green-700 hover:text-white border border-green-700 hover:bg-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 ">Follow</button>
                        <button type="button" class="text-red-700 hover:text-white border border-red-700 hover:bg-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Edit Profile</button>
                        <button type="button" class="text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2" onClick={async () => {
                            const { value: file } = await Swal.fire({
                                title: "Select image",
                                input: "file",
                                inputAttributes: {
                                    "accept": "image/*",
                                    "aria-label": "Upload your profile picture"
                                }
                            });
                            if (file) {
                                const reader = new FileReader();
                                reader.onload = (e) => {
                                    Swal.fire({
                                        title: "Your uploaded picture",
                                        imageUrl: e.target.result,
                                        imageAlt: "The uploaded picture"
                                    });
                                };
                                reader.readAsDataURL(file);
                            }
                        }}>Upload Profile Picture</button>
                    </div>
                </div>
            </div>

            <div className='w-full items-center flex justify-center'>
            <button type="button" class="text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 flex align-middle" onClick={async () => {
                const { value: file } = await Swal.fire({
                    title: "Select an image",
                    input: "file",
                    inputAttributes: {
                        "accept": "image/*",
                        "aria-label": "Upload your post"
                    }
                });
                if (file) {
                    const reader = new FileReader();
                    reader.onload = (e) => {
                        Swal.fire({
                            title: "Your uploaded post",
                            imageUrl: e.target.result,
                            imageAlt: "The uploaded picture"
                        });
                    };
                    reader.readAsDataURL(file);
                }
            }}>Create a post <MdAddAPhoto className='inline-block text-xl ml-3'/></button>
            </div>

            <div className='w-[65%] h-auto m-auto mt-10  flex flex-row flex-wrap'>
                {
                    [...new Array(20)].map((ele, index) => {
                        return <div className='border-[1px] border-black w-36 h-36'>

                        </div>
                    })
                }
            </div>

        </>
    )
}

export default ProfilePage
