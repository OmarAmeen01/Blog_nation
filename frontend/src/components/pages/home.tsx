import Button from "../common/button"
import { useEffect, useState } from "react"
import heroImg from "../../assets/vecteezy_man-working-with-computer-with-app-in-isometric-illustration_-removebg-preview.png"
import { useDispatch, useSelector } from "react-redux"
import InteractionPanel from "../common/InteractionPanel"
import Signin from "../auth/signin"
import { setIsFormVisible, setIsSigninClicked, setIsSignupClicked } from "../../store/authSlice"
import axios from "axios"
import { Link } from "react-router-dom"
import { setPosts } from "../../store/postSlice"
import { Post,Store, User } from "../../typescript/interfaces"
import dateConverter from "../../helper/dateConverter"
import sortPosts from "../../helper/sortPosts"
import uniqueCategoryFilter from "../../helper/uniqueCategoryFilter"
import AdmimEditPannel from "../common/adminEditPannel"
import DashboardSkeletonLoader from "../common/loaders/skeltonLoaderDashboard"
import ListPost from "../common/ListPost"
//function 
const postApiUrl = import.meta.env.VITE_POST_API_URL
//  interface



export default function Home() {
  
  const [isLoading, setIsLoading] = useState(true)
const [isCategoryCliked,setCategoryClicked]=useState(false)
const [categoryName,setCategoryName] =useState("")
  const [blogPosts,setblogPosts] = useState<Post[]>([])
  const [Error,setError] = useState<string>("")
  const dispatch = useDispatch()

  useEffect(() => {
    // if you dont update the state of component it wont't work or show on render 
    try {
    setIsLoading(true)
    
   async function getPost() {
    
    const response = await axios.get(`${postApiUrl}/posts`)

    if(response.data.status){
      console.log(response.data.data)
     dispatch(setPosts([true, response.data.data]))
     setblogPosts(response.data.data)
     setIsLoading(false)
    }else{
      setError("Could load your feed try after some time")
    }
   }
 getPost()
    } catch (error) {
   setError("Could load your feed try after some time")

    }


  }
    , [])
    

  const isFromVisible = useSelector<Store>(state => state.auth.isFromVisible) as boolean
  const isSigninClicked = useSelector<Store>(state => state.auth.isSigninClicked) as boolean
  const isSignupClicked = useSelector<Store>(state => state.auth.isSignupClicked)
  const status = useSelector<Store>(state=>state.auth.status) as boolean
  const stateUser = useSelector<Store>(state=>state.auth.userData)
  const userDetails = stateUser as User
  
  return (<>
    <main className="px-4 ">
      {!status&& <section id="hero" className="bg-[#f9f4f5] rounded-lg px-4">
        <div className=" flex justify-around sm:px-8 lg:px-16">
          <div className="py-4 w-[30rem] ">
            <h1 className="text-3xl font-bold lg:text-7xl ">Discover the stories that matter</h1>
            <p className="text-lg font-mono py-4 text-gray-500">Read and share the best stories on the internet. Join the conversation and connect with a community of passionate readers and writers.</p>
           <div className="flex  gap-4">
              <Button name="Sign up" onClick={() => {
                dispatch(setIsSignupClicked(!isSignupClicked))
                dispatch(setIsSignupClicked(!isSigninClicked))
                dispatch(setIsFormVisible(!isFromVisible))
              }} />
              <Button name="Sign in" onClick={() => {
                dispatch(setIsSigninClicked(!isSigninClicked))
                dispatch(setIsSigninClicked(!isSignupClicked))
                dispatch(setIsFormVisible(!isFromVisible))
              }
              } />
            </div>
          </div>
          <div className="hidden sm:block">
            <img className="h-[330px] min-w-[230px] lg:h-[480px] lg:w-[450px]" src={heroImg} alt="hero image" />
          </div>
        </div>
        {isSigninClicked && <Signin />}
      </section>
}


{isLoading?<DashboardSkeletonLoader/>: <section id="posts" className=" mt-3 rounded-lg mb-3 flex gap-3">
        <article id="postDetail" className="">
      <div id="heading" className="flex gap-4  p-2 rounded-lg  border-b ">            
         <p className="text-xl font-semibold font-mono p-2  md:text-2xl bg-white w-full rounded-lg">Featured posts</p>
          </div>


 
          {/* <div id="posts">
 
          <div  className="p-2 shadow-sm flex max-[630px]:justify-center max-[630px]:items-center  sm:justify-between">

<div className="   p-2" id="post desc">
 <div id="author" className="flex">
 <img src={heroImg} className="rounded-full  border=-black border h-8 w-8 md:h-12 md:w-12" alt="" />
 <p className="text-gray-400 text-sm p-2 md:text-lg">joseph mazani</p>
 </div>
   <h4 className="text-2xl font-bold p-2 md:text-3xl">This how title of post looks like</h4>
   <p className="text-gray-400 text-sm  p-2 md:tex-lg">2months ago</p>

   <p className=" p-2 md:text-xl">Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus aperiam consequuntur incidunt debitis quis, dolorem voluptatibus eligendi omnis at vero.</p>
   </div>
   <div  >
   <img src={heroImg} className="h-[130px] w-[130px] shadow-md sm:h-40 sm:w-40 md:h-52 md:w-52" alt="" />
   </div>

</div>
<div  className="p-2 shadow-sm flex max-[630px]:justify-center max-[630px]:items-center  sm:justify-between">

<div className="   p-2" id="post desc">
 <div id="author" className="flex">
 <img src={heroImg} className="rounded-full  border=-black border h-8 w-8 md:h-12 md:w-12" alt="" />
 <p className="text-gray-400 text-sm p-2 md:text-lg">joseph mazani</p>
 </div>
   <h4 className="text-2xl font-bold p-2 md:text-3xl">This how title of post looks like</h4>
   <p className="text-gray-400 text-sm  p-2 md:tex-lg">2months ago</p>

   <p className=" p-2 md:text-xl">Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus aperiam consequuntur incidunt debitis quis, dolorem voluptatibus eligendi omnis at vero.</p>
   <InteractionPanel/>
   </div>
   <div  >
   <img src={heroImg} className="h-[130px] w-[130px] shadow-md sm:h-40 sm:w-40 md:h-52 md:w-52" alt="" />
   </div>

</div>
</div> */}

  <div id="posts">
      

   {isCategoryCliked?sortPosts(blogPosts,categoryName).map(post=>{
        return(
          <ListPost post={post}/>
        )
       })
       : blogPosts.map(post => {
            return (<ListPost post={post}/> ) 
          })} 

   </div>
</article>
        <aside id="category" className="rounded-lg hidden min-w-72 p-4 lg:block bg bg-[rgba(0,0,0,0.1)]">
      <h4 className=" text-xl font-bold p-2 mb-4">Recommended Topics</h4>
              
            <div id="category-buttons" className=" ">
              <button id="all" className="p-2 bg-white  rounded-lg hover:scale-110 hover:opacity-80 transition-all  duration-200 font-mono " onClick={()=>{
                setCategoryClicked(false)
              }}>All</button>
          {isLoading?<p>loading</p>:uniqueCategoryFilter(blogPosts).map(category => {
            return <button id={category} className="bg-white text-lg font-mono p-3 rounded-3xl hover:scale-110 transition-all duration-200 hover:placeholder-opacity-80  m-1" onClick={()=>{
              setCategoryClicked(true),
              setCategoryName(category)
            }}>{category}</button>
          })}
          </div>
        </aside>

        </section>}

    </main>
  </>
  )
}