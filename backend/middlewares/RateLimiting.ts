import { createMiddleware } from "hono/factory";

export const rateLimiter = createMiddleware(async(c,next)=>{
 const ip = c.req
 console.log(ip,"Ip")
 console.log(c,"c")

})