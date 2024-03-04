import { useEffect, useState } from 'react'
import Swal from 'sweetalert2'
import { MdAddAPhoto } from "react-icons/md";
import "./style.css"
import axios from 'axios';
import toast from 'react-hot-toast';
import { loadingtoastOptions, successtoastOptions } from '../../utils/toastOptions';
import Loading from '../components/Loading';
import PostModal from '../components/PostModal';
import UserRowComponent from '../components/UserRowComponent';
import { IoCloseCircleOutline } from 'react-icons/io5';
import UserRequestsComponent from '../components/UserRequestsComponent';


const ProfilePage = () => {

    const [followersModal, setFollowersModal] = useState(false)
    const [followingModal, setFollowingModal] = useState(false)
    const [requestsModal, setRequestsModal] = useState(false)
    const [showPostModal, setShowPostModal] = useState(false)

    const [userProfile, setUserProfile] = useState(null)
    const [posts, setPosts] = useState(null)

    const [loading, setLoading] = useState(true)
    const [postData, setPostData] = useState(null)
    const [followers, setFollowers] = useState(null)
    const [following, setFollowing] = useState(null)
    const [requests, setRequests] = useState(null)

    const [followerLoading, setFollowerLoading] = useState(false)
    const [followingLoading, setFollowingLoading] = useState(false)
    const [pendingLoading, setPendingLoading] = useState(false)

    async function getFullProfile() {
        setLoading(true)
        const loading = toast.loading('Please wait...', loadingtoastOptions);
        try {
            await axios.get(`${process.env.REACT_APP_BASE_URL}/api/profile/getfullprofile/${localStorage.getItem("user_id")}`).then((res) => {
                if (res.data.success === true) {
                    setUserProfile(res?.data?.profile?.user)
                    setPosts(res?.data?.profile?.posts)
                    setLoading(false)
                    toast.success('Profile fetched', successtoastOptions);
                    toast.dismiss(loading)
                } else {
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
        const loading = toast.loading('Please wait...', loadingtoastOptions);
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
                    toast.dismiss(loading)
                    getFullProfile()
                    Swal.fire({
                        icon: 'success',
                        title: 'Success',
                        text: 'Profile picture uploaded successfully'
                    });
                } else {
                    toast.dismiss(loading)
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: data.message || 'An error occurred while uploading the profile picture'
                    });
                }
            } else {
                toast.dismiss(loading)
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Failed to upload profile picture. Please try again later.'
                });
            }
        } catch (error) {
            toast.dismiss(loading)
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
        const loading = toast.loading('Please wait...', loadingtoastOptions);
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
                    toast.dismiss(loading)
                    getFullProfile()
                    Swal.fire({
                        icon: 'success',
                        title: 'Success',
                        text: 'Posted successfully'
                    });
                } else {
                    toast.dismiss(loading)
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: data.message || 'An error occurred while posting picture'
                    });
                }
            } else {
                toast.dismiss(loading)
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Failed to post picture. Please try again later.'
                });
            }
        } catch (error) {
            toast.dismiss(loading)
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

    async function getFollowers() {
        setFollowerLoading(true)
        const loading = toast.loading('Please wait...', loadingtoastOptions);
        try {
            await axios.get(`${process.env.REACT_APP_BASE_URL}/api/follow/getfollowers/${localStorage.getItem("user_id")}`).then((res) => {
                if (res?.data?.success === true) {
                    setFollowers(res?.data?.followers);
                    toast.success('Followers fetched', successtoastOptions);
                    toast.dismiss(loading)
                    setFollowerLoading(false)
                } else {
                    toast.error('Fetching followers failed', successtoastOptions);
                    toast.dismiss(loading)
                }
            }).catch((error) => {
                toast.error('Fetching followers failed', successtoastOptions);
                toast.dismiss(loading)
            })
        } catch (error) {
            toast.error('Fetching followers failed', successtoastOptions);
        }
    }

    async function getFollowing() {
        setFollowingLoading(true)
        const loading = toast.loading('Please wait...', loadingtoastOptions);
        try {
            await axios.get(`${process.env.REACT_APP_BASE_URL}/api/follow/getfollowing/${localStorage.getItem("user_id")}`).then((res) => {
                if (res?.data?.success === true) {
                    setFollowing(res?.data?.following);
                    toast.success('Following fetched', successtoastOptions);
                    toast.dismiss(loading)
                    setFollowingLoading(false)
                } else {
                    toast.error('Fetching following failed', successtoastOptions);
                    toast.dismiss(loading)
                }
            }).catch((error) => {
                toast.error('Fetching following failed', successtoastOptions);
                toast.dismiss(loading)
            })
        } catch (error) {
            toast.error('Fetching following failed', successtoastOptions);
        }
    }

    async function getPendingRequests() {
        setPendingLoading(true)
        const loading = toast.loading('Please wait...', loadingtoastOptions);
        try {
            await axios.get(`${process.env.REACT_APP_BASE_URL}/api/follow/getpending/${localStorage.getItem("user_id")}`).then((res) => {
                if (res?.data?.success === true) {
                    setRequests(res?.data?.pending);
                    toast.success('Pending Requests fetched', successtoastOptions);
                    toast.dismiss(loading)
                    setPendingLoading(false)
                } else {
                    toast.error('Fetching pending failed', successtoastOptions);
                    toast.dismiss(loading)
                }
            }).catch((error) => {
                toast.error('Fetching pending failed', successtoastOptions);
                toast.dismiss(loading)
            })
        } catch (error) {
            toast.error('Fetching pending failed', successtoastOptions);
            toast.dismiss(loading)
        }
    }

    useEffect(() => {
        getFullProfile()
    }, [])

    return (
        <>
            {
                followersModal === true ?

                    <div className='w-screen h-screen absolute top-0 left-0 bg-black bg-opacity-85 z-40 flex items-center'>

                        <div className="md:w-[30%] w-[95%] h-[70%] m-auto md:h-[50%] flex flex-col bg-white rounded-xl">
                            {
                                followerLoading === true ?
                                    <Loading />
                                    :
                                    <>
                                        <div className="w-[100%] h-12 border-b-[1px] border-black flex flex-row">

                                            <p className="font-semibold w-full flex items-center">
                                                <span className="w-[60%] text-right">Followers </span>

                                                <span className="justify-end w-[40%] flex items-end"><IoCloseCircleOutline className='text-black font-bold hover:cursor-pointer text-2xl mr-5' onClick={() => {
                                                    setFollowersModal(false)
                                                    setFollowers(null)
                                                }} /></span></p>

                                        </div>
                                        <div className="flex-1 overflow-auto ">
                                            {
                                                followers?.map((ele, index) => {
                                                    return <UserRowComponent key={index} name={ele?.name} email={ele?.email} imglink={ele?.compressed_full_pic} user_id={ele?.user_id} />
                                                })
                                            }
                                        </div>
                                    </>
                            }
                        </div>


                    </div>

                    : null
            }
            {
                followingModal === true ?


                    <div className='w-screen h-screen absolute top-0 left-0 bg-black bg-opacity-85 z-40 flex items-center'>
                        <div className="md:w-[30%] w-[95%] h-[70%] m-auto md:h-[50%] flex flex-col bg-white rounded-xl">
                            {
                                followingLoading === true ?
                                    <Loading />
                                    :
                                    <>
                                        <div className="w-[100%] h-12 border-b-[1px] border-black flex flex-row">

                                            <p className="font-semibold w-full flex items-center">
                                                <span className="w-[60%] text-right">Following </span>

                                                <span className="justify-end w-[40%] flex items-end"><IoCloseCircleOutline className='text-black font-bold hover:cursor-pointer text-2xl mr-5' onClick={() => {
                                                    setFollowingModal(false)
                                                    setFollowing(null)
                                                }} /></span></p>

                                        </div>
                                        <div className="flex-1 overflow-auto ">
                                            {
                                                following?.map((ele, index) => {
                                                    return <UserRowComponent key={index} name={ele?.name} email={ele?.email} imglink={ele?.compressed_full_pic} user_id={ele?.user_id} />
                                                })
                                            }
                                        </div>
                                    </>
                            }

                        </div>

                    </div>

                    : null
            }
            {
                requestsModal === true ?


                    <div className='w-screen h-screen absolute top-0 left-0 bg-black bg-opacity-85 z-40 flex items-center'>
                        <div className="md:w-[30%] w-[95%] h-[70%] m-auto md:h-[50%] flex flex-col bg-white rounded-xl">
                            {
                                pendingLoading === true ?
                                    <Loading />
                                    :
                                    <>
                                        <div className="w-[100%] h-12 border-b-[1px] border-black flex flex-row">

                                            <p className="font-semibold w-full flex items-center">
                                                <span className="w-[60%] text-right">Pending </span>

                                                <span className="justify-end w-[40%] flex items-end"><IoCloseCircleOutline className='text-black font-bold hover:cursor-pointer text-2xl mr-5' onClick={() => {
                                                    setRequestsModal(false)
                                                    setRequests(null)
                                                }} /></span></p>

                                        </div>
                                        <div className="flex-1 overflow-auto ">
                                            {
                                                requests?.map((ele, index) => {
                                                    return <UserRequestsComponent key={index} name={ele?.name} email={ele?.email} imglink={ele?.compressed_full_pic} requester_id={ele?.requester_id} setRequestsModal={setRequestsModal} setRequests={setRequests} />
                                                })
                                            }
                                        </div>
                                    </>
                            }

                        </div>

                    </div>

                    : null
            }
            {
                showPostModal === true ? <PostModal setShowPostModal={setShowPostModal} postData={postData} setPostData={setPostData} userImage={userProfile?.compressed_full_pic} /> : null
            }

            {
                loading === true ?
                    <>
                        <Loading />
                    </>
                    :
                    <>
                        <div className='maindivprofile'>
                            {/* <div className="w-full h-[250px] backgoundSVG bg-lack" > */}
                            <div className="w-full md:h-[210px] h-[120px] backgoundSVG bg-lack"  >


                                {/* <img src={require("./wave-haikei (2).svg")} /> */}
                            </div>


                            <div className='flex md:flex-row flex-col  md:-mt-24 -mt-16'>
                                <div className='md:w-[35%] w-[100%] bg-blue-00 flex flex-col justify-center items-center'>
                                    {
                                        userProfile?.compressed_full_pic !== null ?
                                            <img src={userProfile?.compressed_full_pic} className="md:ml-[10%] md:w-56 md:h-56 w-28 h-28 border-4 border-white rounded-full shadow-xl" alt="" style={{ objectFit: 'cover' }} />
                                            :
                                            <img className="ml-[10%] w-64 border-4 border-black rounded-full" src={require("./assets/useicon.webp")} alt="" />
                                    }
                                    <p className='text-2xl mt-2 font-semibold  w-full text-center text-black'>{userProfile?.name}</p>
                                </div>
                                <div className='md:w-[65%] w-[100%] '>

                                    <div className='flex flex-row mt-10' >
                                        <div className='w-44 h-28 md:ml-8 border-[1px] border-lack flex md:flex-col flex-col-reverse items-center justify-center rounded-lg shadow-md md:bg-red-200 md:text-black  border-none'>
                                            <p className='text-gray-600 text-md font-semibold'>Posts</p>
                                            <p className=' md:text-black font-bold text-4xl'>{userProfile?.no_of_posts}</p>
                                        </div>
                                        <div className='w-44 h-28 md:ml-8 border-[1px] border-lack flex md:flex-col flex-col-reverse items-center justify-center rounded-lg shadow-md md:bg-red-200 md:text-black  border-none hover:cursor-pointer' onClick={() => {
                                            getFollowers()
                                            setFollowersModal(true)
                                        }}>
                                            <p className='text-gray-600 text-md font-semibold'>Followers</p>
                                            <p className=' md:text-black font-bold text-4xl'>{userProfile?.no_of_followers}</p>
                                        </div>
                                        <div className='w-44 h-28 md:ml-8 border-[1px] border-lack flex md:flex-col flex-col-reverse items-center justify-center rounded-lg shadow-md md:bg-red-200 md:text-black  border-none hover:cursor-pointer' onClick={() => {
                                            getFollowing()
                                            setFollowingModal(true)
                                        }}>
                                            <p className='text-gray-600 text-md font-semibold'>Follwing</p>
                                            <p className=' md:text-black font-bold text-4xl'>{userProfile?.no_of_following}</p>
                                        </div>

                                    </div>
                                    <div className='flex flex-row flex-wrap bg-blue-0 mt-5 md:pl-12 md:justify-normal justify-center'>
                                        {/* <button type="button" class="text-green-700 hover:text-white border border-green-700 hover:bg-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 ">Follow</button> */}
                                        <button type="button" class="text-red-700 hover:text-white border border-red-700 hover:bg-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Edit Profile</button>
                                        <button type="button" class="text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2" onClick={handleUploadButtonClick}>Upload Profile Picture</button>
                                        <button type="button" class="text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2" onClick={() => {
                                            getPendingRequests()
                                            setRequestsModal(true)
                                        }}>Pending Requests</button>
                                    </div>
                                </div>
                            </div>

                            <div className='w-full items-center flex justify-center '>
                                <button type="button" class="text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 flex align-middle" onClick={() => {
                                    handlePostUploadButtonClick()
                                }}>Create a post <MdAddAPhoto className='inline-block text-xl ml-3' /></button>
                            </div>

                            <div className='md:w-[65%] w-full h-auto m-auto mt-10  flex flex-row flex-wrap mb-10 items-center justify-center '>
                                {
                                    posts?.map((ele, index) => {
                                        return <div className='border-[1px] border-black md:w-56 md:h-56 w-28 h-28' key={index} onClick={() => {
                                            setShowPostModal(true)
                                            setPostData(ele)
                                        }}>

                                            <img className='w-[100%] h-[100%]' style={{ "objectFit": "cover" }} src={ele.com_img_link} alt="" />
                                        </div>
                                    })
                                }
                            </div>
                        </div>
                    </>
            }

        </>
    )
}

export default ProfilePage
