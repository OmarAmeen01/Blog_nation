import share from "../../assets/share.svg"
import like from "../../assets/like.svg"
import unlike from "../../assets/unlike.svg"
import commet from "../../assets/comment.svg"
import { useState } from "react"


export default function () {
    const [isCommentClicked,setisCommentClicked] =useState(false)
    const [isShareClicked,setisShareClicked] =useState(false)
    const [isLikeClicked,setisLikeClicked] =useState(false)
   return <div className="flex gap-3 p-2">

        <button  onClick={()=>{
            setisLikeClicked(prevState=>!prevState)
        }} className="hover:opacity-60 flex gap-1">
          <img className="h-6 w-6 " src={isLikeClicked?unlike:like} title="Like" alt="" />
          <p id="like" className="text-gray-500">1</p>
        </button>
       <button className="hover:opacity-60 flex gap-1 ">
          <img src={commet} className="h-6 w-6 hover:opacity-60" alt="" title="Comment"/>
          <p id="like" className="text-gray-500">1</p>
       </button>
       <button className="hover:opacity-60 flex gap-1">
          <img className="h-6 w-6 hover:opacity-60 " src={share} alt="" title="Share" />
          <p id="like" className="text-gray-500">1</p>
       </button>
        
    </div>
}