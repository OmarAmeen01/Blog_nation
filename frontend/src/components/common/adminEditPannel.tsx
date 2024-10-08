import { useEffect,useState } from "react"
import threeDot from "../../assets/threeDots.svg"
import verifyPostOwner from "../../helper/verifyPostOwner"
import { Link, useNavigate} from "react-router-dom"
import axiosBlogInstance from "../../api/AxiosBlogInstance"
import ConfimationDailog from "./confirmationDailog"
import axiosUserInstance from "../../api/AxiosUserInstance"


export default function AdmimEditPannel({postId,ownerId}:{postId:string,ownerId:string}){
const [isLoading,setIsLoading] =useState(true)
const [isDeleteClicked,setIsDeletdClicked] = useState(false)
const [isPannelClick,setIsPannelClicked] =useState(false)
const [posts,setPosts] = useState([])
const [watched,setWatched] = useState<number>(0)

const navigate = useNavigate()



useEffect(()=>{
if(isDeleteClicked){
  axiosUserInstance.get(`/watched/${ownerId}`).then(res=>{
    if(res.data.status){
      console.log(res.data)
      if(watched>0){
        setWatched(res.data.data.watched-1)
      }else{
        setWatched(res.data.data.watched)
      }
    }
})
}
},[isDeleteClicked])
  


    useEffect(()=>{
    axiosBlogInstance.get(`/dashboard`,{
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

async function handleDeleteClick(postId:string,ownerId:string){
    const response =await axiosBlogInstance.delete(`/delete_post/${postId}`,{
        withCredentials:true
    })
    if(response.data.status){

    axiosUserInstance.put(`/watched/${ownerId}`,{watched:watched},{withCredentials:true}).then(res=>{
            if(res.data.status){
            }
    })

  if(window.location.pathname==="/" || window.location.pathname==="/dashboard" || window.location.pathname==="/dashboard/:id"){
    window.location.reload()
  }else{
    navigate("/")
  }
 }
}

function handCancelClick(){
 setIsDeletdClicked(prev=>!prev)

}

return  isLoading?null: verifyPostOwner(postId,posts)&&
<>
{isPannelClick&&<div id="adminOptions">
    <div id="overlay " className="absolute top-0 left-0  w-full h-[130vh]" title="Admin edit pannel" onClick={()=>{
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
<ConfimationDailog
ShouldShow={isDeleteClicked} handleCancel={handCancelClick} handleVisibility={()=>setIsPannelClicked(prev=>!prev)}  handleAgree={()=>handleDeleteClick(postId,ownerId)} title="Delete Story" description="Deleting the story is a irreversible, are you sure?" />

</>





}

