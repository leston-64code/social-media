import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2'
import { MdAddAPhoto } from "react-icons/md";
import UserListModal from '../components/UserListModal'
import "./style.css"
import axios from 'axios';
import toast from 'react-hot-toast';
import { loadingtoastOptions, successtoastOptions } from '../../utils/toastOptions';
import Loading from '../components/Loading';


const ProfilePage = () => {

    const [followersModal, setFollowersModal] = useState(false)
    const [followingModal, setFollowingModal] = useState(false)

    const [userProfile,setUserProfile]=useState(null)
    const [posts,setPosts]=useState(null)

    const [loading, setLoading] = useState(true)

    async function getFullProfile() {
        setLoading(true)
        const loading = toast.loading('Please wait...',loadingtoastOptions);
        try {
            await axios.get(`${process.env.REACT_APP_BASE_URL}/api/profile/getfullprofile/${localStorage.getItem("user_id")}`).then((res) => {
                if (res.data.success === true) {
                    setUserProfile(res?.data?.profile?.user)
                    setPosts(res?.data?.profile?.posts)
                    setLoading(false)
                    toast.success('Profile fetched', successtoastOptions);
                    toast.dismiss(loading)
                }else{
                    setLoading(false)
                    toast.error('Could not fetch', successtoastOptions);
                    toast.dismiss(loading)
                }
            }).catch((error) => {
                setLoading(false)
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: "An error occured"
                });
            })
        } catch (error) {

        }
    }

    const handleUpload = async (file) => {
        try {
            const formData = new FormData();
            formData.append('file', file);

            const response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/profile/uploadprofilepicture/${localStorage.getItem("user_id")}`, {
                method: 'POST',
                body: formData
            });

            if (response.ok) {
                const data = await response.json();
                if (data.success) {
                    getFullProfile()
                    Swal.fire({
                        icon: 'success',
                        title: 'Success',
                        text: 'Profile picture uploaded successfully'
                    });
                } else {

                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: data.message || 'An error occurred while uploading the profile picture'
                    });
                }
            } else {

                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Failed to upload profile picture. Please try again later.'
                });
            }
        } catch (error) {

            console.error('Error uploading profile picture:', error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Failed to upload profile picture. Please check your internet connection and try again.'
            });
        }
    };

    const handleUploadButtonClick = async () => {
        try {
            const { value: file } = await Swal.fire({
                title: 'Select image',
                input: 'file',
                inputAttributes: {
                    accept: 'image/*',
                    'aria-label': 'Upload your profile picture'
                }
            });

            if (file) {
                handleUpload(file);
            }
        } catch (error) {
            console.error('Error selecting file:', error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Failed to select file. Please try again.'
            });
        }
    };

    
    const handlePostUpload = async (file) => {
        try {
            const formData = new FormData();
            formData.append('file', file);

            const response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/post/create/${localStorage.getItem("user_id")}`, {
                method: 'POST',
                body: formData
            });

            if (response.ok) {
                const data = await response.json();
                if (data.success) {
                    getFullProfile()
                    Swal.fire({
                        icon: 'success',
                        title: 'Success',
                        text: 'Posted successfully'
                    });
                } else {

                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: data.message || 'An error occurred while posting picture'
                    });
                }
            } else {

                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Failed to post picture. Please try again later.'
                });
            }
        } catch (error) {

            console.error('Error uploading profile picture:', error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Failed to upload profile picture. Please check your internet connection and try again.'
            });
        }
    };

    const handlePostUploadButtonClick = async () => {
        try {
            const { value: file } = await Swal.fire({
                title: 'Select image',
                input: 'file',
                inputAttributes: {
                    accept: 'image/*',
                    'aria-label': 'Choose photo'
                }
            });

            if (file) {
                handlePostUpload(file);
            }
        } catch (error) {
            console.error('Error selecting file:', error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Failed to select file. Please try again.'
            });
        }
    };

    useEffect(()=>{
        getFullProfile()
    },[])

    return (
        <>
            {
                followersModal === true ? <UserListModal closeModal={setFollowersModal} /> : null
            }
            {
                followingModal === true ? <UserListModal closeModal={setFollowingModal} /> : null
            }

            {
                loading === true ?
                    <>
                        <Loading />
                    </>
                    :
                    <>
                        <div className="w-full h-[250px] backgoundSVG bg-black" >
                            {/* style={{ "backgroundImage": "linear-gradient(to top, #6a85b6 0%, #bac8e0 100%)" }} */}
                            {/* <img src={require("./wave-haikei (2).svg")} /> */}
                        </div>


                        <div className='flex md:flex-row flex-col  -mt-20 bg-black'>
                            <div className='md:w-[35%] w-[100%] bg-blue-00 flex flex-col justify-center items-center'>
                                {
                                    userProfile?.compressed_full_pic !== null ?
                                    <img src={userProfile?.compressed_full_pic} className="md:ml-[10%] md:w-64 md:h-64 w-28 h-28 border-4 border-white rounded-full" alt="" style={{ objectFit: 'cover' }} />
                                    : 
                                    <img className="ml-[10%] w-64 border-4 border-white rounded-full" src={require("./assets/useicon.webp")} alt="" />
                                }
                                <p className='text-2xl mt-2 font-semibold  w-full text-center text-white'>{userProfile?.name}Leston Aaron Salis</p>
                            </div>
                            <div className='md:w-[65%] w-[100%] bg-red-00 '>

                                <div className='flex flex-row mt-10' >
                                    <div className='w-44 h-28 md:ml-8 border-[1px] border-lack flex md:flex-col flex-col-reverse items-center justify-center rounded-lg shadow-md md:bg-white md:text-black text-white bg-black border-none'>
                                        <p className='text-gray-600 text-md font-semibold'>Posts</p>
                                        <p className='text-white md:text-black font-bold text-4xl'>{userProfile?.no_of_posts}5</p>
                                    </div>
                                    <div className='w-44 h-28 md:ml-8 border-[1px] border-lack flex md:flex-col flex-col-reverse items-center justify-center rounded-lg shadow-md md:bg-white md:text-black text-white bg-black border-none hover:cursor-pointer' onClick={() => {
                                        setFollowersModal(true)
                                    }}>
                                        <p className='text-gray-600 text-md font-semibold'>Followers</p>
                                        <p className='text-white md:text-black font-bold text-4xl'>{userProfile?.no_of_followers}74</p>
                                    </div>
                                    <div className='w-44 h-28 md:ml-8 border-[1px] border-lack flex md:flex-col flex-col-reverse items-center justify-center rounded-lg shadow-md md:bg-white md:text-black text-white bg-black border-none hover:cursor-pointer' onClick={() => {
                                        setFollowingModal(true)
                                    }}>
                                        <p className='text-gray-600 text-md font-semibold'>Follwing</p>
                                        <p className='text-white md:text-black font-bold text-4xl'>{userProfile?.no_of_following}98</p>
                                    </div>
                                </div>
                                <div className='flex flex-row flex-wrap bg-blue-0 mt-5 md:pl-12 md:justify-normal justify-center'>
                                    {/* <button type="button" class="text-green-700 hover:text-white border border-green-700 hover:bg-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 ">Follow</button> */}
                                    <button type="button" class="text-red-700 hover:text-white border border-red-700 hover:bg-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Edit Profile</button>
                                    <button type="button" class="text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2" onClick={handleUploadButtonClick}>Upload Profile Picture</button>
                                </div>
                            </div>
                        </div>

                        <div className='w-full items-center flex justify-center'>
                            <button type="button" class="text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 flex align-middle" onClick={()=>{
                                handlePostUploadButtonClick()
                            }}>Create a post <MdAddAPhoto className='inline-block text-xl ml-3' /></button>
                        </div>

                        <div className='w-[65%] h-auto m-auto mt-10  flex flex-row flex-wrap mb-10 items-center justify-center'>
                            {
                                posts?.map((ele, index) => {
                                    return <div className='border-[1px] border-black w-36 h-36'>
                                            <img className='w-[100%] h-[100%]' style={{"objectFit":"cover"}} src={ele.com_img_link} alt="" />
                                    </div>
                                })
                            }
                        </div>
                    </>
            }

        </>
    )
}

export default ProfilePage
