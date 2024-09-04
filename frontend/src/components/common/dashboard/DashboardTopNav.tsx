import { useSelector } from "react-redux";
import { User } from "../../../typescript/interfaces";
import { Link } from "react-router-dom";
import { Store } from "../../../typescript/interfaces";
import  Plus from "../../../assets/Plus.svg"

export default function DashboardTopNav(){

    const  userDetails= useSelector<Store>(state=>state.auth.userData) 

    const user = userDetails  as User


    return  <section id="userDetails" className="border-b-2 p-3 px-4 lg:px-14 bg-white">
    <div className="flex justify-between">
    <Link title="Go to profile" to="/profile" className="text-lg font-bold hover:underline underline-offset-4 
     font-sans hover:opacity-60  lg:text-2xl ">
        {user.first_name} {user.last_name}
    </Link>
    <Link to="/addpost" title="Create Post" className="flex items-center bg-black p-1 hover:opacity-65 rounded-md ">
        <img src={Plus}  alt="plus" className="h-5 w-5 lg:h-6 lg:w-6"/>
        <p className="text-white p-1 px-2 text-sm lg:text-lg">New Post</p>
    </Link>
    </div>
    
    </section>
}