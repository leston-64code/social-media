import { GiSandsOfTime } from "react-icons/gi";


const Loading = () => {
  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
        <GiSandsOfTime className="w-[70px] h-[70px] align-middle animate-spin text-red-500 "/>
        <p className="font-semibold mt-5">Loading........</p>
    </div>
  )
}

export default Loading
