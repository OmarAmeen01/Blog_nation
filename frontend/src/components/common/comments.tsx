import InputComponet from "./inputComponet"
import { useEffect, useState } from "react"
import { Store, User, Comments } from "../../typescript/interfaces"
import { useSelector } from "react-redux"
import Button from "./button"
import axios from "axios"
import profile from "../../assets/profile.png"
import threeDot from "../../assets/threeDots.svg"
import formatDate from "../../helper/dateConverter"



export default function CommentComponet({isCommentClicked,handleToggle}:{isCommentClicked:boolean,handleToggle:()=>void}) {
  const [text, setText] = useState("")
  const [comments, setComments] = useState<Comments[]>([])
  const userDetails = useSelector<Store>(state => state.auth.userData) as User
  const blogUrl = import.meta.env.VITE_POST_API_URL
  useEffect(() => {

    axios.get(`${blogUrl}/comments/:postid`, { withCredentials: true }).then(res => {
      console.log(res)
      if (res.data.status) {
        setComments(res.data.data)
      }
    }).catch(error => {
      console.log(error)
    })
  }, [])

  function handleSubmit() {

  }
  return<>
  
  <div id="overlay " className={`fixed ${isCommentClicked?"block":" opacity-0 hidden"}  bg-[rgba(0,0,0,0.4)] top-0 left-0 z-10 w-[100%] h-[100%]`}onClick={handleToggle}></div>
  <section id="comments" className={`fixed left-16  w-[90%] left-4 bg-white z-10 p-4 rounded-lg shadow-lg   transition-all duration-500  ${isCommentClicked?"top-20 opacity-1  ":"top-[30rem] opacity-0 "}`}>

    <article id="userDetails" className="flex gap-2 p-4">
      <img className="rounded-full  border=-black border h-11 w-11 md:h-12 md:w-12" src={userDetails.image ? userDetails.image : profile} alt={userDetails.first_name} />
      <div id="name-section">
        <p className="text-gray-500 text-lg p-2 md:text-xl font-semibold">{userDetails.first_name} {userDetails.last_name}</p>
      </div>
    </article>
    <article
      id="comment-section" className="flex gap-2 flex-col">
      <InputComponet name="comment" id="comment" className="h-20" placeholder="Comment your thought..." value={text} onChange={(e) => {
        setText(e.target.value)
      }} />
      <Button name="Comment" onClick={handleSubmit} disabled={text.length === 0 ? true : false} className={`${text.length===0?"bg-gray-300 md:text-xl":""} w-full `} />
    </article>
    <article id="comments">
      <h4 className="text-2xl font-bold p-4">Comments</h4>
      {comments.map(comment => {
        return <div key={comment.id} className="p-5 gap-3 flex flex-col border-b-2">
          <div className="flex justify-between w-full ">
            <div id="user" className="flex gap-3" >
              <img className="rounded-full  border=-black border h-8 w-8 md:h-12 md:w-12" src={comment.user.image ? comment.user.image : profile} alt={comment.user.first_name} />
              <div className="">
                <p className=" text-sm px-2 md:text-lg md:font-semibold">{comment.user.first_name} {comment.user.last_name}</p>
                <p className="text-gray-500 text-sm  px-2 md:tex-lg">{formatDate(comment.timestamp).timeAgo}</p>
              </div>

            </div>
            <div>
              <button title="more Options"><img src={threeDot} className="h-6 w-6" alt="More options" /></button>
            </div>
          </div>
          <div id="comment" className="">
            <p className="text-sm p-2 md:text-xl">{comment.text}</p>
          </div>
        </div>
      })}
    </article>
  </section>
  </>
}