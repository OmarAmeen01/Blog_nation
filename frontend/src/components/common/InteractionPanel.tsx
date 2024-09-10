import share from "../../assets/share.svg"
import like from "../../assets/like.svg"
import unlike from "../../assets/unlike.svg"
import commet from "../../assets/comment.svg"
import linkedin from "../../assets/linkedin-svgrepo-com.svg"
import whatsapp from "../../assets/whatsapp-svgrepo-com.svg"
import facebook from "../../assets/facebook-color-svgrepo-com.svg"
import copy from "../../assets/copy-svgrepo-com.svg"
import tick from "../../assets/file-tick-svgrepo-com.svg"
import { Comments } from "../../typescript/interfaces"
import twitter from "../../assets/twitter-color-svgrepo-com.svg"
import { useEffect, useState } from "react"
import axios from "axios"
import { User } from "../../typescript/interfaces"
import { Store } from "../../typescript/interfaces"
import { useSelector,useDispatch } from "react-redux"
import hasUserLiked from "../../helper/hasUserLiked"
import { setIsFormVisible, setIsSigninClicked } from "../../store/authSlice"
import CommentComponet from "./comment/comments"
import { validateNotification } from "mediumvalidate"



export default function ({ postId }: { postId: string }) {
   console.log(postId)
   const ShareLinks =[
      {     name:"linkedin",
           link:`https://www.linkedin.com/shareArticle?mini=true&url=https://yourwebsite.com&title=This%20post%20was%20created%20using%20my%20own%20website!&summary=Check%20it%20out%20here&source=http://localhost:5173` ,
           img:linkedin
        },
     {     name:"whatsapp",
           link:`https://api.whatsapp.com/send?text=This%20post%20was%20created%20using%20my%20own%20website!%20http://localhost:5173:/post/${postId}`,
           img:whatsapp
        },
      {    name:"facebook",
           link:`https://www.facebook.com/sharer/sharer.php?u=http://localhost:5173:/post/${postId}"`,
           img:facebook
        },
     {     name:"twitter",
           link:`https://twitter.com/intent/tweet?text=This%20post%20was%20created%20using%20my%20own%20website!%20&url=http://localhost:5173:/post/${postId}` ,
           img:twitter
        },
     
     ]
     const [updateComponent,setUpdateComponent] = useState(false)
     const [totalComments,setTotalComments] = useState<number>()
   const [isCommentClicked, setisCommentClicked] = useState(false)
   const [isShareClicked, setisShareClicked] = useState(false)
  const [comments, setComments] = useState<Comments[]>([])

   const [isLikeClicked,setIsLikeClicked] = useState(false)
   const [likeCount,setLikeCount] = useState<number>()
  const [isTextCopied,setTextCopied]= useState(false)
  const [isReponseSend,setResponseSend] = useState(false)
  const userApiUrl = import.meta.env.VITE_USER_API_URL
  const [notification,setNotification] = useState<validateNotification>({
   
   user_id:"",
 type:"",
 like_id:""
 })

   const blogUrl = import.meta.env.VITE_POST_API_URL
   const userDetails = useSelector<Store>(state=>state.auth.userData)
   const loginStatus = useSelector<Store>(state=>state.auth.status) as boolean
   const  formVisible = useSelector<Store>(state=>state.auth.isFromVisible) as boolean
   const  signinVisible = useSelector<Store>(state=>state.auth.isSigninClicked) as boolean

   const {id}= userDetails as User
   const dispatch = useDispatch()
  useEffect(()=>{
   axios.get(`${blogUrl}/likes/${postId}`,{withCredentials:true}).then(res=>{
       if(res.data.status){
         const likes = res.data.data
          setIsLikeClicked(hasUserLiked(likes,id))
         setLikeCount(likes.length)

       }
   })

  },[isLikeClicked])

  useEffect(() => {

   axios.get(`${blogUrl}/comments/${postId}`, { withCredentials: true }).then(res => {
     if (res.data.status) {
       setComments(res.data.data)
       setTotalComments(res.data.data.length)
     }
   }).catch(error => {
     console.log(error)
   })
 }, [updateComponent])


 function HandleLikeClick() {

  if(!loginStatus){
   dispatch(setIsFormVisible(!formVisible))
   dispatch(dispatch(setIsSigninClicked(!signinVisible)))
  }else{
   const newLikeState = !isLikeClicked
   setIsLikeClicked(newLikeState)
       if (newLikeState) { 
          axios.post(`${blogUrl}/like/${postId}`, {}, {
             withCredentials: true
          }).then(res => {
            
             if (res.data.status) {
               const data =res.data.data
               setNotification(prev=>({
                  ...prev,
                  type:"like",
                  user_id:data.user_id,
                  like_id:data.id
                }))
               setIsLikeClicked(res.data.status)
             
          setResponseSend(true)
             }
          }).catch(error => {
             console.log(error)
          })
       } else {
          axios.delete(`${blogUrl}/like/${postId}`, { withCredentials: true }).then(res => {
             console.log(res)
             if (res.data.status) {
                setIsLikeClicked(prev=>!prev)
             }
          }).catch(error => {
             console.log(error)
          })
       }
  }
   }

useEffect(()=>{
   isReponseSend&& axios.post(`${userApiUrl}/notification`,notification,{withCredentials:true}).then(res=>{
      console.log(res)
    })
},[isReponseSend])
   function handleCommentClick(){
 if(!loginStatus){
 dispatch(   setIsFormVisible(!formVisible))
   dispatch(setIsSigninClicked(!signinVisible))

 }else{
   setisCommentClicked(prev=>!prev)
 }
   }
  
   function handleComponentUpdate(){
      setUpdateComponent(prev=>!prev)
   }

   return <div className="flex gap-3 p-2">

      <button onClick={HandleLikeClick} className="hover:opacity-60 flex gap-1">
         <img className="h-6 w-6 " src={isLikeClicked ? unlike : like} title="Like" alt="" />
         <p id="like" className="text-gray-500">{likeCount}</p>
      </button>
     {isCommentClicked&& <CommentComponet comments={comments} postId={postId} updateComponent={handleComponentUpdate} isCommentClicked={isCommentClicked} handleToggle={handleCommentClick}/>}
      <button className="hover:opacity-60 flex gap-1 " onClick={handleCommentClick}>
         <img src={commet} className="h-6 w-6 hover:opacity-60" alt="" title="Comment" />
         <p id="like" className="text-gray-500">{totalComments}</p>
      </button>
    
          {isShareClicked&&
           <div>
             <div id="overlay " className="absolute -bottom-40 left-0  w-[100%] h-[130vh] z-10"  onClick={()=>{
            setisShareClicked(prevState=>!prevState)
        }}></div>
            <div className="absolute z-20  bottom-9 bg-gray-200  shadow-3xl border-2 rounded-lg flex flex-col">
            <h4 className="text-center text-lg font-bold p-2">Share On</h4><div id="links" className="flex p-2  gap-3 flex-row">
          {ShareLinks.map(link=>{
          return   <a href={link.link} title={`share on ${link.name}`} target="_blank" ><img src={link.img} className="h-6 w-6 transition-all duration-200 ease-in-out  hover:-translate-y-1 hover:scale-105"  alt={link.name} /></a>
          })}  

          <button  onClick={()=>{
            navigator.clipboard.writeText(`http://localhost:5173:/post/${postId}`).then(text=>{
               setTextCopied(true)
            })
          }}><img src={isTextCopied?tick:copy} className="h-6 w-6"  alt="Copy text" /></button>
          </div>
      </div>
            </div>}
      <button className="hover:opacity-60 flex gap-1" onClick={()=>{
         setisShareClicked(prev=>!prev)
      }}>
         <img className="h-6 w-6 hover:opacity-60 " src={share} alt="" title="Share" />
 
      </button>

   </div>
}