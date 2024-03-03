import { IoMdCloseCircle } from "react-icons/io";
import { FcLike } from "react-icons/fc";
import { FcComments } from "react-icons/fc";
import { FaComment } from "react-icons/fa";
import Comment from "./Comment";
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { successtoastOptions } from "../../utils/toastOptions";
import { formatDate } from "../../utils/timeFunctions";

const PostModal = ({ postData, setShowPostModal, setPostData, userImage }) => {
    
    const [inputComment,setInputComment]=useState(null)

    const [comments,setComments]=useState(null)
    const [noOfcomments,setNoOfComments]=useState(null)
    const [noOfLikes,setNoOfLikes]=useState(null)
    const [postDate,setPostDate]=useState(null)

    async function createComment(){
        try {
            await axios.post(`${process.env.REACT_APP_BASE_URL}/api/post/createcomment/${localStorage.getItem("user_id")}/${postData.post_id}`,{comment:inputComment}).then((res) => {
                if (res?.data?.success === true) {
                    setInputComment(null)
                    getOnePost()
                    getAllComments()
                    toast.success('Comment added 💌', successtoastOptions);
                } else {
                    toast.error('Creating comment failed', successtoastOptions);
                }
            }).catch((error) => {
                toast.error('Creating comment failed', successtoastOptions);
            })
        } catch (error) {
            toast.error('Creating comment failed', successtoastOptions);
        }
    }

    async function getAllComments(){
        try {
            await axios.get(`${process.env.REACT_APP_BASE_URL}/api/post/getallcomments/${postData.post_id}`).then((res) => {
                if (res?.data?.success === true) {
                    setComments(res?.data?.comments)
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

    async function getOnePost(){
        try {
            await axios.get(`${process.env.REACT_APP_BASE_URL}/api/post/getone/${postData.post_id}`).then((res) => {
                if (res?.data?.success === true) {
                    console.log(res?.data)
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

    async function likePost(){
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

    useEffect(()=>{
        getOnePost()
        getAllComments()
    },[])


    return (
        <>
            <div className='w-screen h-screen absolute top-0 left-0 bg-black bg-opacity-75 flex items-center'>
                <IoMdCloseCircle className='absolute text-white font-bold top-4 hover:cursor-pointer right-40 text-4xl' onClick={() => {
                    setShowPostModal(false)
                    setPostData(null)
                }} />
                <div className='w-[70%] h-[80%] flex flex-row bg-white m-auto' >

                    <div className='w-[50%] h-[100%]'>
                        <img src={postData.img_link} alt="" className='w-full h-full object-cover object-center hover:cursor-pointer' onDoubleClick={()=>{
                            likePost()
                        }}/>
                    </div>

                    <div className='w-[50%] h-[100%]  flex flex-col opacity-100'>

                        <div className="flex flex-col w-[85%] h-full m-auto border-[1.5px] border-gray-300">

                            <div className="w-[100%] h-16 border-b-[1.5px] border-gray-500 flex flex-row items-center">
                                <div className="rounded-full mx-8 w-11 h-11 bg-black">
                                    {
                                        userImage != null ?
                                        <img src={userImage} className="w-[100%] h-[100%] rounded-full object-cover" alt="" />
                                        :<img src={require("../user/assets/useicon.webp")} className="w-[100%] h-[100%] rounded-full object-cover" alt="" />
                                    }
                                </div>
                                <div className="flex flex-col">
                                    <p className="text-sm font-semibold">@Leston</p>
                                    <p className="text-xs font-semibold text-gray-400"> Posted on :- { postDate !== null ? postDate : null} <span className="ml-3 text-black"><FcLike className="inline-block text-xl " /> :- { noOfLikes !== null ? noOfLikes : null }</span> <span className="ml-3 text-black"><FcComments className="inline-block text-xl" /> :- { noOfcomments !== null ? noOfcomments : null }</span></p>
                                </div>
                            </div>
                            <div className="w-[100%] flex-1 overflow-y-auto bg-green-00 flex flex-col">

                              {
                                comments?.map((ele,index)=>{
                                    return   <Comment key={index} comment={ele}/>
                                })
                              }

                            </div>
                            <div className="w-[100%] h-16 bg-lack border-t-[1.5px] border-gray-300">

                                <div>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                            <FaComment/>
                                        </div>
                                        <input type="search" id="search" className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50" placeholder="Add Comment" value={inputComment} onChange={(e)=>{
                                            setInputComment(e.target.value)
                                        }} required />
                                        <button className="text-white absolute end-2.5 bottom-2.5 bg-green-500 hover:bg-blue-800 font-medium rounded-lg text-sm px-4 py-2 " onClick={()=>{
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
