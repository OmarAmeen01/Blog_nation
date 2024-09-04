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
 export interface Post {
    
  catagory: string,
  created_at: string,
  description: string
  id: string
  images: Image[],
  title: string
  user:User ,
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