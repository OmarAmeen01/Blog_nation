//!note it alll 

import { createMiddleware } from "hono/factory" // Note it used to create custom middleware
import {  verify} from "hono/jwt"
import { getCookie } from "hono/cookie"
import { env } from "hono/adapter"  // note it used for import environment variable from wrnggler.toml file

  const COOKIE_SECRET="dsfl9&(%^&i3DDS^*&T^*FDjgn09)84"
export const authMiddleware=createMiddleware(async(c,next)=>{
 try {
  const token = getCookie(c,"authorization") as string   //geting a single cookie type
  const JWT_PASSWORD ="1m,2t%#(*A)Y56oP^6"
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