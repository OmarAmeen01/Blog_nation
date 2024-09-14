import InputComponet from "../inputComponet"
import {  useEffect, useState } from "react"
import { Store, User, Comments } from "../../../typescript/interfaces"
import { useSelector } from "react-redux"
import Button from "../button"
import axios from "axios"
import profile from "../../../assets/profile.png"
import Comment from "./comment"
import { validateNotification } from "mediumvalidate"
import axiosBlogInstance from "../../../api/AxiosBlogInstance"
import axiosUserInstance from "../../../api/AxiosUserInstance"

 type CommentComponet={
  isCommentClicked:boolean,
  handleToggle:()=>void,
   postId:string, 
   updateComponent:()=>void,
   comments:Comments[],
   ownerId:string,
 }

export default function CommentComponet({isCommentClicked,handleToggle , postId ,updateComponent,comments,ownerId}:CommentComponet) {


const [notification,setNotification] = useState<validateNotification>({
  user_id:"",
type:"",
comment_id:"",
owner_id:"",
post_id:postId,
msg:""
})
  const [text, setText] = useState("")
  const [sentresponse,setsentResponse] = useState(false)
  const userDetails = useSelector<Store>(state => state.auth.userData) as User

  function handleSubmit() {
  axiosBlogInstance.post(`/comment/${postId}`,{text:text},{withCredentials:true}).then(res=>{
    if(res.data.status){
    const data = res.data.data
    updateComponent()
    setNotification(prev=>({
      ...prev,
      type:"comments",
      user_id:data.user_id,
      comment_id:data.id,
      owner_id:ownerId,
      post_id:postId,
      msg:`Commented ${text.slice(0,20)}... on your post`
    }))
    
    setText("")   
  setsentResponse(prev=>!prev)
    }
  })

  }

  function handleComponentUpdate(){
updateComponent()
  }

  useEffect(()=>{

   sentresponse&& axiosUserInstance.post(`/notification`,notification,{withCredentials:true}).then(res=>{

    })
  },[sentresponse])
  return<>
  
  <div id="overlay " className={`fixed ${isCommentClicked?"block":" opacity-0 hidden"}  bg-[rgba(0,0,0,0.4)] top-0 left-0 z-10 w-[100%] h-[100%]`}onClick={handleToggle}></div>
  <section id="comments" className={`fixed w-[95%] left-2 md:mdStyle overflow-y-scroll lg:lgStyle bg-white z-10 p-4 rounded-lg shadow-lg  transition-all duration-500   
    ${isCommentClicked?"top-20 opacity-1 ":"top-[30rem] opacity-0 md:left-[100%] "}`}>

    <article id="userDetails" className="flex gap-2 p-4">
      <img className="rounded-full  border-black border h-11 w-11 md:h-12 md:w-12" src={userDetails.image ? userDetails.image : profile} alt={userDetails.first_name} />
      <div id="name-section">
        <p className="text-gray-500 text-lg p-2 md:text-xl font-semibold">{userDetails.first_name} {userDetails.last_name}</p>
      </div>
    </article>
    <article
      id="comment-section" className="flex gap-2 flex-col">
      <InputComponet name="comment" id="comment" className="h-20" placeholder="Comment your thought..." value={text} onChange={(e) => {
        setText(e.target.value)
      }} />
      <Button name="Comment" onClick={handleSubmit} disabled={text.length === 0 ? true : false} className={`${text.length===0?"bg-gray-300 md:text-lg":""} w-full h-12 `} />
    </article>
    <article id="comments">
      <h4 className="text-2xl font-bold p-4 border-b-2">Comments</h4>
      {comments.map(comment => {
        return <Comment comment={comment} handleComponentUpdate={handleComponentUpdate}/>
      })}
    </article>
  </section>
  </>
}