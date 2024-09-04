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

export default function Dashboard(){
    const [posts,setPosts]= useState<Post[]>([])
    const [isLoading,setIsLoading] =useState(true)
    const [isError,setIsError]= useState(false)
const blogUrl = import.meta.env.VITE_POST_API_URL


useEffect(()=>{

    axios.get(`${blogUrl}/dashboard`,{withCredentials:true}).then(response=>{
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
 <article id="posts" className="px-4 lg:px-14 h-[70vh]">
     {posts.map(post => {
    return (
<div  key={post.id} id={post.id} className="p-2   shadow-md my-1 bg-white  flex max-[630px]:justify-center max-[630px]:items-center    sm:justify-between">

<div className="  relative  w-full p-2" id="post desc " >
<div id="author" className="flex">
<img src={post.user.image} className="rounded-full  border=-black border h-3 w-6 md:h-12 md:w-12" alt="" />
<p className="text-gray-400 text-sm p-2 md:text-lg">{post.user.first_name} {post.user.last_name}</p>
</div>
<h4 className="text-2xl font-bold p-2 md:text-3xl">{post.title.slice(0,30)}...</h4>
<p className="text-gray-400 text-sm  p-2 md:tex-lg">{formatDate(post.created_at).timeAgo}</p>

<p className=" p-2 md:text-xl">{post.description.slice(0,135)}</p>
<div id="pannels" className="flex justify-between">
<InteractionPanel/> <AdmimEditPannel postId={post.id} />
</div>
</div>
{post.images[0].image &&<div className="w-[300px]" >
          <img src={post.images[0]?.image} className="h-[130px] w-[130px] shadow-md sm:h-40 sm:w-40 md:h-52 md:w-52" alt="" />
          </div>}

</div>

    ) 
  })

}
 </article>
 </section>
}