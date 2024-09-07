import { Hono } from "hono";
import {validatePost} from "mediumvalidate"
import { getCookie } from "hono/cookie";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { decode } from "hono/jwt";
import {authMiddleware} from "../../middlewares/authmiddleware";
import { cors } from "hono/cors";
export const blogRouter  = new Hono<{
    Bindings:{
         DATABASE_URL:string,
         JWT_PASSwORD:string
    }
}>()

// blogRouter.use(authMiddleware)
blogRouter.use('*', cors({
    origin: 'http://localhost:5173', // Allow requests from this origin
    allowMethods: ['GET', 'POST', 'PUT', 'DELETE'], // Specify allowed methods
    credentials:true,
    allowHeaders: ['Content-Type', 'Authorization'] 
}));


// secrets
const DATABASE_URL = "prisma://accelerate.prisma-data.net/?api_key=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlfa2V5IjoiZTEwYzFiYzMtY2NkMy00NjViLWJhMjUtNGNmMmJlNTI1OGYwIiwidGVuYW50X2lkIjoiOWUyNzQ0MTBhMTI3YzY0YzM4Y2NlMDBhNWVmMWQxYmY0Mzk0MGMxNGVmOWM3YzQyYTk4MzRiMmE3YzEyZDNjZCIsImludGVybmFsX3NlY3JldCI6IjgwNTA4YjMyLTA0NjktNGYxMi1iNmFhLTYwOWYxMWYyNTRjZSJ9.OkLm_nAKQzSzfZI_qxiBlerrMYFwLX_eprlaCWxQCYU"


// get all posts of the user
blogRouter.get("/dashboard",authMiddleware,async(c)=>{   
    const cookie = getCookie(c,"authorization") as string
    const jwt = decode(cookie)
    const {userId} = jwt.payload

try {

    const prisma = new PrismaClient({
        datasourceUrl:DATABASE_URL
    }).$extends(withAccelerate())

if(typeof userId==="string"){


    const posts =await prisma.post.findMany({
       where:{user_id:userId},
       include:{
        content:true,
         likes:{
            include:{
                user:{
                    select:{
                        first_name:true,
                        last_name:true,
                        image:true,
                    }
                }
            }
         },
         comments:{
            include:{
                user:{
                    select:{
                        first_name:true,
                        last_name:true,
                        image:true,
                    }
                }
            }
         },
         images:true,
         user:{
            select:{
                id:true,
                first_name:true,
                last_name:true,
                image:true
            }
        }
       }
    })
    if(posts.length>0){
 
        return c.json({
            msg:"Founded posts",
            data:posts,
            authentication:true,
            status:true
        },200)
       }else{
        return c.json({
            msg:"no posts not found",
            authenticaion:true,
            status:false
        })
       }
}

return c.json({
    msg: "You don't have access to  perform these tasks",
    authentication: false,
    status:false
})


  


} catch (error) {
    console.log(error)
    return c.json({msg:"something went wrong ",
        authentication:true,
        status:false
    })
}

  
 
})

// get a specific post 


blogRouter.get("/posts/:postid",async(c)=>{
const postId=  c.req.param("postid")
try {
    const prisma =new PrismaClient({
    datasourceUrl:DATABASE_URL
    }).$extends(withAccelerate());

   const post = await prisma.post.findFirst({
    where:{id:postId},
    include:{
        content:true,
        likes:{
            include:{
                user:{
                    select:{
                        first_name:true,
                        last_name:true,
                        image:true,
                    }
                }
            }
         },
        comments:{
            include:{
                user:{
                    select:{
                        first_name:true,
                        last_name:true,
                        image:true,
                    }
                }
            }
         },
        images:true, 
         user:{
            select:{
                first_name:true,
                last_name:true,
                image:true
            }
        }
    }
   })
   if(post){
    return c.json({
        msg:"Founded",
        data:post,
        authentication:true,
        status:true
    },200)
   }else{
    return c.json({
        msg:"Post not fount",
        authenticaion:true,
        status:false
    })
   }
  


} catch(error) {
    console.log(error)
    return c.json({
        msg:"Something went wrong",
        authentication:true,
        status:false

    })
}


})
// get all posts
blogRouter.get("/posts",async(c)=>{
try {
    console.log("hi")
   const prisma = new PrismaClient({
    datasourceUrl:DATABASE_URL
   }).$extends(withAccelerate())

   const posts= await prisma.post.findMany({
include:{
    content:true,
    likes:{
        include:{
            user:{
                select:{
                    first_name:true,
                    last_name:true,
                    image:true,
                }
            }
        }
     },
    comments:{
        include:{
            user:{
                select:{
                   
                    first_name:true,
                    last_name:true,
                    image:true,
                }
            }
        }
     },
    images:true,
    user:{
        select:{
            id:true,
            first_name:true,
            last_name:true,
            image:true
        }
    }
}
   })
if(posts){
    return c.json({
        msg:"founded the Posts",
        data:posts,
        authentication:true,
        status:true
    })
}else{
    return c.json({
        msg:"no post not found",
        authenticaion:true,
        status:false
    })
}
} catch (error) {
    console.log(error) 
    return c.json({
        msg:"Something went wrong",
        authentication:true,
        status:false
    })
}

})


blogRouter.post("/addpost",authMiddleware,async(c)=>{
 const cookie = getCookie(c,"authorization") as string
 const jwt = decode(cookie)
 const {userId} = jwt.payload

 const body =await c.req.json()




    try {

        const prisma = new PrismaClient({
            datasourceUrl:DATABASE_URL
           }).$extends(withAccelerate())

if(typeof userId==="string"){
    const post = await prisma.post.create({
        data:{
            user_id:userId,
            category:body.category,
        }
    })

    if(post){
   
       const content=await prisma.content.create({
                data:{
                    post_id:post.id,
                    blocks:body.content.blocks
                }
            })
        
     
        if(content){
            return c.json({
                msg:"Post uploaded succesfully",
                status:true,
            })
        }else{
            return c.json({
                msg:"post upload unsuccessfull",
                status:false
            })
        }
       
       
        
    }else{
        return c.json({
            msg:"Post was not  Created",
            status:false
        })
    }

}        
         
        
        
    } catch (error) {
        console.log(error)
        return c.json({
            msg:"Something went wrong",
            authentication:true,
            status:false
        })
    }


})



//update the post;

blogRouter.put("/addpost/:postid",authMiddleware,async(c)=>{
    
const postId= c.req.param("postid") // note here how to get parameter
const body = await c.req.json()
let date;
if(!body.time){
     date = new Date()
}else{
    const unixDate=body.content.time
    date = new Date(unixDate)
}
try {
    const prisma = new PrismaClient({
        datasourceUrl:DATABASE_URL
       }).$extends(withAccelerate())

     const response = await prisma.post.update({
        where:{id:postId},
        data:{
            category:body.category,
            created_at:date
        }
     })  
  if(response){
    const updateContent = await prisma.content.update({
        where:{
            id_post_id:{
                id:body.contentId,
                post_id:postId,
            }

        },
        data:{
         blocks:body.content.blocks
        }
    })
    
     if(updateContent){
        return c.json({
            msg:"Post updated successfully",
            status:true,
        })
     }
     
     return c.json({
        msg:"Post update unsuccessfull",
        status:false,
    })
  }
  return c.json({
    msg:"Post update unsuccessfull",
    status:false,
  })

} catch (error) {
    console.log(error)
    return c.json({
        msg:"Something went wrong",
        authentication:true,
        status:false
    },500)
}
}

)


blogRouter.delete("/delete_post/:postid",authMiddleware,async(c)=>{
 
const cookie = getCookie(c,"authorization") as string
const jwt = decode(cookie)
const {userId} = jwt.payload
  

    const postId = c.req.param("postid")
    try {
        const prisma = new PrismaClient({
            datasourceUrl:DATABASE_URL
           }).$extends(withAccelerate())
           
        
       if(typeof postId==="string" && typeof userId==="string"){
        const post = await prisma.post.findFirst({
            where:{
                id:postId,
                user_id:userId
            }
        })
 if(userId===post?.user_id){

 

        await prisma.post.delete({
            where:{id:postId}
        })
       
      return c.json({
        msg:"post was deleted successfully",
        status:true,
        authentication:true
      })
       }else{
        return c.json({
            msg:"You are not the author of this post",
            status:false,
            authentication:true,
        })
       }
       }

    } catch (error) {
        console.log(error)
        return c.json({
            msg: "Something went wrong",
            authentication: true,
            status:false,
        })
    }


})

blogRouter.post("/like/:postid",authMiddleware,async(c)=>{
 const postId = c.req.param("postid")
    const cookie = getCookie(c,"authorization") as string
    const  jwt = decode(cookie)
    const {userId} = jwt.payload

    try {
        
        const prisma = new PrismaClient({
            datasourceUrl:DATABASE_URL
           }).$extends(withAccelerate())


 if(typeof postId === "string" && typeof userId ==="string"){
    const likedPost = await prisma.likes.create({
        data:{
            post_id:postId,
            user_id:userId
        }
      })
      if(likedPost){
        return c.json({
            msg:"liked this post",
            status: true,
            authentication:true
        })
      }else{
        return c.json({ msg:"Failed to update db try after sometime",
            status:false,
            authentication:true},500)
      }
 }else{
    return c.json({
        msg: "You don't have access to  perform these tasks",
        authentication: false,
        status:false
    },100)
 }
    } catch (error) {
        console.log(error)
        return c.json({
            msg: "Something went wrong",
            authentication:true,
            status:false

        })
    }

})

blogRouter.get("/likes/:postid",async(c)=>{
  const postId = c.req.param("postid")
   try {
    const prisma = new PrismaClient({
        datasourceUrl:DATABASE_URL
       }).$extends(withAccelerate())

     if(typeof postId==="string"){
        const likes = await prisma.likes.findMany({
            where:{post_id:postId
            },
            include:{
                user:{
                    select:{
                        last_name:true,
                        first_name:true,
                        image:true,
                    }
                } 
            }
           })
           
           if(likes){
            return c.json({
                msg:"retrived likes succesfully",
                data:likes,
                status:true,
                authentication:true,
            })
           }else{
            return c.json({ msg:"Failed to retrive likes",
                status:false,
                authentication:true})
           }
     }
     return c.json({
        msg: "You don't have access to  perform these tasks",
        authentication: false,
        status:false
    },300)

   } catch (error) {
    console.log(error)
    return c.json({
        msg: "Something went wrong",
        authentication: true,
        status:false,

    })
   }
})
blogRouter.delete("/like/:postid",async(c)=>{
    const postId = c.req.param("postid")
    const cookie = getCookie(c,"authorization") as string
    const  jwt = decode(cookie)
    const {userId} = jwt.payload
 try {
     const prisma = new PrismaClient({
         datasourceUrl:DATABASE_URL
        }).$extends(withAccelerate())
    
   


      if(typeof userId ==="string"){
        const likeByUser = await prisma.likes.findFirst({
            where:{
                post_id:postId,
                user_id:userId
            }
         })

         if(likeByUser){

             const likedPost = await prisma.likes.delete({
                where:{
                 user_id_post_id:{
                     user_id:userId,
                     post_id:postId
                 }
                }
               })
               if(likedPost){
                return c.json({
                    msg:"unLiked the post successfully",
                    status:true
                })
               }
         }else{
            return c.json({
                msg:'you never liked the post, why that hate bro?',
                status:false
            })
         }


         return c.json({
            msg:"You are not authorized to do such action",
            status:false,
         })
      }
 } catch (error) {
    console.log(error)
    return c.json({
        msg:"Something went wrong",
        status:false,
     })
  }
 
})

blogRouter.post("/comment/:postid",authMiddleware,async(c)=>{
const postId = c.req.param('postid')
const cookie = getCookie(c,"authorization") as string
const jwt = decode(cookie)
const {userId} = jwt.payload

const {text} = await c.req.json()
try {


    const prisma = new PrismaClient({
        datasourceUrl:DATABASE_URL
       }).$extends(withAccelerate())
    
 

     if(typeof text==="string" && typeof userId==="string"){

        const uploadedCommnet = await prisma.comments.create({
            data:{
            text,
            post_id:postId,
            user_id:userId,
            }
           })
           if(uploadedCommnet){
            return c.json({
                msg:"uploaded your comment successfully",
                status:true,
                authentication:true,
            })
           }else{
            return c.json({ msg:"Failed to upload try after sometime",
                status:false,
                authentication:true})
           }
     }

     return c.json({
        msg: "You don't have access to  perform these tasks",
        authentication: false,
        status:false
    },300)

} catch (error) {
    console.log(error)
    return c.json({
        msg: "Something went wrong",
        authentication: true,
        status:false

    })
}


})


blogRouter.delete("/delete_comment/:postid/:commentid",authMiddleware,async(c)=>{
const commentId = c.req.param('commentid')
const postId = c.req.param('postid')
const cookie = getCookie(c,"authorization") as string
const jwt = decode(cookie)
const {userId} = jwt.payload
try {
    
    const prisma = new PrismaClient({
        datasourceUrl:DATABASE_URL
       }).$extends(withAccelerate())

if(typeof userId==="string"){
  const ownedPost = await prisma.post.findFirst({
    where:{
        id:postId,
        user_id:userId
    }
  })

  const comment = await prisma.comments.findFirst({
    where:{
        id:commentId,
    }
  })
  if(ownedPost){

      if( comment?.post_id ===  ownedPost?.id){
      
      
      const isDeleted = await prisma.comments.delete({
          where:{id_post_id:{
              id:commentId,
              post_id:postId
          }}
          
      })
      if(isDeleted.id){
              return c.json({
                  msg:"your comment was deleted",
                  status: true,
                  authentication:true,
              })
      }
      return c.json({ msg:"Failed to delete try after sometime",
        status:false,
        authentication:true})
   }
   
  
  }else if(comment?.user_id===userId ){
   
      
      
    const isDeleted = await prisma.comments.delete({
            where:{id_post_id:{
                id:commentId,
                post_id:postId
            }}
            
        })
        if(isDeleted.id){
                return c.json({
                    msg:"your comment was deleted",
                    status: true,
                    authentication:true,
                })
        }
        return c.json({ msg:"Failed to delete try after sometime",
          status:false,
          authentication:true})
     }
  
  return c.json({
    msg:"you are not the author of comment  nor  Admin of post",
    status:false,
    authentication:true,
   })
}
   
return  c.json({
    msg:"Try login first",
    status:false,
    authentication:false
})

} catch (error) {
       console.log(error)
        return c.json({
            msg: "Something went wrong",
            authentication: false,
            status:false

        })
}
})

blogRouter.get("/comments/:postid",async(c)=>{
    
  const postId = c.req.param('postid')

  try {
    const prisma = new PrismaClient({
        datasourceUrl:DATABASE_URL
       }).$extends(withAccelerate())

 const commnets = await prisma.comments.findMany({
    include:{
    user:{
        select:{
            first_name:true,
            last_name:true,
            image:true
        }
    }
    }
 })
if(commnets.length>0){
    return c.json({
        msg:"founded comments succesfully",
        data:commnets,
        status:true,
        authentication:true,
        
    })
}

return c.json({ msg:"Failed to find the feed",
    status:false,
    authentication:true})

  } catch (error) {
    console.log(error)
    return c.json({
        msg: "Something went wrong",
        authentication: true,
        status:false

    })
  }
  
  
})


blogRouter.get("/authenticate_editor/:postId",authMiddleware,async(c)=>{
    
        const postId = c.req.param("postId")
        const cookie = getCookie(c,"authorization") as string
        const jwt = decode(cookie)
        const {userId} = jwt.payload


        try {
            const prisma = new PrismaClient({
                datasourceUrl:DATABASE_URL
               }).$extends(withAccelerate())

               const  post= await prisma.post.findFirst({
                 where:{
                      id:postId,
                 }
                 

                
               })
               if(post){
                if(post.user_id===userId){
                    return c.json({
                        msg:"User is owner of the of the post",
                        status:true,
                    })
                }else{
                    return c.json({
                        msg:"user is not owner of the post ",
                        status:false,
                    })
                }
               }
        } catch (error) {
            return c.json({
                msg:"Something went wrong",
                status:false
            })
        }
})