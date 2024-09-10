import axios from "axios";
import { useDispatch } from "react-redux";

import { setNotifications } from "../store/notiSlice";
const userApiUrl = import.meta.env.VITE_USER_API_URL
export default function getNotifications(){
    const dispatch = useDispatch();
   try {
    axios.get(`${userApiUrl}/notifications`, {withCredentials:true}).then(res=>{
        console.log(res.data.data)
     if(res.data.status){
        dispatch(setNotifications(res.data.data))
      setInterval(()=>{
        getNotifications()
      },1000*60)
     }
       })
   } catch (error) {
    console.log(error)
    setInterval(() => {
        getNotifications()
    }, 1000*60);
   }
}