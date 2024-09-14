 import { Link, useNavigate } from "react-router-dom"
 import { Store, User } from "../../typescript/interfaces"
 import axios from "axios"
 import { unAuthenticate } from "../../store/authSlice"
 import { useDispatch, useSelector} from "react-redux"
 import setting from "../../assets/settings.svg"
 import Dashboard from "../../assets/dashboard.svg"
 import profile from "../../assets/profile.svg"
import emailEncoder from "../../helper/emailEcoder" 
import write  from "../../assets/write.svg"
import axiosUserInstance from "../../api/AxiosUserInstance"
export default function DropDown({shouldShow, handleVisibility}:{shouldShow:boolean,handleVisibility:()=>void}){
    const dispatch =useDispatch()
    const user = useSelector<Store>(state=>state.auth.userData) as User
    const LoginStatus = useSelector<Store>(state=>state.auth.status) as boolean
 const email = user?.email as string
 const navigate = useNavigate()

 function handleSignout(){
         try {
         axiosUserInstance.get(`/signout`,{withCredentials:true}).then(data=>{
            console.log(data)
            dispatch(unAuthenticate())
        navigate("/")
        handleVisibility()
        window.location.reload()
         }).catch(error=>{
            console.log(error)
         })


         } catch (error) {
            
         }
    }

return LoginStatus&& shouldShow&&<>
 <div id="overlay " className="absolute top-0 left-0 z-10 w-full h-[105vh]" onClick={handleVisibility}></div>
<div className={`bg-white p-4 absolute z-20 right-0 rounded-lg top-16 shadow-lg`}>
<div id="links" className="flex flex-col"> 
    <Link to={`/profile/${user.id}`} className="flex gap-2 p-3 group">
      <img src={profile} alt="profile" className=" h-8 w-8 group-hover:opacity-100 opacity-70 " />
      <p className="font-sans  text-lg group-hover:opacity-100 opacity-70">Profile</p>
    </Link>
 <Link to="/dashboard"  className="flex gap-2 p-3 group"> 
   <img src={Dashboard} alt="dashboard" className=" h-6 w-6 group-hover:opacity-100 opacity-70 " />
    <p className="font-sans  text-lg group-hover:opacity-100 opacity-70" >Dashboard</p>
</Link>
<Link className="flex gap-2 p-3 group" to="/addpost"><img src={write} className=" h-6 w-6 group-hover:opacity-100 opacity-70 "  alt="" /><p className="font-sans  text-lg group-hover:opacity-100 opacity-70"> Write</p></Link>
 <Link to="/settings"   className="flex gap-2 p-3 group" >
   <img src={setting} alt="setting" className=" h-6 w-6 group-hover:opacity-100 opacity-70 "  />
   <p className="font-sans  text-lg group-hover:opacity-100 opacity-70">Settings</p>
</Link></div>
 <button onClick={handleSignout} className="flex flex-col mt-5 group">
    <p  className="font-sans  text-lg group-hover:opacity-100 opacity-70">Sign out</p>
    <p  className="font-sans  text-sm group-hover:opacity-100 opacity-70 p-1">{emailEncoder(email)}</p>
</button>
</div>

</> 
}