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
  origin: 'https://blog-nation-three.vercel.app', 
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE'], 
  credentials:true,
  allowHeaders: ['Content-Type', 'Authorization'] 
}));


app.route("/api/user",userRouter)
app.route("/api/blog",blogRouter)


export default app