import { IoMdCloseCircle } from "react-icons/io";
import { FcLike } from "react-icons/fc";
import { FcComments } from "react-icons/fc";
import { FaComment } from "react-icons/fa";
import Comment from "./Comment";
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { loadingtoastOptions, successtoastOptions } from "../../utils/toastOptions";
import { formatDate } from "../../utils/timeFunctions";
import { IoCloseCircleOutline } from "react-icons/io5";
import UserRowComponent from "./UserRowComponent";

const PostModal = ({ postData, setShowPostModal, setPostData, userImage }) => {

    const [inputComment, setInputComment] = useState("")

    const [comments, setComments] = useState(null)
    const [noOfcomments, setNoOfComments] = useState(null)
    const [noOfLikes, setNoOfLikes] = useState(null)
    const [postDate, setPostDate] = useState(null)

    const [likeUsers, setLikeUsers] = useState(null)

    const [showModal, setShowModal] = useState(false)

    async function createComment() {
        const loading = toast.loading('Please wait...', loadingtoastOptions);
        try {
            await axios.post(`${process.env.REACT_APP_BASE_URL}/api/post/createcomment/${localStorage.getItem("user_id")}/${postData.post_id}`, { comment: inputComment }).then((res) => {
                if (res?.data?.success === true) {
                    setInputComment("")
                    getOnePost()
                    getAllComments()
                    toast.success('Comment added 💌', successtoastOptions);
                    toast.dismiss(loading)
                } else {
                    toast.error('Creating comment failed', successtoastOptions);
                    toast.dismiss(loading)
                }
            }).catch((error) => {
                toast.error('Creating comment failed', successtoastOptions);
                toast.dismiss(loading)
            })
        } catch (error) {
            toast.error('Creating comment failed', successtoastOptions);
            toast.dismiss(loading)
        }
    }

    async function getAllComments() {
        const loading = toast.loading('Please wait...', loadingtoastOptions);
        try {
            await axios.get(`${process.env.REACT_APP_BASE_URL}/api/post/getallcomments/${postData.post_id}`).then((res) => {
                if (res?.data?.success === true) {
                    setComments(res?.data?.comments)
                    toast.success("Comments fetched", successtoastOptions)
                    toast.dismiss(loading)
                } else {
                    toast.error('Fetching comment failed', successtoastOptions);
                    toast.dismiss(loading)
                }
            }).catch((error) => {
                toast.error('Fetching comment failed', successtoastOptions);
                toast.dismiss(loading)
            })
        } catch (error) {
            toast.error('Fetching comment failed', successtoastOptions);
            toast.dismiss(loading)
        }
    }

    async function getOnePost() {
        try {
            await axios.get(`${process.env.REACT_APP_BASE_URL}/api/post/getone/${postData.post_id}`).then((res) => {
                if (res?.data?.success === true) {

                    setNoOfLikes(res?.data?.post[0]?.no_of_likes)
                    setNoOfComments(res?.data?.post[0]?.no_of_comments)
                    setPostDate(formatDate(res?.data?.post[0]?.time_of_post))
                } else {
                    toast.error('Fetching comment failed', successtoastOptions);
                }
            }).catch((error) => {
                toast.error('Fetching comment failed', successtoastOptions);
            })
        } catch (error) {
            toast.error('Fetching comment failed', successtoastOptions);
        }
    }

    async function likePost() {
        try {
            await axios.post(`${process.env.REACT_APP_BASE_URL}/api/post/likepost/${localStorage.getItem("user_id")}/${postData.post_id}`).then((res) => {
                if (res?.data?.success === true) {
                    getOnePost()
                    toast.success(`${res?.data?.message}💘`, successtoastOptions);
                } else {
                    toast.error('Like failed', successtoastOptions);
                }
            }).catch((error) => {
                toast.error('Like failed', successtoastOptions);
            })
        } catch (error) {
            toast.error('Like failed', successtoastOptions);
        }
    }

    async function getUsersWhoLikedPost() {
        try {
            await axios.get(`${process.env.REACT_APP_BASE_URL}/api/post/getlikeusers/${postData.post_id}`).then((res) => {
                if (res?.data?.success === true) {
                    setLikeUsers(res?.data?.likes);
                } else {
                    toast.error('Fetching comment failed', successtoastOptions);
                }
            }).catch((error) => {
                toast.error('Fetching comment failed', successtoastOptions);
            })
        } catch (error) {
            toast.error('Fetching comment failed', successtoastOptions);
        }
    }

    useEffect(() => {
        getOnePost()
        getAllComments()
    }, [])


    return (
        <>
            {
                showModal !== false ?
                    <div className='w-screen h-screen absolute top-0 left-0 bg-black bg-opacity-85 z-40 flex items-center'>
                        <div className="md:w-[30%] w-[95%] h-[70%] m-auto md:h-[50%] flex flex-col bg-white rounded-xl">
                            <div className="w-[100%] h-12 border-b-[1px] border-black flex flex-row">

                                <p className="font-semibold w-full flex items-center">
                                    <span className="w-[60%] text-right">People liked </span>

                                    <span className="justify-end w-[40%] flex items-end"><IoCloseCircleOutline className='text-black font-bold hover:cursor-pointer text-2xl mr-5' onClick={() => {
                                        setShowModal(false)
                                        setLikeUsers(null)
                                    }} /></span></p>

                            </div>
                            <div className="flex-1 overflow-auto ">
                                {
                                    likeUsers?.map((ele, index) => {
                                        return <UserRowComponent key={index} name={ele?.name} email={ele?.email} imglink={ele?.compressed_full_pic} user_id={ele?.user_id} />
                                    })
                                }
                            </div>
                        </div>

                    </div>
                    : null
            }
            <div className='w-screen h-screen absolute top-0 left-0 bg-black bg-opacity-75 flex items-center'>
                <IoMdCloseCircle className='absolute text-white font-bold md:top-4 top-0 hover:cursor-pointer right-40 text-4xl' onClick={() => {
                    setShowPostModal(false)
                    setPostData(null)
                }} />
                <div className='md:w-[70%] md:h-[80%] flex md:flex-row flex-col w-[100%] h-[90%] bg-white m-auto' >

                    <div className='md:w-[50%] md:h-[100%] w-[100%] '>
                        <img src={postData.img_link} alt="" className='w-full h-full object-cover object-center hover:cursor-pointer' onDoubleClick={() => {
                            likePost()
                        }} />
                    </div>

                    <div className='md:w-[50%] w-[100%] h-[100%]  md:h-[100%]  flex flex-col opacity-100'>

                        <div className="flex flex-col md:w-[85%] w-[100%] h-full m-auto border-[1.5px] border-gray-300">

                            <div className="w-[100%] md:order-1 order-1 h-16 border-b-[1.5px] border-gray-500 flex flex-row items-center">
                                <div className="rounded-full mx-8 w-11 h-11 bg-black">
                                    {
                                        userImage != null ?
                                            <img src={userImage} className="w-[100%] h-[100%] rounded-full object-cover" alt="" />
                                            : <img src={require("../user/assets/useicon.webp")} className="w-[100%] h-[100%] rounded-full object-cover" alt="" />
                                    }
                                </div>
                                <div className="flex flex-col">
                                    <p className="text-sm font-semibold">@Leston</p>
                                    <p className="text-xs font-semibold text-gray-400"> Posted on :- {postDate !== null ? postDate : null} <span className="ml-3 text-black"><FcLike className="inline-block text-xl " onClick={() => {
                                        getUsersWhoLikedPost()
                                        setShowModal(true)
                                    }} /> :- {noOfLikes !== null ? noOfLikes : null}</span> <span className="ml-3 text-black"><FcComments className="inline-block text-xl" /> :- {noOfcomments !== null ? noOfcomments : null}</span></p>
                                </div>
                            </div>
                            <div className="w-[100%] md:order-1 order-3 flex-1 overflow-y-auto bg-green-00 flex flex-col">

                                {
                                    comments?.map((ele, index) => {
                                        return <Comment key={index} comment={ele} />
                                    })
                                }

                            </div>
                            <div className="w-[100%] md:order-1 order-2 h-16 bg-lack border-t-[1.5px] border-gray-300">

                                <div className="w-full h-full">
                                    <div className="relative w-full h-full">
                                        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                            <FaComment />
                                        </div>
                                        <input type="search" id="search" className="block w-full h-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50" placeholder="Add Comment" value={inputComment} onChange={(e) => {
                                            setInputComment(e.target.value)
                                        }} required />
                                        <button className="text-white absolute end-2.5 bottom-2.5 bg-green-500 hover:bg-blue-800 font-medium rounded-lg text-sm px-4 py-2 " onClick={() => {
                                            createComment()
                                        }}>Comment</button>
                                    </div>
                                </div>

                            </div>

                        </div>

                    </div>

                </div>
            </div>
        </>
    )
}

export default PostModal
