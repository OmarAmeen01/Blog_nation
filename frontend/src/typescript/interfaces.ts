export interface Image {
    id:string | null| undefined
  image: string |  undefined
  post_id:string |  undefined
  }
export  interface User {
         id:string
      email?:string
      first_name: string
       last_name: string
       image: string |  undefined
  
  }
  export interface Comments {
    id:string
    

  }
  export interface Likes{

  }
  interface BlockData{
text:string,
 level:number
  }

export interface Block{
  
id:string,
data:BlockData
type:string
}
export interface InputData{
  id:string,
  blocks:Block[],
  post_id:string
}

interface Content{
  id:string,
  post_id:string,
  blocks:Block[]
}
 export interface Post {
  category: string,
  content:Content[]
  created_at: string,
  id: string
  images: Image[],
  user:User,
  user_id: string,
  }


// state type
export interface Noti{
  id:string, 
    likes:boolean,
    shares:boolean,
    comments:boolean,
    post_uploads:boolean

}
export interface ProfileDetails{
  id:string
  first_name?:string,
  last_name?:string,
  about?:string,
  email?:string,
  domain?:string,
  pronoun?:string,
  image?:string
  domain_title?:string,
  cover_image?:string

}

export interface Store{
   noti:Noti
    auth: {
      status:boolean,
      isFromVisible:boolean,
      isSignupClicked:boolean,
      isProfileClicked:boolean,
      isSigninClicked:boolean,
      userData:User[]
   }
  post: {
    status:boolean,
    posts:Post[]
}
  
}