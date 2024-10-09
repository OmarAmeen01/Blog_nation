import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import DashboardSkeletonLoader from "../common/loaders/skeltonLoaderDashboard"
import { Link } from "react-router-dom"
import { Post } from "../../typescript/interfaces"
import formatDate from "../../helper/dateConverter"
import InteractionPanel from "../common/InteractionPanel"
import AdmimEditPannel from "../common/adminEditPannel"
import axiosBlogInstance from "../../api/AxiosBlogInstance"

export default function PostComponent() {
    const { postId } = useParams()
    const [post, setPost] = useState<Post>( {
        category: "",
        content:[],
        created_at: "",
        id:"",
        images: [],
        user:{id:"",
            email:"",
            first_name: "",
             last_name: "",
             image: ""
            }
    ,
    comments:[],
        user_id:'',
    })
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        axiosBlogInstance.get(`/posts/${postId}`).then(
            response => {
                if (response.data.status) {
                    setPost(response.data.data)
                    setLoading(false)
                }
            }
        )

    }, [postId])

    return loading ? <DashboardSkeletonLoader /> : <section id="post" className="md:p-20 p-4 bg-white ">
        <article id="user" className="relative p-3">
            <Link to={`/profile/${post.user_id}`}>
                <div id="author" className="flex relative" title="Go to Profile">
                    <img src={post.user.image} className="rounded-full  border=-black border h-11 w-11 md:h-12 md:w-12" alt="" />
                    <p className="text-gray-500 text-sm p-2 md:text-lg font-semibold">{post.user.first_name} {post.user.last_name}</p>
                </div>
            </Link>
            <div id="meta" className="absolute  md:top-10 top-8 left-14 md:left-16 ">
            <p className="text-gray-500 text-sm  p-2 md:tex-lg ">{formatDate(post.created_at).timeAgo}</p>
            </div>
        </article>
     <article id="controllers" className="p-3 flex relative justify-between">
        <InteractionPanel postId={post.id} ownerId={post.user_id}/> <AdmimEditPannel postId={post.id} ownerId={post.user_id}/>
     </article>
        <article id="post" className="p-3">
             {post.content[0].blocks.map(block=>{
                return  <div key={block.id}>
                       <p className={`${block.type==="header"?"text-2xl font-bold ":"font-lg"} p-2`}>
                         {block.data.text}
                       </p>
                </div>
             })}

        </article>
    </section>

}