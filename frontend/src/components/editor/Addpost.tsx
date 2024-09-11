import EditorJS, { OutputData, ToolConstructable } from '@editorjs/editorjs';
import { useEffect,useRef, useState } from 'react';
import Header from '@editorjs/header';
import axios from 'axios';
import Button from '../common/button';
import InputComponet from '../common/inputComponet';
import { useNavigate } from 'react-router-dom';
import { validateNotification } from 'mediumvalidate';
// always initialise in useEffect hook
 

export default function AddPost(){
  const BlogApiUrl =import.meta.env.VITE_POST_API_URL
  const [sendingResponse,setSendingResponse] = useState(false)
  const[isSubmitCliked,setIsSubmitClicked] =useState(false)
  const [content,setContent] = useState<OutputData>()
  const [isPostClicked,setIsPostClicked] = useState(false)
  const [category,setCategory] = useState("")
  const [isReponseSend,setResponseSend] = useState(false)
  const userApiUrl = import.meta.env.VITE_USER_API_URL
  const [notification,setNotification] = useState<validateNotification>({
   
   user_id:"",
 type:"",
 post_id:"",
 owner_id:"",
 msg:""
 })
  const navigate = useNavigate()

let editorReff= useRef<EditorJS|null|boolean>(null)

useEffect(()=>{
  
  if(!editorReff.current){
    const editor = new EditorJS(
      {
        holder: 'editorjs',
        inlineToolbar:true,
        placeholder:"Whats on your mind",
        autofocus:true,
        defaultBlock:'header',
        data:content,
        tools: {
          header:{
            class:Header as unknown as ToolConstructable,
            config:{
              levels:[2,3,4],
              defaultLevel:2,
              placeholder:"Title"
            },
            
          }
        },

        onChange:async ()=>{

        const output= await editor.save()
        setContent(output)
        }
      })
          editorReff.current=true
        }
   
      });
   
  function handleVisibility(){
    setIsPostClicked(prev=>!prev)
  }
  
  async function handleSubmit(){
   setIsSubmitClicked(true) 
       setSendingResponse(true)
  const modifiedCategory= category.slice(0,1).toUpperCase()+category.slice(1).toLowerCase()
       const postDetails = {
        content:content,
        category:modifiedCategory,
       }
       console.log(postDetails)
     try {
      const  response= await axios.post(`${BlogApiUrl}/addpost`,postDetails,{withCredentials:true})
    if(response.data.status){
     const data= response.data.data
     console.log(data)
      setNotification(prev=>({
        ...prev,
        type:"post_uploads",
        user_id:data.user_id,
        post_id:data.id,
        owner_id:data.user_id,
        msg:`Posted ${content?.blocks[0].data.text.slice(0,20)}...`
      }))
      setResponseSend(true)
      setSendingResponse(false)
      handleVisibility()
      

    }
      
     } catch (error) {
      console.log(error)
      setSendingResponse(false)
     }
       
       
    
    
        


    }
  
    useEffect(()=>{
      isReponseSend&& axios.post(`${userApiUrl}/notification`,notification,{withCredentials:true}).then(res=>{
         console.log(res)
         navigate("/dashboard")
       })
   },[isReponseSend])








    return  <section>
  {isPostClicked&& <article>
   {isSubmitCliked? <div id="overlay " className="fixed   bg-[rgba(0,0,0,0.4)] -top-14 left-0 z-10 w-[104.6vw] h-[122vh]" ></div>: <div id="overlay " className="fixed   bg-[rgba(0,0,0,0.4)] -top-14 left-0 z-10 w-[104.6vw] h-[122vh]" onClick={handleVisibility}></div>}
      <div className="absolute p-8  z-30   top-[50%] left-[50%] -translate-x-[50%]  bg-white rounded-lg shadow-xl  ">
        <h4 className='p-2 text-lg font-bold'>Set the Post Category</h4>
         <InputComponet type='text' name='category' placeholder='Post category' value={category} onChange={(e)=>{
          setCategory(e.target.value)
         }}/>
         <Button disabled={sendingResponse?true:false}  name={sendingResponse?"Wait...":"post"} onClick={handleSubmit} className='w-full my-8'/>
      </div>
  </article>}
     
      <h4  className=' bg-white text-lg md:text-2xl text-gray-500 font-bold p-2 text-center'>Add a post here</h4>
    <article className='overflow-x-hidden p-4 md:p-8 rounded-lg '>
    <div id='editorjs' className='bg-white overflow-y-scroll  rounded-lg  h-[80vh]  text-xl'></div>
    <Button name='upload'  onClick={handleVisibility} className='w-full my-4 md:text-xl font-semibold '/>
    </article>
    </section>
}