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
import ListPost from "../common/ListPost"


export default function Profile(){
  
    const [posts,setPosts]= useState<Post[]>([])
    const [profile,setProfile] =useState<ProfileDetails>() 
    const [IsFormVisible,setIsFormVisible] = useState(false)
    const [isLoading,setIsLoading] =useState(true)
    const storedUser = useSelector<Store>(state=>state.auth.userData)
    const userDetails = storedUser as User
const blogUrl = import.meta.env.VITE_POST_API_URL
const userApiUrl= import.meta.env.VITE_USER_API_URL
 const {id} = useParams()
    useEffect(()=>{

        
      
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

   axios.get(`${blogUrl}/dashboard`,{withCredentials:true}).then(response=>{
    if(response.data.data){
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

    },[])
  




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

          <article className="bg-white p-4 mt-2 
          ">


      
             <h4 className="text-3xl font-semibold p-2">Activity</h4>
            {isLoading?<DashboardSkeletonLoader/> :posts.length===0? userDetails.id===id?<div><h4 className="text-sm py-2 font-medium text-center text-gray-400 lg:text-lg ">It looks empty here try adding a post on <Link to="/addpost" className="text-sky-500 hover:opacity-70 hover:underline underline-offset-4">Write</Link> </h4></div>:<h4 className="text-sm py-2 font-medium text-center text-gray-400 lg:text-lg ">It looks empty here try adding a post on </h4> : <div id="posts" className="px-4 lg:px-14">
     {posts.map(post => {
    return (<ListPost post={post}/>
    ) 
  })

}


<div className=" bg-black rounded-xl p-2 text-white text-lg font-semibold transition-all duration-200 hover:scale-95 hover:opacity-85 flex justify-center "><Link to="/dashboard" className="w-full text-center">View more </Link></div>
 </div>}
 </article>
 
 {IsFormVisible&&<ProfileForm profileDetails={profile} shouldShow={IsFormVisible} handleToggle={()=>setIsFormVisible(prev=>!prev)} />}
  </section>
 
 </>
}