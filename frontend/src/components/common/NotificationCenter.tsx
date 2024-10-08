import { useEffect, useState } from "react"
import Bell from  "../../assets/bell.svg"
import Profile  from "../../assets/profile.png"
import formatDate from "../../helper/dateConverter"
import {  Notification } from "../../typescript/interfaces"
import { Store } from "../../typescript/interfaces"
import { Link } from "react-router-dom"
import { useSelector,useDispatch} from "react-redux"
import notificationFilter from "../../helper/notificationFilter"
import { setUnWatched } from "../../store/notiSlice"
import axiosUserInstance from "../../api/AxiosUserInstance"

export default function NotificationCenter(){
  const [bellClicked,setBellClicked] = useState(false)
const [notifications,setNotifications] = useState<Notification[]>([])
const  notificationsState = useSelector<Store>(state=>state.noti.notifications) as Notification[]
const notificationSettings = useSelector<Store>(state=>state.noti.notificationSettings) as Obj
const unWatched = useSelector<Store>(state=>state.noti.unWatched) as number


 const dispatch = useDispatch()
type Obj ={[key:string]:boolean}
useEffect(()=>{
    setNotifications(notificationFilter(notificationSettings,notificationsState))
   },[notificationsState])

function handleVisibility(){
   setBellClicked(prev=>!prev)
   dispatch(setUnWatched(0))
   axiosUserInstance.put(`/Watched`,{ watched:notifications.length,un_watched:0},{withCredentials:true})
}

    return <div className="py-2 pr-4 ">
         <button onClick={handleVisibility} className="flex relative">  
            <img src={Bell} className=" hover:scale-125 transition-all duration-200 " alt="" />
           {unWatched!==0  &&  (unWatched>9? <p className="absolute flex left-6 -top-2 text-sm px-1 bg-black rounded-full text-white font-semibold "> {unWatched-1}  <span>+</span></p>:<p className="absolute flex left-6 -top-2 text-sm px-1 bg-black rounded-full text-white font-semibold ">{unWatched}</p>)}
            </button>
    {bellClicked&&
    
    <div id="notifications" className="absolute bg-white right-4 z-20 p-4 shadow-xl rounded-lg my-6">
     
       {notifications.length===0?<div>
         <div><p className="text-xl text-center font-semibold text-gray-400  p-4 ">
          It looks empty here 
         </p></div>
         <div id="overlay " className="absolute  top-0 -left-[60rem] -z-10 w-[400%] h-[105vh]" onClick={handleVisibility}></div>
       </div>:notifications.map(notification=>{
         return <div key={notification.timestamp}>
         
         <Link to={`/post/${notification.post_id}`} >
            <div className="flex gap-5 p-4 border-b  justify-between">
         <div id="user" className="flex gap-4">
         <img src={Profile} className="rounded-full  h-9 w-9 hover:contrast-50" alt="profile" />
         <p className="text-sm p-2"><span className="font-semibold">{notification.type==="post_uploads"?"You":notification.user.first_name}</span> {notification.msg}</p>
         </div>
         <p className="text-sm text-gray-500 p-2 ">{formatDate(notification.timestamp).formattedDate}</p>
      </div>
         </Link>
         <div id="overlay " className="absolute  top-0 -left-[60rem] -z-10 w-[400%] h-[105vh]" onClick={handleVisibility}></div>
         </div>
       })}
        
    </div> }
    </div>


}