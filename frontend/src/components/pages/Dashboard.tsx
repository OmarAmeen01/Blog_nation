import axios from "axios";
import {useState, useEffect } from "react";
import { Post } from "../../typescript/interfaces";
import formatDate from "../../helper/dateConverter";
import NoPostFound from "../common/dashboard/NoPostFound";
import DashboardTopNav from "../common/dashboard/DashboardTopNav";
import DashboardSkeletonLoader from "../common/loaders/skeltonLoaderDashboard";
import SomethingWentWrong from "../../assets/something-went-wrong.png"
import InteractionPanel from "../common/InteractionPanel";
import AdmimEditPannel from "../common/adminEditPannel";
import ListPost from "../common/ListPost";

export default function Dashboard(){
    const [posts,setPosts]= useState<Post[]>([])
    const [isLoading,setIsLoading] =useState(true)
    const [isError,setIsError]= useState(false)
const blogUrl = import.meta.env.VITE_POST_API_URL


useEffect(()=>{

    axios.get(`${blogUrl}/dashboard`,{withCredentials:true}).then(response=>{
        console.log(response)
    if(response.data.data){
        setPosts(response.data.data)
        setIsLoading(false)
        setIsError(false)
    }else{
        setPosts([])
        setIsLoading(false)
        setIsError(false)
    }
    }).catch(
 error=>{
    console.log(error)
    setIsLoading(false)
    setIsError(true)
 }
    )
},[])


 return isLoading?
 <DashboardSkeletonLoader/> :isError? <div className="  h-[81vh] lg flex justify-center item bg-white">
 <img src={SomethingWentWrong}className=" w-full object-contain " alt="Something went wrong" />
</div>: posts.length===0 ?
  <NoPostFound/>: <section className=" bg-white">
  <DashboardTopNav/>
 <article id="posts" className="px-4 lg:px-14 min-h-[80vh]">
     {posts.map(post => {
    return ( <ListPost post={post}/> ) 
  })

}
 </article>
 </section>
}