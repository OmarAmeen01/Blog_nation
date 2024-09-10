import { useState } from "react"
import { Link } from "react-router-dom"
import Bell from  "../../assets/bell.svg"
import Profile  from "../../assets/profile.png"
import formatDate from "../../helper/dateConverter"
export default function NotificationCenter(){
  const [bellClicked,setBellClicked] = useState(false)



    return <div className="py-2 pr-4 ">
         <button onClick={()=>{
            setBellClicked(prev=>!prev)
         }} className="flex relative">  
            <img src={Bell} className=" hover:scale-125 transition-all duration-200 " alt="" />
           {!bellClicked&& <p className="absolute flex left-6 -top-2 text-sm px-1 bg-black rounded-full text-white font-semibold ">5 <span>+</span></p>}
            </button>
    {bellClicked&& <div id="notifications" className="absolute bg-white right-4 z-20 p-4 shadow-xl rounded-lg my-4">
         <div className="flex gap-5 p-4 border-b-2  justify-between">
            <div id="user" className="flex gap-4">
            <img src={Profile} className="rounded-full  h-9 w-9 hover:contrast-50" alt="profile" />
            <p className="text-lg p-2"><span className="font-semibold">Hitesh</span> liked your post</p>
            </div>
            <p className="text-sm text-gray-500 p-2 ">9 Aug</p>
         </div>
         <div className="flex gap-5 p-4 border-b-2 justify-between">
            <img src={Profile} className="rounded-full  h-9 w-9 hover:contrast-50" alt="profile" />
            <p className="text-lg "><span className="font-semibold">Rameesh</span>  commentfed on your post</p>
            <p className="text-sm text-gray-500 p-2 ">10 Aug</p>
         </div>
    </div> }
    </div>


}