import { createMiddleware } from "hono/factory";

export const rateLimiter = createMiddleware(async(c,next)=>{
 const ip = c.req.header
 console.log(ip,"ip")
 console.log(c,"c")
 next()

})