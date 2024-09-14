import Button from "../common/button"
import { useEffect, useState } from "react"
import heroImg from "../../assets/vecteezy_man-working-with-computer-with-app-in-isometric-illustration_-removebg-preview.png"
import { useDispatch, useSelector } from "react-redux"
import { setIsFormVisible, setIsSigninClicked, setIsSignupClicked } from "../../store/authSlice"
import { setPosts } from "../../store/postSlice"
import { Post,Store} from "../../typescript/interfaces"
import sortPosts from "../../helper/sortPosts"
import uniqueCategoryFilter from "../../helper/uniqueCategoryFilter"
import axiosBlogInstance from "../../api/AxiosBlogInstance"
import DashboardSkeletonLoader from "../common/loaders/skeltonLoaderDashboard"
import ListPost from "../common/ListPost"


export default function Home() {
  
  const [isLoading, setIsLoading] = useState(true)
const [isCategoryCliked,setCategoryClicked]=useState(false)
const [categoryName,setCategoryName] =useState("")
  const [blogPosts,setblogPosts] = useState<Post[]>([])
  const dispatch = useDispatch()

  useEffect(() => {
    try {
    setIsLoading(true)
    
   async function getPost() {
    
    const response = await axiosBlogInstance.get(`/posts`)

    if(response.data.status){

     dispatch(setPosts([true, response.data.data]))
     setblogPosts(response.data.data)
     setIsLoading(false)
    }
   }
 getPost()
    } catch (error) {

    }


  }
    , [])
    

  const isFromVisible = useSelector<Store>(state => state.auth.isFromVisible) as boolean
  const isSigninClicked = useSelector<Store>(state => state.auth.isSigninClicked) as boolean
  const isSignupClicked = useSelector<Store>(state => state.auth.isSignupClicked)
  const status = useSelector<Store>(state=>state.auth.status) as boolean
 
 
  
  return (<>
    <main className="px-4 ">
      {!status&& <section id="hero" className="bg-[#f9f4f5] rounded-lg px-4">
        <div className=" flex justify-around sm:px-8 lg:px-16">
          <div className="py-4 w-[30rem] ">
            <h1 className="text-3xl font-bold lg:text-7xl ">Discover the stories that matter</h1>
            <p className="text-lg font-mono py-4 text-gray-500">Read and share the best stories on the internet. Join the conversation and connect with a community of passionate readers and writers.</p>
           <div className="flex  gap-4">
              <Button name="Sign up" onClick={() => {
               if(!window.navigator.onLine){
                alert("You are offline connect and refresh")
               }
               else{
                dispatch(setIsSignupClicked(!isSignupClicked))
                dispatch(setIsSignupClicked(!isSigninClicked))
                dispatch(setIsFormVisible(!isFromVisible))
               }
              }} />
              <Button name="Sign in" onClick={() => {
               if(!window.navigator.onLine){
                alert("Your are offline connect and refresh")
                }else {
                  dispatch(setIsSigninClicked(!isSigninClicked))
                  dispatch(setIsSigninClicked(!isSignupClicked))
                  dispatch(setIsFormVisible(!isFromVisible))
                }
               
              }
              } />
            </div>
          </div>
          <div className="hidden sm:block">
            <img className="h-[330px] min-w-[230px] lg:h-[480px] lg:w-[450px]" src={heroImg} alt="hero image" />
          </div>
        </div>

      </section>
}


{isLoading?<DashboardSkeletonLoader/>: <section id="posts" className=" mt-3 rounded-lg mb-3 flex justify-between gap-3">
        <article id="postDetail" className="w-full rounded-lg">
      <div id="heading" className="flex gap-4  p-2 rounded-lg  border-b ">            
         <p className="text-xl font-semibold font-mono p-2  md:text-2xl bg-white w-full rounded-lg">Featured posts</p>
          </div>

  <div id="posts">
      

   {isCategoryCliked?sortPosts(blogPosts,categoryName).map(post=>{
        return(
          <ListPost key={post.id} post={post}/>
        )
       })
       : blogPosts.map(post => {
            return (<ListPost key={post.id} post={post}/> ) 
          })} 

   </div>
</article>
        <aside id="category" className="rounded-lg hidden min-w-72 max-w-80 p-4 lg:block bg bg-[rgba(0,0,0,0.1)]">
      <h4 className=" text-xl font-bold p-2 mb-4">Recommended Topics</h4>
              
            <div id="category-buttons" className=" ">
              <button id="all" className="p-2 bg-white  rounded-lg hover:scale-110 hover:opacity-80 transition-all  duration-200 font-mono " onClick={()=>{
                setCategoryClicked(false)
              }}>All</button>
          {isLoading?<p>loading</p>:uniqueCategoryFilter(blogPosts).map(category => {
            return <button key={category} id={category} className="bg-white text-lg font-mono p-3 rounded-3xl hover:scale-110 transition-all duration-200 hover:opacity-80  m-1 " onClick={()=>{
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