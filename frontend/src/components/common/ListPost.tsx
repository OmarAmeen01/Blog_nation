import { Post } from "../../typescript/interfaces";
import { Link } from "react-router-dom";
import InteractionPanel from "./InteractionPanel";
import AdmimEditPannel from "./adminEditPannel";
import formatDate from "../../helper/dateConverter";
export default function ListPost({post}:{post:Post}){
    return (<div key={post.id} id={post.id} className="p-2 flex bg-white border-2 rounded-lg shadow-lg my-3 max-[630px]:justify-center max-[630px]:items-center  sm:justify-between">
<div className="   p-2 w-full" id="post desc">
<Link to ={`/profile/${post.user_id}`}> 
   <div id="author" className="flex relative" title="Go to Profile">
 <img src={post.user.image} className="rounded-full  border=-black border h-9 w-9 md:h-12 md:w-12" alt="" />
 <p className="text-gray-500 text-sm p-2 md:text-lg font-semibold">{post.user.first_name} {post.user.last_name}</p>
 </div>
 </Link>
 <Link to={`/post/${post.id}`}> 
 <div  title="Go to Post">
   <h4 className="text-2xl font-bold p-2 md:text-3xl">{post.content[0].blocks[0]?.data.text} ...</h4>
   <p className="text-gray-500 text-sm  p-2 md:tex-lg">{formatDate(post.created_at).timeAgo}</p>

   <p className=" p-2 md:text-xl">{post.content[0].blocks[1]?.data.text.slice(0,135)}...</p>
   </div>
   </Link>
   <div className="flex justify-between relative "> <InteractionPanel postId={post.id} ownerId={post.user_id}/> <AdmimEditPannel postId={post.id} ownerId={post.user_id}/></div>
   </div>
   {post?.images[0]?.image &&<div className="w-[300px]" >
          <img src={post.images[0]?.image} title="Post Image" className="h-[130px] w-[130px] shadow-md sm:h-40 sm:w-40 md:h-52 md:w-52" alt="" />
          </div>
          }

</div>)
}