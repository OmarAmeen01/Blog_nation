import { useEffect,useState } from "react"
import axios from "axios"
import threeDot from "../../assets/threeDots.svg"
import verifyPostOwner from "../../helper/verifyPostOwner"

import { Link } from "react-router-dom"
import Button from "./button"
import ConfimationDailog from "./confirmationDailog"

export default function AdmimEditPannel({postId}:{postId:string}){
const [isLoading,setIsLoading] =useState(true)
const [isDeleteClicked,setIsDeletdClicked] = useState(false)
const [isPannelClick,setIsPannelClicked] =useState(false)
const [posts,setPosts] = useState([])
const postApiUrl = import.meta.env.VITE_POST_API_URL




    useEffect(()=>{
    axios.get(`${postApiUrl}/dashboard`,{
        withCredentials:true
    }).then(response=>{
      if(response.data.data){
        setPosts(response.data.data)
     setIsLoading(false)
      }else{
        setPosts([])
     setIsLoading(false)
      }
    }).catch(error=>{
        console.log(error)
        setIsLoading(false)
    })
    },[])
//function

async function handleDeleteClick(postId:string){
    const response =await axios.delete(`${postApiUrl}/delete_post/${postId}`,{
        withCredentials:true
    })
    if(response.data.status){
       window.location.reload()
 }
}

function handCancelClick(){
 setIsDeletdClicked(prev=>!prev)

}



return  isLoading?null: verifyPostOwner(postId,posts)&&
<>
{isPannelClick&&<div id="adminOptions">
    <div id="overlay " className="absolute top-0 left-0  w-full h-[130vh]" onClick={()=>{
            setIsPannelClicked(prevState=>!prevState)
        }}></div>
        <div className="bg-white  absolute flex flex-col right-2 bottom-12 border-2 gap-4 p-6 shadow-md">
          <Link to={`/addpost/${postId}`}className="font-sans text-xl  hover:text-black text-gray-800 opacity-80">Edit story</Link>
          <button className="font-sans  text-xl text-red-500 hover:opacity-100 opacity-80" onClick={()=>setIsDeletdClicked(prev=>!prev)} >Delete store</button>
        
       </div>
     
</div>}
<div id="threeDot">
          
          <button className=" hover:opacity-60 " onClick={()=>{
            setIsPannelClicked(prevState=>!prevState)
          }}>
             <img className=""  src={threeDot} alt="more" title="More options" />
          </button>

</div>
<ConfimationDailog ShouldShow={isDeleteClicked} handleCancel={handCancelClick} handleVisibility={()=>setIsPannelClicked(prev=>!prev)}  handleAgree={()=>handleDeleteClick(postId)} title="Delete Story" description="Deleting the story is a irreversible, are you sure?" />

</>





}

