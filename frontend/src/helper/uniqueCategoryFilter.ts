import { Post } from "../typescript/interfaces";

export default function uniqueCategoryFilter(Posts:Post[]){
const catagoriesFromposts:string[] =[]

Posts.forEach(post=>{
    return catagoriesFromposts.push(post.category)
})

  const uniqueSet = new Set(catagoriesFromposts)
  const uniqueCategory:string[]=[]
   uniqueSet.forEach(setItem=>{
      uniqueCategory.push(setItem)
   })
   
   return uniqueCategory
  
}

