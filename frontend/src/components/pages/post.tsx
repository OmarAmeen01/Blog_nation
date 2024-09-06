import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import DashboardSkeletonLoader from "../common/loaders/skeltonLoaderDashboard"
import { Link } from "react-router-dom"
import { Post } from "../../typescript/interfaces"
import formatDate from "../../helper/dateConverter"
import InteractionPanel from "../common/InteractionPanel"
import AdmimEditPannel from "../common/adminEditPannel"
export default function PostComponent() {
    const BlogApiUrl = import.meta.env.VITE_POST_API_URL
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
        user_id:'',
    })
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        axios.get(`${BlogApiUrl}/posts/${postId}`).then(
            response => {
                if (response.data.status) {
                    console.log(response.data.data)
                    setPost(response.data.data)
                    setLoading(false)
                }
            }
        )

    }, [])

    return loading ? <DashboardSkeletonLoader /> : <section id="post" className="p-20 bg-white ">
        <article id="user" className="relative p-3">
            <Link to={`/profile/${post.user_id}`}>
                <div id="author" className="flex relative" title="Go to Profile">
                    <img src={post.user.image} className="rounded-full  border=-black border h-3 w-6 md:h-12 md:w-12" alt="" />
                    <p className="text-gray-500 text-sm p-2 md:text-lg font-semibold">{post.user.first_name} {post.user.last_name}</p>
                </div>
            </Link>
            <div id="meta" className="absolute  top-10 left-16 ">
            <p className="text-gray-500 text-sm  p-2 md:tex-lg ">{formatDate(post.created_at).timeAgo}</p>
            </div>
        </article>
     <article id="controllers" className="p-3">
        <InteractionPanel /> <AdmimEditPannel postId={post.id}/>
     </article>
        <article id="post" className="p-3">
             {post.content[0].blocks.map(block=>{
                return  <div>
                       <p className={`${block.type==="header"?"text-2xl font-bold ":"font-lg"} p-2`}>
                         {block.data.text}
                       </p>
                </div>
             })}

        </article>
    </section>

}