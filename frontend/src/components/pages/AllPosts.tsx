import { useEffect ,useState } from "react";
import axiosBlogInstance from "../../api/AxiosBlogInstance";
import { useParams } from "react-router-dom";
import DashboardSkeletonLoader from "../common/loaders/skeltonLoaderDashboard";
import ListPost from "../common/ListPost";
import SomethingWentWrong from "../../assets/something-went-wrong.png"
import NoPostFound from "../common/dashboard/NoPostFound";
import { Post } from "../../typescript/interfaces";



export default function AllPosts(){  
    const {id} = useParams()
const [posts ,setPosts] = useState<Post[]>([])
const [isLoading,setIsLoading] = useState(true)
 const [isError,setIsError] = useState(false)

useEffect(()=>{
    axiosBlogInstance.get(`/dashboard/${id}`,{withCredentials:true}).then(response=>{
        if(response.data.data){
            setPosts(response.data.data.slice(0,2))
            setIsLoading(false)
    
        }else{
            setPosts([])
            setIsLoading(false)
     
        }
 }).catch(error=>{
    setIsError(true)
 })
 
 })



 return isLoading?
 <DashboardSkeletonLoader/> :isError? <div className="  h-[81vh] lg flex justify-center item bg-white">
 <img src={SomethingWentWrong}className=" w-full object-contain " alt="Something went wrong" />
</div>: posts.length===0 ?
  <NoPostFound/>: <section className=" bg-white">
 <article id="posts" className="px-4 lg:px-14 min-h-[80vh]">
     {posts.map(post => {
    return ( <ListPost key={post.id} post={post}/> ) 
  })

}
 </article>
 </section>
}
  
