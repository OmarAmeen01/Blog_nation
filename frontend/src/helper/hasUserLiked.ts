import { Likes } from "../typescript/interfaces";

export default function hasUserLiked(likes:Likes[],userId:string)
{
     const usersLike=  likes.find(like=>{
        return like.user_id === userId
       })
       if(usersLike){
        return true
       }

       return false
}