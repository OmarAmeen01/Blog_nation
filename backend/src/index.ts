import { Hono } from "hono";
import { userRouter } from "./routes/user";
import { blogRouter } from "./routes/blog";
import { cors } from "hono/cors";
import { rateLimiter } from "../middlewares/RateLimiting";
const app = new Hono<
{
  Bindings:{
    DATABASE_URL:string,
    JWT_PASSWORD:string
  }
}>()
app.use('*', cors({
  origin: 'http://localhost:5173', // Allow requests from this origin
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE'], // Specify allowed methods
  credentials:true,
  allowHeaders: ['Content-Type', 'Authorization'] 
}));

 app.get("/",rateLimiter,async(c)=>{
  return  c.json({msg:"fuck uyou"})
 })
app.route("/api/user",userRouter)
app.route("/api/blog",blogRouter)


export default app