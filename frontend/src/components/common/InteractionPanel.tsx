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
import { User } from "../../typescript/interfaces"
import { Store } from "../../typescript/interfaces"
import { useSelector,useDispatch } from "react-redux"
import hasUserLiked from "../../helper/hasUserLiked"
import { setIsFormVisible, setIsSigninClicked } from "../../store/authSlice"
import CommentComponet from "./comment/comments"
import { validateNotification } from "mediumvalidate"
import axiosBlogInstance from "../../api/AxiosBlogInstance"
import axiosUserInstance from "../../api/AxiosUserInstance"

export default function ({ postId,ownerId }: { postId: string ,ownerId:string}) {
   const Facebook_app_id = import.meta.env.VITE_FACEBOOK_APP_ID
   const ShareLinks =[
      {     name:"linkedin",
           link:`https://www.linkedin.com/shareArticle?mini=true&url=https://yourwebsite.com&title=This%20post%20was%20created%20using%20my%20own%20website!&summary=Check%20it%20out%20here&source=https://blog-nation-three.vercel.app/post/${postId}` ,
           img:linkedin
        },
     {     name:"whatsapp",
           link:`https://api.whatsapp.com/send?text=This%20post%20was%20created%20using%20my%20own%20website!%2https://blog-nation-three.vercel.app/post/${postId}`,
           img:whatsapp
        },
      {    name:"facebook",
           link:`http://www.facebook.com/dialog/feed?  
app_id=${Facebook_app_id}&  
link=https://blog-nation-three.vercel.app/post/${postId}&  
name=Facebook%20Dialogs&  
caption=Post%20Link& 
description=Dialogs%20provide%20a%20simple,%20consistent%20interface%20for%20applications%20to%20interact%20with%20users.&
message=Facebook%20Dialogs%20are%20so%20easy!&
redirect_uri=https://blog-nation-three.vercel.app`,
           img:facebook
        },
     {     name:"twitter",
           link:`https://twitter.com/intent/tweet?text=This%20post%20was%20created%20using%20my%20own%20website!%20&url=https://blog-nation-three.vercel.app/post/${postId}` ,
           img:twitter
        },
     
     ]
     const [updateComponent,setUpdateComponent] = useState(false)
     const [totalComments,setTotalComments] = useState<number>()
   const [isCommentClicked, setisCommentClicked] = useState(false)
   const [isShareClicked, setisShareClicked] = useState(false)
  const [comments, setComments] = useState<Comments[]>([])
  const [watched,setWatched] = useState<number>(0)
   const [isLikeClicked,setIsLikeClicked] = useState(false)
   const [likeCount,setLikeCount] = useState<number>()
  const [isTextCopied,setTextCopied]= useState(false)
  const [isReponseSend,setResponseSend] = useState(false)
  const [notification,setNotification] = useState<validateNotification>({
   
   user_id:"",
 type:"",
 like_id:"",
 owner_id:"",
 post_id:postId,
 msg:"Liked your Post"
 })

   const userDetails = useSelector<Store>(state=>state.auth?.userData)
   const loginStatus = useSelector<Store>(state=>state.auth.status) as boolean
   const  formVisible = useSelector<Store>(state=>state.auth.isFromVisible) as boolean
   const  signinVisible = useSelector<Store>(state=>state.auth.isSigninClicked) as boolean

   const {id}= userDetails as User
   const dispatch = useDispatch()
  useEffect(()=>{
   axiosBlogInstance.get(`/likes/${postId}`,{withCredentials:true}).then(res=>{
       if(res.data.status){
         const likes = res.data.data
          setIsLikeClicked(hasUserLiked(likes,id))
         setLikeCount(likes.length)

       }
   })

  },[isLikeClicked])



  useEffect(()=>{
 if(!isLikeClicked){
   axiosUserInstance.get(`/watched/${ownerId}`).then(res=>{
      if(res.data.status){
 if(watched>0){
   setWatched(res.data.data.watched-1)
 }else{
   setWatched(res.data.data.watched)
 }
      }
  })
 }
  },[isLikeClicked])
  useEffect(() => {

   axiosBlogInstance.get(`/comments/${postId}`, { withCredentials: true }).then(res => {
     if (res.data.status) {
       setComments(res.data.data)
       setTotalComments(res.data.data.length)
     }
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
          axiosBlogInstance.post(`/like/${postId}`, {}, {
             withCredentials: true
          }).then(res => {

             if (res.data.status) {
               const data =res.data.data
               setNotification(prev=>({
                  ...prev,
                  type:"likes",
                  user_id:data.user_id,
                  like_id:data.id,
                  owner_id:ownerId,
                  post_id:postId,
                  msg:`Liked your post`
                }))
                setResponseSend(true)
               setIsLikeClicked(res.data.status)
             
             }
          })
       } else {
          axiosBlogInstance.delete(`/like/${postId}`, { withCredentials: true }).then(res => {
             if (res.data.status) {
               axiosUserInstance.put(`/watched/${ownerId}`,{watched:watched},{withCredentials:true}).then(res=>{
                  console.log(res.data)
                  if(res.data.status){
                  }
               })
                setIsLikeClicked(prev=>!prev)
             }
          })
       }
  }
   }

useEffect(()=>{
   isReponseSend&& axiosUserInstance.post(`/notification`,notification,{withCredentials:true})
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
         <img className="h-6 w-6" src={isLikeClicked ? unlike : like} title="Like" alt="" />
         <p id="like" className="text-gray-500">{likeCount}</p>
      </button>
     {isCommentClicked&& <CommentComponet ownerId={ownerId} comments={comments} postId={postId} updateComponent={handleComponentUpdate} isCommentClicked={isCommentClicked} handleToggle={handleCommentClick}/>}
      <button className="hover:opacity-60 flex gap-1 " onClick={handleCommentClick}>
         <img src={commet} className="h-6 w-6 hover:opacity-60" alt="" title="Comment" />
         <p id="comment" className="text-gray-500">{totalComments}</p>
      </button>
    
          {isShareClicked&&
           <div>
             <div id="overlay " className="absolute -bottom-40 left-0  w-[100%] h-[130vh] z-10"  onClick={()=>{
            setisShareClicked(prevState=>!prevState)
        }}></div>
            <div className="absolute z-20  bottom-9 bg-gray-200  shadow-3xl border-2 rounded-lg flex flex-col">
            <h4 className="text-center text-lg font-bold p-2">Share On</h4><div id="links" className="flex p-2  gap-3 flex-row">
          {ShareLinks.map(link=>{
          return   <a href={link.link}  key={link.link}
          title={`share on ${link.name}`} target="_blank" ><img src={link.img} className="h-6 w-6 transition-all duration-200 ease-in-out  hover:-translate-y-1 hover:scale-105"  alt={link.name} /></a>
          })}  

          <button  onClick={()=>{
            //@ts-ignore
            navigator.clipboard.writeText(`https://blog-nation-three.vercel.app/post/${postId}`).then(text=>{
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