import { IoMdCloseCircle } from "react-icons/io";
import { FcLike } from "react-icons/fc";
import { FcComments } from "react-icons/fc";
import { FaComment } from "react-icons/fa";
import Comment from "./Comment";

const PostModal = ({ postData, setShowPostModal, setPostData }) => {
    return (
        <>
            <div className='w-screen h-screen absolute top-0 left-0 bg-black bg-opacity-75 flex items-center'>
                <IoMdCloseCircle className='absolute text-white font-bold top-4 hover:cursor-pointer right-40 text-4xl' onClick={() => {
                    setShowPostModal(false)
                    setPostData(null)
                }} />
                <div className='w-[70%] h-[80%] flex flex-row bg-white m-auto' >

                    <div className='w-[50%] h-[100%] bg-green-300'>
                        <img src={postData.img_link} alt="" className='w-full h-full object-cover object-center' />
                    </div>

                    <div className='w-[50%] h-[100%]  flex flex-col opacity-100'>

                        <div className="flex flex-col w-[85%] h-full m-auto border-[1.5px] border-gray-300">

                            <div className="w-[100%] h-16 border-b-[1.5px] border-gray-500 flex flex-row items-center">
                                <div className="rounded-full mx-8 w-11 h-11 bg-black">
                                    {/* <img src={require("../user/assets/useicon.webp")} className="w-full h-full" alt="" /> */}
                                </div>
                                <div className="flex flex-col">
                                    <p className="text-sm font-semibold">@Leston</p>
                                    <p className="text-xs font-semibold text-gray-400"> Posted on :- 23/3/2023 <span className="ml-3 text-black"><FcLike className="inline-block text-xl " /> :- 4</span> <span className="ml-3 text-black"><FcComments className="inline-block text-xl" /> :- 18</span></p>
                                </div>
                            </div>
                            <div className="w-[100%] flex-1 overflow-y-auto bg-green-00 flex flex-col">

                                <Comment />
                                <Comment />
                                <Comment />
                                <Comment />
                                <Comment />
                                <Comment />
                                <Comment />
                                <Comment />
                                <Comment />
                                <Comment />
                                <Comment />
                                <Comment />
                                <Comment />
                                <Comment />
                                <Comment />
                                <Comment />

                            </div>
                            <div className="w-[100%] h-16 bg-lack border-t-[1.5px] border-gray-300">

                                <div>
                                    {/* <label for="search" class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Add Comment</label> */}
                                    <div class="relative">
                                        <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                            <FaComment/>
                                        </div>
                                        <input type="search" id="search" class="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50" placeholder="Add Comment" required />
                                        <button type="submit" class="text-white absolute end-2.5 bottom-2.5 bg-green-500 hover:bg-blue-800 font-medium rounded-lg text-sm px-4 py-2 ">Comment</button>
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
