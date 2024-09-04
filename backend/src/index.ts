import { Hono } from "hono";
import { userRouter } from "./routes/user";
import { blogRouter } from "./routes/blog";
import { cors } from "hono/cors";
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

app.post("/uploadFile",async(c)=>{
return  c.json({
  success: 1,
  file: {
    url:"https://drive.google.com/thumbnail?id=1lzR-RbBWASrUaeV_fgGNsf9Pi2JClps1&sz=w1000"
  }
})
})
app.route("/api/user",userRouter)
app.route("/api/blog",blogRouter)


export default app