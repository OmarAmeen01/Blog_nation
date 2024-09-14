//!note it alll 

import { createMiddleware } from "hono/factory" // Note it used to create custom middleware
import {  verify} from "hono/jwt"
import { getCookie } from "hono/cookie"
export const authMiddleware=createMiddleware(async(c,next)=>{
 try {
  const JWT_PASSWORD  = c.env.JWT_PASSWORD 
  const token = getCookie(c,"authorization") as string   //geting a single cookie type
 
 // right way to import environmetal varaibles
  const verifiedToken = await verify(token,JWT_PASSWORD)      
  if(verifiedToken.email){
    await next()
  }else{
    return c.json({
      msg:"You are not the autorized user"
    })
  }
 } catch (error) {
  console.log(error)
  return c.json({
    msg:"you are not a authorized user try signin of signup first",
    authentication:false,
  })
 }


})