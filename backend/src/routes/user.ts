import { Hono } from "hono";
import { authMiddleware } from "../../middlewares/authmiddleware";
import { withAccelerate } from "@prisma/extension-accelerate";
import { PrismaClient } from "@prisma/client/edge";
import {setCookie, getCookie, deleteCookie } from "hono/cookie";
import { signin_out, validateProfileDetails, validateChangePassword,validateNotification } from "mediumvalidate";
import { sign, decode, } from "hono/jwt";
import { cors } from "hono/cors";


export const userRouter = new Hono<{
    Bindings: {
        JWT_PASSWORD: string
        DATABASE_URL: string
        COOKIE_SECRET: string
    }
}>()





/// note her  how are cors handled and how to send cookie from server and store it in browser with ease

userRouter.use('*', cors({
    origin: 'http://localhost:5173', // Allow requests from this origin
    allowMethods: ['GET', 'POST', 'PUT', 'DELETE'], // Specify allowed methods
    credentials:true,
    allowHeaders: ['Content-Type', 'Authorization'] 
}));


async function hashPassword(password: string): Promise<string> {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashedPassword = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    
    return hashedPassword;
}

userRouter.post("/signup", async (c) => {
    const JWT_PASSWORD  = c.env.JWT_PASSWORD
    const DATABASE_URL= c.env.DATABASE_URL;
    const prisma = new PrismaClient(
        {datasources: {
            db: {
              url: DATABASE_URL,
            },
          }, }
    ).$extends(withAccelerate())
    const body = await c.req.json()

    const validate = signin_out.safeParse(body)
    const {email,password,first_name,last_name} = body
    if (validate.success) {
 
        try {
            const user = await prisma.user.findFirst({
                where: { email }
            })
            if (user) {
                return c.json({
                    msg: "User already exists try sign in",
                    satus: false
                })

            } else {

                const hashedPassword = await hashPassword(password)


               const usercreated= await prisma.user.create({
                    data: {
                        first_name,
                        last_name,
                        email,
                        password: hashedPassword

                    }
                })
       if(usercreated){
                  const settings = await prisma.settings.create({
                    data:{user_id:usercreated.id,
                        comments:true,
                        likes:true,
                        shares:true,
                        post_uploads:true
                
                    }
                  })

                const user = await prisma.user.findFirst({
                    where: { email },
                    select: {
                        id: true,
                        email: true,
                        first_name:true,
                        last_name:true,
                        image:true,
                    }
                })
                if (user) {
                    const userId = user?.id

                    // notes here

                    const token = await sign({ email, userId }, JWT_PASSWORD)
                  setCookie(c, "authorization", token,{
                    path:"/",
                    secure:true,
                    httpOnly:true,
                    sameSite: 'None' })

                    return c.json({
                        msg: "user authenticated successfully",
                        authentication: true,
                        status:true,
                        data: user
                    })
                }else{
                    return c.json({
                        msg:"account created try login cookie not generated",
                        status:false,
                    })
                }
            }

                return c.json({
                    msg: "Account not created try again later",
                    authentication: false,
                    status:false,
                })

            }
        } catch (error) {
            console.log(error)
            return c.json(
                {
                    msg: "server didn't respond try again",
                    authentication: false,
                    status:false,
                })
        }
    } else {
        return c.json({
            msg: signin_out.safeParse(body).error?.issues[0],
            authentication: false,
            status:false,
        })
    }
})
userRouter.post("/signin", async (c) => {
     const DATABASE_URL= c.env.DATABASE_URL
   const  JWT_PASSWORD  =c.env.JWT_PASSWORD


    const body = await c.req.json()
    const validate = signin_out.safeParse(body)
    if (validate.success) {
        const {email,password} = body
        try {

            const prisma = new PrismaClient({
                datasourceUrl: DATABASE_URL
            }).$extends(withAccelerate())

            const Cookie =  getCookie(c,"authorization")
            if (Cookie) {
                return c.json({
                    msg: "you are already signed in",
                    authentication: true,
                    status:false,
                })
            }

            const user = await prisma.user.findFirst({
                where: { email },
                select: {
                    id: true,
                    email: true,
                    password: true,
                }
            })
            if (user) {
                const dbPassword = user?.password
                const userId = user?.id

                const hashedPassword = await hashPassword(password)
                if (dbPassword !== hashedPassword) {
                    return c.json({
                        msg: "Password doesn't match try another one",
                        authentication: false
                    })
                }

                const token = await sign({ email, userId }, JWT_PASSWORD)
                setCookie(c, "authorization", token,{
                    path:"/",
                    secure:true,
                    httpOnly:true,
                    sameSite: 'None' })

                const userDetails = await prisma.user.findFirst({
                    where: { email },
                    select: {
                        id: true,
                        email: true,
                        first_name:true,
                        last_name:true,
                        image:true,
                    }
                })
                return c.json({
                    msg: "User authenticatied succesfully",
                    authentication: true,
                    data:userDetails,
                    status:true,
                })

            } else {
                return c.json({
                    msg: "User not found try signup",
                    authentication: false,
                    status:false
                })
            }

        } catch (error) {
            c.json({
                msg: "something went wrong",
                authentication:false,
                status:false,
            })
        }
    } else {
        return c.json(
            {
                msg: signin_out.safeParse(body).error?.issues[0].message,
                authentication: false,
                status:false,
            })
    }
})

userRouter.delete("/delete_user", authMiddleware, async (c) => {
    const DATABASE_URL= c.env.DATABASE_URL

    const cookie = getCookie(c, "authorization") as string

    const decodedVal = decode(cookie)
    const { userId } = decodedVal.payload

    try {

        const prisma = new PrismaClient({
            datasourceUrl: DATABASE_URL
        }).$extends(withAccelerate())



        if (typeof userId === "string") {
            const user = await prisma.user.findFirst({
                where: { id: userId }
            })

            if (!user) {
                return c.json({
                    msg: "you are  not logged in",
                    authentication: false,
                    status:false,
                })
            }
            await prisma.user.delete({
                where: { id: userId }
            })


            deleteCookie(c, "authorization",{
                path:"/",
                    secure:true,
                    httpOnly:true,
                    sameSite: 'None'
            })

            return c.json({
                msg:"Deleted user Successfully",
                status:true,
                authentication:false,
            })
        }

        return c.json({
            msg: "You don't have access to  perform these tasks",
            authentication: false,
            status:false,
        })

    } catch (error) {
        console.log(error)
        return c.json({
            msg: "Something went wrong",
            authentication: false,
            status:false,

        })
    }

})

userRouter.get("/signout", authMiddleware, async (c) => {

    try {
        const cookie =getCookie(c, "authorization")
        if (cookie) {
            deleteCookie(c, "authorization",{
                path:"/",
                    secure:true,
                    httpOnly:true,
                    sameSite: 'None'
            })
            return c.json({
                msg: "Loged out successfully",
                authentication: false,
                status:true,
            })
        }

        return c.json({
            msg: "You are not logged in",
            authentication: false,
            status:false,
        })


    } catch (error) {
        return c.json(
            { msg: "Something went wrong",
                authentication:true,
              status:false
             }
        )
    }
})




//  acessing the profile

userRouter.put("/profile", authMiddleware, async (c) => {
    const body = await c.req.json()
    const DATABASE_URL= c.env.DATABASE_URL
    const validate = validateProfileDetails.safeParse(body)
    if (validate.success) {

        try {
            const cookie =  getCookie(c, "authorization") as string
            const decodeVal = decode(cookie)
            const { userId } = decodeVal.payload;

            const prisma = new PrismaClient({ datasourceUrl: DATABASE_URL }).$extends(withAccelerate());

            // in order to avoid field does not exist on data  in typescript we use this to insert dynamic data
            if (typeof userId === "string") {
                const user = await prisma.user.update({

                    where: { id: userId },
                    data: body
                })
                if (user) {
                    return c.json({
                        msg:"updated profile succesfully",
                        status:true,
                        authentication:true,
                    })
                } else {
                    return c.json({
                        msg: "Couldn't reach server try again later",
                        authentication: true,
                        status:true,
                    })
                }

            } else {

                return c.json({
                    msg: "You don't have access to  perform these tasks",
                    authentication: false,
                    status:false
                })
            }


        } catch (error) {
            console.log(error)
            return c.json({
                msg: "Something went wrong",
                authentication: true,
                status:false,
            })
        }
    } else {
        return c.json({
            msg: validateProfileDetails.safeParse(body).error?.issues[0].message,
            authentication: true,
            status:false,
        })
    }
})


userRouter.get("/profile/:user_id", async (c) => {
    const DATABASE_URL= c.env.DATABASE_URL
const userId = c.req.param("user_id")

    try {
        const prisma = new PrismaClient({
            datasourceUrl: DATABASE_URL
        }).$extends(withAccelerate())

        if (typeof userId === "string"){

            const user = await prisma.user.findFirst({
                where: { id: userId },
                select: {
                    id:true,
                    email: true,
                    pronoun: true,
                    image: true,
                    domain: true,
                    about:true,
                    last_name: true,
                    first_name: true,
                    cover_image:true,
                    domain_title:true,
                }
            })
            if (user){
                return c.json({
                    msg: "User found successfully",
                    data: user,
                    authentication: true,
                    status:true,
                })
            } else {
                return c.json({
                    msg: "Couldn't reach server try again latter",
                    authentication: true,
                    status:false,
                })
            }
        } else {
            return c.json({
                msg: "You don't have access to  perform this action",
                authentication: false,
                status:false,
            })
        }

    } catch (error) {
        console.log(error)
        return c.json({
            msg: "something went wrong",
            authentication: true,
            status:false
        })
    }

})

userRouter.put("/change_password", authMiddleware, async (c) => {


const body = await c.req.json()

    const cookie = getCookie(c, "authorization") as string
    const DATABASE_URL= c.env.DATABASE_URL
    const jwtToken = decode(cookie)

    const { userId } = jwtToken.payload
    //make validator and validate it

        const validate = validateChangePassword.safeParse(body)
        if (validate.success) {
            const{oldPassword,newPassword}= body
            try {

                const prisma = new PrismaClient({
                    datasourceUrl: DATABASE_URL
                }).$extends(withAccelerate())

                if (typeof userId === "string") {

                    const hashedPassword = await hashPassword(oldPassword)

                    const user = await prisma.user.findFirst({
                        where: { id: userId }
                    })
                    if (user) {
                        if (hashedPassword === user?.password) {
                            const newHashedPasword = await hashPassword(newPassword)
                            const user = await prisma.user.update({
                                where: { id: userId },
                                data: { password: newHashedPasword }
                            })


                            if (user) {
                                return c.json({
                                    msg: "password updated successfully",
                                    authentication: true,
                                    status:true
                                })
                            } else {
                                return c.json({
                                    msg: "Couldn't reach server try again later",
                                    authentication: true,
                                    status:false,
                                })
                            }
                        }
                        else {
                            return c.json({
                                msg: "password doesn't match try again",
                                authentication: true,
                                status:false,
                            })
                        }

                    } else {
                        return c.json({
                            msg: "You don't have access to perform this action",
                            authentication: false,
                            status:false,
                        })
                    }
                

                }

            } catch (error) {
                console.log(error)
                return c.json({
                    msg: "Something went wrong",
                    authenentication: true,
                    status:false,
                })
            }
        } else {
            return c.json({
                msg: validateChangePassword.safeParse(body).error?.issues[0].message,
                authentication: true,
                status:false,
            })
        }
})

userRouter.get("/login_status",async(c)=>{
    const DATABASE_URL= c.env.DATABASE_URL
 const cookie = getCookie(c,"authorization")
 if(cookie){
    const jwtToken = decode(cookie) 
       const {email} = jwtToken.payload
       
       try {
         
        const prisma = new PrismaClient({
            datasourceUrl: DATABASE_URL
        }).$extends(withAccelerate())
        
        if(typeof email==="string") {
            const userDetails = await prisma.user.findFirst({
                where: { email },
                select: {
                    id: true,
                    email: true,
                    first_name:true,
                    last_name:true,
                    image:true,
                }
            })
            return c.json({
                msg: "User authenticatied succesfully",
                authentication: true,
                data:userDetails,
                status:true,
            })
        }else{
            return c.json({
                msg:"email is invalid",
                status:false,
            })
        }
        
       } catch (error) {
        return c.json({
            msg:"504 Gateway error",
            status:false,
        })
       }
 }else{
    return c.json({
        msg:"User not logged in",
        status:false
    })
 }

})

userRouter.get('/notification_settings',authMiddleware,async(c)=>{
    const DATABASE_URL= c.env.DATABASE_URL
    const cookie = getCookie(c,"authorization")
     if(cookie){
        const jwtToken = decode(cookie) 
           const {email,userId} = jwtToken.payload
    try {
        const prisma = new PrismaClient({
            datasourceUrl: DATABASE_URL
        }).$extends(withAccelerate())

      if(typeof userId === 'string'){
        const settings = await prisma.settings.findFirst({
            where:{user_id:userId},
            select:{
                id:true,
                likes:true,
                comments:true,
                post_uploads:true,
                shares:true
            }
        })
        if(settings){

            return c.json({
                msg:"settings found",
                data:settings,
                status:true
            })
        }
            
        return c.json({
                msg: "no settings found",
                status:false
            })
        }
    
        
    } catch (error) {
        console.log(error)
        return c.json({
            msg:"server error ",
            status:false
        })
    }
     }
})

userRouter.put('/notification_settings/:id',authMiddleware,async(c)=>{
    const DATABASE_URL= c.env.DATABASE_URL
    const body = await c.req.json()
    const id  = c.req.param('id')

    const cookie = getCookie(c,"authorization")
    if(cookie){
       const jwtToken = decode(cookie) 
       const {userId} = jwtToken.payload

      try {
        const prisma = new PrismaClient({
            datasourceUrl: DATABASE_URL
        }).$extends(withAccelerate())

       if(typeof userId==="string"){
        const settings =await prisma.settings.update({
            where:{id_user_id:{
                id:id,
                user_id:userId
            }},
            data:body
           })
           if(settings){
           return c.json( {
            msg:"changed setting successfully",
            data:settings,
            status:true,
           })
        }

        return c.json({
            msg:"not authorised manipulate settings",
            status:false,

        })

    }

      } catch (error) {
         console.log(error)
         return c.json({
            msg:"504 Gateway error",
            status:false
         })
      }

    }
})


userRouter.post('/notification',authMiddleware,async(c)=>{
    const body = await c.req.json()
    const DATABASE_URL= c.env.DATABASE_URL
    console.log(body)
 const validate = validateNotification.safeParse(body)
 if(validate.success){
 

   try {
    const prisma = new PrismaClient({
        datasourceUrl: DATABASE_URL
    }).$extends(withAccelerate())

    const notification =await prisma.notification.create({
        data:body
    })
    if(notification){
    
        return c.json({
            msg:"Notification saved to database",
            status:true,
        })
        
    }else{
        return c.json({
            msg:"couldn't proccess your request",
            status:false
        })
    }
   } catch (error) {
    console.log(error)
    return c.json({
        
        msg:"something went wrong",
        status:false
    })
   }

    }else{
        console.log(validate.error.errors[0].message)
        return c.json({
            msg:"Incorrect format",
            status:false,
        })
    }

}
)



userRouter.get('/notifications',authMiddleware,async(c)=>{
    const DATABASE_URL= c.env.DATABASE_URL
    const cookie = getCookie(c,"authorization")
    if(cookie){
       const jwtToken = decode(cookie) 
       const {userId} = jwtToken.payload
 
        try {
            const prisma = new PrismaClient({
                datasourceUrl: DATABASE_URL
            }).$extends(withAccelerate())
         
            
            if(typeof userId ==="string"){
             
        const notification =  await prisma.notification.findMany({
                            where: {owner_id:userId},
                            include:{
                                post:{
                                   select:{
                                    content:{
                                        select:{
                                            blocks:true
                                        }
                                    }
                                   }
                                },
                                 likes:{
                                   select:{
                                    id:true
                                   }
                                 },
                                 comments:{
                                   select:{
                                    id:true,
                                    text:true
                                   }
                                 },
                                
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
                      
                        if(notification){
                            
                            return c.json({
                                msg:"New notifications arrived",
                                data:notification,
                                status:true,
                            })
                        }
                    }else{
                        return c.json({
                            msg:"tyy again",
                            status:false
                        })
                    }
        } catch (error) {
            return c.json({
                msg:"Something went wrong",
                status:false
            })
        }
    }else{
        return c.json({
            msg: "No authorization cookie",
            status: false,
          });
    }

})

userRouter.get("/unWatch",authMiddleware,async(c)=>{
    const DATABASE_URL= c.env.DATABASE_URL
    const cookie = getCookie(c,"authorization")
    if(cookie){

        
       const jwtToken = decode(cookie) 
       const {userId} = jwtToken.payload
 
        try {
            const prisma = new PrismaClient({
                datasourceUrl: DATABASE_URL
            }).$extends(withAccelerate())
         
            
            if(typeof userId ==="string"){
              const unWatch =await prisma.user.findFirst({
                where:{id:userId},
                select:{
                    un_watched:true,
                    watched:true,
                }
              })
            if(unWatch){
                return c.json({
                    msg:"Found watch state",
                    data:unWatch,
                    status:true
                })
            }else{
                return c.json({
                    msg:"Nothing was found",
                    status:false
                })
            }
            }
        
        }catch (error) {
            return c.json({
                msg:"Something went wrong",
                status:false
            })
        }       
}

})
userRouter.put("/Watched",authMiddleware,async(c)=>{
    const DATABASE_URL= c.env.DATABASE_URL
    const {watched}= await c.req.json()
    const cookie = getCookie(c,"authorization")
    if(cookie){

        
       const jwtToken = decode(cookie) 
       const {userId} = jwtToken.payload
 
        try {
            const prisma = new PrismaClient({
                datasourceUrl: DATABASE_URL
            }).$extends(withAccelerate())
         
            
            if(typeof userId ==="string"){
              const unWatch =await prisma.user.update({
                where:{id:userId},
                 data:{
                    un_watched:0,
                    watched:watched
                 }
              })

              if(unWatch){

                  return c.json({
                      msg:"Reseted watch state",
                      data:{un_watched:0},
                      status:true
                    })
              }else{
                return c.json({
                    msg:"model was not updated",
                    status:false
                })
            }
            }
        }catch (error) {
            console.log(error)
            return c.json({
                msg:"Something went wrong",
                status:false
            })
        }       
}

})

userRouter.put("/unWatch",authMiddleware,async(c)=>{
    const DATABASE_URL= c.env.DATABASE_URL
    const {un_watched}= await c.req.json()
       const cookie = getCookie(c,"authorization")
       if(cookie){
   
           
          const jwtToken = decode(cookie) 
          const {userId} = jwtToken.payload
    
           try {
               const prisma = new PrismaClient({
                   datasourceUrl: DATABASE_URL
               }).$extends(withAccelerate())
            
               
               if(typeof userId ==="string"){
                 const unWatch =await prisma.user.update({
                   where:{id:userId},
                    data:{
                      un_watched:un_watched
                    },
                    select:{
                        un_watched:true,
                        watched:true
                    }
                 })
                 if(unWatch){


                     return c.json({
                         msg:"Updated watch state",
                         data:unWatch,
                         status:true
                     })
                 }else{
                    return c.json({
                        msg:"model was not updated",
                        status:false
                    })
                 }
               }
           
           }catch (error) {
            console.log(error)
               return c.json({
                   msg:"Something went wrong",
                   status:false
               })
           }       
   }
   
   })

