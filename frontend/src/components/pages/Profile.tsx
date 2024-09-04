import formatDate from "../../helper/dateConverter"
import InteractionPanel from "../common/InteractionPanel"
import AdmimEditPannel from "../common/adminEditPannel"
import { Post, ProfileDetails, Store, User } from "../../typescript/interfaces"
import { useState,useEffect } from "react"
import ProfilePic from "../../assets/profile.png"
import Edit from "../../assets/pencil-svgrepo-com.svg"
import axios from "axios"
import { Link } from "react-router-dom"
import DashboardSkeletonLoader from "../common/loaders/skeltonLoaderDashboard"
import ProfileForm from "../common/profile/profileFom"
import { useParams } from "react-router-dom"
import placeholder from "../../assets/landscape-placeholder-svgrepo-com.svg"
import { useSelector } from "react-redux"


export default function Profile(){
  
    const [posts,setPosts]= useState<Post[]>([])
    const [profile,setProfile] =useState<ProfileDetails>() 
    const [IsFormVisible,setIsFormVisible] = useState(false)
    const [isLoading,setIsLoading] =useState(true)
    const storedUser = useSelector<Store>(state=>state.auth.userData)
    const userDetails = storedUser as User
   
const blogUrl= import.meta.env.VITE_BLOG_API_URL
const userApiUrl= import.meta.env.VITE_USER_API_URL
 const {id} = useParams()
    useEffect(()=>{

        axios.get(`${blogUrl}/dashboard`,{withCredentials:true}).then(response=>{
        if(response.data.data){
            const data =response.data.data.slice(0,2)
            setPosts(data)
        }else{
            setPosts([])
            setIsLoading(false)
        }
        }).catch(
     error=>{
        console.log(error)
        setIsLoading(false)
     }
        )
      
   axios.get(`${userApiUrl}/profile/${id}`).then(response=>{

    if(response.data.status){
      setProfile(response.data.data)
     setIsLoading(false)
  
    }else{
      setIsLoading(false)
    }
   }).catch(error=>{
    console.log(error)
   setIsLoading(false)
   })




    },[])
console.log(profile)

 return  <>
          <section className="relative md:px-16 px-4"> 

            <article className="bg-white p-4">


   
              <div className="" >
                <img src={profile?.cover_image?profile.cover_image:placeholder} alt="cover image" className=" w-full h-36 object-cover
                border 
                "/>
                <img src={profile?.image?profile.image:ProfilePic} alt=""
                  className="rounded-full border-2 border-black w-28 h-28 absolute top-28" id="profile" /> 
               <div id="Name and Edit pannel" className="pt-16 pb-4 flex justify-between">
                              
                <div id="name" className="p-2 gap-2  flex">
                  <h4 id="name" className=" text-2xl font-semibold ">{profile?.first_name} {profile?.last_name}</h4>
                  {profile?.pronoun&&<p className="text-gray-500">{profile.pronoun}</p>}
                </div>
               {userDetails?.id === id &&  <button title="Edit profile" className=" rounded-full  
        
        hover:bg-orange-100 w-8 h-8 lg:w-10 lg:h-10" onClick={()=>setIsFormVisible(prev=>!prev)}> <img src={Edit} alt="" id="edit" className="w-10 h-10 p-2 hover:scale-90 transition-all duration-200" /></button>  }
                  </div>          
              </div>
              <div id="buttons" className="flex gap-4">
                 {profile?.domain&&<a href={profile.domain} target="_blank" className="text-sm  border border-sky-400 p-2 rounded-2xl hover:bg-orange-100 text-sky-500 hover:scale-95 transition-all duration-200 ">{profile.domain_title}</a>}
                 <a  href="linkto:" className="text-sm  border hover:bg-orange-100 border-sky-400 p-2 rounded-2xl hover:scale-95 transition-all duration-200 text-sky-500">{profile?.email}</a>
              </div>
              </article>

              <article className="bg-white p-4 mt-2 ">

           {profile?.about&&  <div id="about" className="">
                <h4 className="text-3xl font-semibold ">About</h4>
                <p className="text-lg py-4 text-gray-500 ">
                 {profile.about}</p>
             </div>}
             
             
             </article>

          <article className="bg-white p-4 mt-2">


      
             <h4 className="text-3xl font-semibold p-2">Activity</h4>
            {isLoading?<DashboardSkeletonLoader/> :posts.length===0? userDetails.id===id?<div><h4 className="text-sm py-2 font-medium text-center text-gray-400 lg:text-lg ">It looks empty here try adding a post on <Link to="/dashboard" className="text-sky-500 hover:opacity-70 hover:underline underline-offset-4">Write</Link> </h4></div>:<h4 className="text-sm py-2 font-medium text-center text-gray-400 lg:text-lg ">It looks empty here try adding a post on </h4> : <div id="posts" className="px-4 lg:px-14 h-[70vh]">
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
<div  className=" w-[300px] flex  justify-end">
<img src={post.images[0]?.image} className="h-[130px] w-[130px] shadow-md sm:h-40 sm:w-40 md:h-52 md:w-52" alt="" />
</div>

</div>

    ) 
  })

}

 <Link to="/dashboard" className="w-full  bg-black rounded-xl p-2 text-white text-lg font-semibold transition-all duration-200 hover:scale-95 hover:opacity-85">View more </Link>
 </div>}
 </article>
 
 {IsFormVisible&&<ProfileForm profileDetails={profile} shouldShow={IsFormVisible} handleToggle={()=>setIsFormVisible(prev=>!prev)} />}
  </section>
 
 </>
}