import axios from "axios"
import { successtoastOptions } from "../../utils/toastOptions";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";


const UserRequestsComponent = ({ name, email, imglink, requester_id, setRequests, setRequestsModal }) => {
    const navigate=useNavigate()

    async function acceptFollowRequest(){
        try {
            await axios.post(`${process.env.REACT_APP_BASE_URL}/api/follow/acceptfollowreq/${requester_id}/${localStorage.getItem("user_id")}`).then((res) => {
                if (res?.data?.success === true) {
                    setRequestsModal(false)
                    setRequests(null)
                    toast.success('Follow request accepted', successtoastOptions);
                } else {
                    toast.error('Accepting failed', successtoastOptions);
                }
            }).catch((error) => {
                toast.error(' Accepting failed', successtoastOptions);
            })
        } catch (error) {
            toast.error(' Accepting failed', successtoastOptions);
        } 
    }

    async function rejectFollowRequest(){
        try {
            await axios.post(`${process.env.REACT_APP_BASE_URL}/api/follow/rejectfollowreq/${requester_id}/${localStorage.getItem("user_id")}`).then((res) => {
                if (res?.data?.success === true) {
                    setRequestsModal(false)
                    setRequests(null)
                    toast.success('Follow request reject', successtoastOptions);
                } else {
                    toast.error('Rejecting failed', successtoastOptions);
                }
            }).catch((error) => {
                toast.error(' Rejecting failed', successtoastOptions);
            })
        } catch (error) {
            toast.error(' Rejecting failed', successtoastOptions);
        } 
    }

    return (
        <>
            <div className="w-[100%] py-2 border-b-[0.1px] border-gray-300 flex flex-row items-center bg-white">
                <div className="w-[25%] h-auto flex justify-center" onClick={()=>{
                    navigate(`/home/user/${requester_id}`)
                }}>
                    {
                        imglink != null && imglink !== undefined ?
                            <img src={imglink} className='rounded-full w-[40px] h-[40px] bg-black' />
                            :
                            <img className='rounded-full w-[40px] h-[40px] bg-black' />
                    }
                </div>
                <div className="flex flex-col w-[45%]" onClick={()=>{
                    navigate(`/home/user/${requester_id}`)
                }}>
                    <p className="text-sm font-semibold">{name}</p>
                    <p className="text-[10px] font-semibold text-gray-400"> {email} </p>
                </div>
                <div className="flex flex-row w-[30%]">
                    <button type="button" class="text-green-700 hover:text-white border border-green-700 hover:bg-green-800 font-medium rounded-lg text-xs px-3 py-1.5 text-center me-2 mb-2" onClick={()=>{
                        acceptFollowRequest()
                    }}>Accept</button>
                    <button type="button" class="text-red-700 hover:text-white border border-red-700 hover:bg-red-800 font-medium rounded-lg text-xs px-3 py-1.5 text-center me-2 mb-2" onClick={()=>[
                        rejectFollowRequest()
                    ]}>Reject</button>
                </div>
            </div>
        </>
    )
}

export default UserRequestsComponent
