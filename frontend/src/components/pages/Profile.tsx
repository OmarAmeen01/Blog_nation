import { Post, ProfileDetails, Store, User } from "../../typescript/interfaces"
import { useState,useEffect } from "react"
import ProfilePic from "../../assets/profile.png"
import Edit from "../../assets/pencil-svgrepo-com.svg"

import { Link } from "react-router-dom"
import DashboardSkeletonLoader from "../common/loaders/skeltonLoaderDashboard"
import ProfileForm from "../common/profile/profileFom"
import { useParams } from "react-router-dom"
import placeholder from "../../assets/landscape-placeholder-svgrepo-com.svg"
import { useSelector } from "react-redux"
import ListPost from "../common/ListPost"
import axiosUserInstance from "../../api/AxiosUserInstance"
import axiosBlogInstance from "../../api/AxiosBlogInstance"
export default function Profile(){
  
    const [posts,setPosts]= useState<Post[]>([])
    const [profile,setProfile] =useState<ProfileDetails>() 
    const [IsFormVisible,setIsFormVisible] = useState(false)
    const [isLoading,setIsLoading] =useState(true)
    const storedUser = useSelector<Store>(state=>state.auth.userData)
    const userDetails = storedUser as User
 const {id} = useParams()
    useEffect(()=>{

        
      
   axiosUserInstance.get(`/profile/${id}`).then(response=>{
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

   axiosBlogInstance.get(`/dashboard/${id}`,{withCredentials:true}).then(response=>{
    if(response.data.status){
        setPosts(response.data.data.slice(0,2))
        setIsLoading(false)

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

    },[id])
  




 return  <>
          <section className="relative md:px-16  mb-3 "> 

            <article className="bg-white p-4 ">


   
              <div className="" >
                <img src={profile?.cover_image?profile.cover_image:placeholder} alt="cover image" className=" w-full h-24 md:h-44 object-cover
                border 
                "/>
                <img src={profile?.image?profile.image:ProfilePic} alt=""
                  className="rounded-full border-2 border-black md:w-32 w-24 h-24 md:h-32 absolute top-12 md:top-28  left-6 md:left-[4.5rem]" id="profile" /> 
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

          <article className="bg-white  mt-2 pb-3">


      
             <h4 className="text-3xl font-semibold p-2">Activity</h4>
            {isLoading?<DashboardSkeletonLoader/> : posts.length===0? <div><h4 className="text-sm py-2 font-medium text-center text-gray-400 lg:text-lg ">It looks empty here try adding a post on {userDetails.id===id&&<Link to="/addpost" className="text-sky-500 hover:opacity-70 hover:underline underline-offset-4">Write</Link>} </h4></div>: <div id="posts" className="px-4 lg:px-14">
     {posts.map(post => {
    return (<ListPost key={post.id} post={post} className="mx-1"/>
    ) 
  })

}


<div className=" bg-black rounded-xl p-2 text-white text-lg font-semibold transition-all duration-200 hover:scale-95 hover:opacity-85 flex justify-center "><Link to={`/dashboard/${id}`} className="w-full text-center">View more </Link></div>
 </div>}
 </article>
 
 {IsFormVisible&&<ProfileForm profileDetails={profile} shouldShow={IsFormVisible} handleToggle={()=>setIsFormVisible(prev=>!prev)} />}
  </section>
 
 </>
}