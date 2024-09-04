
import { Post } from "../typescript/interfaces";



export default function sortPosts(posts:Post[],category:string){
  
    const sortedPosts = posts.filter(post=>{
        return post.catagory===category
    })
return sortedPosts
}
