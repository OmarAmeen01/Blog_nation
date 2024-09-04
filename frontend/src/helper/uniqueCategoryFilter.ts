import { Post } from "../typescript/interfaces";

export default function uniqueCategoryFilter(Posts:Post[]){
const catagoriesFromposts:string[] =[]

Posts.forEach(post=>{
    return catagoriesFromposts.push(post.catagory)
})

  const uniqueSet = new Set(catagoriesFromposts)
  const uniqueCategory:string[]=[]
   uniqueSet.forEach(setItem=>{
      uniqueCategory.push(setItem)
   })
   
   return uniqueCategory
  
}

