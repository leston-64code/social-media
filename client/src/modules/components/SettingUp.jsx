import { useEffect } from "react"
import { SiLoop } from "react-icons/si"
import { useNavigate } from "react-router-dom"

const SettingUp = () => {
    const navigate=useNavigate()
    useEffect(()=>{
        setTimeout(()=>{
            navigate("/home/profile")
        },1000)
    },[])
  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
        <SiLoop className="w-[70px] h-[70px] align-middle animate-spin text-red-500 "/>
        <p className="font-semibold mt-5">Setting up your account......</p>
    </div>
  )
}

export default SettingUp
