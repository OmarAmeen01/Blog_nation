import { Post } from "../typescript/interfaces";

export default function verifyPostOwner(postId:string,posts:Post[]){
 
  const owndedPost = posts.find(post=>{
    return post.id ===postId
  })
if(owndedPost){
    return true
}else{
    return false
}
    
}