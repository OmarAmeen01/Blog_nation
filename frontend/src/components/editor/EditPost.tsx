
import EditorJS, { OutputData, ToolConstructable } from '@editorjs/editorjs';
import { useEffect,useRef, useState } from 'react';
import Header from '@editorjs/header';
import axios from 'axios';
import Button from '../common/button';
import InputComponet from '../common/inputComponet';
import { useNavigate,useParams} from 'react-router-dom';
import {  InputData, Post } from '../../typescript/interfaces';
import axiosBlogInstance from '../../api/AxiosBlogInstance';
// always initialise in useEffect hook
 

export default function EditPost(){
  const BlogApiUrl =import.meta.env.VITE_POST_API_URL
  const [sendingResponse,setSendingResponse] = useState(false)
  const[isSubmitCliked,setIsSubmitClicked] =useState(false)
  const [content,setContent] = useState< InputData | OutputData>()
  const [isPostClicked,setIsPostClicked] = useState(false)
  const [category,setCategory] = useState("")
const [contentId,setContentId] = useState("")
  const navigate = useNavigate()
  const {postId}= useParams()
let editorReff= useRef<EditorJS|null|boolean>(null)

useEffect(()=>{
  
  if(!editorReff.current){

   axiosBlogInstance.get(`/posts/${postId}`).then(res=>{
  
    if(res.data.status){
         const data:Post = res.data.data
         //editor init
         setContent(data.content[0])// undefined why?
         setContentId(data.content[0].id)
         setCategory(data.category)
          const editor = new EditorJS(
            {
              holder: 'editorjs',
              inlineToolbar:true,
              placeholder:"Whats on your mind",
              autofocus:true,
              defaultBlock:'header',
              data:{
                blocks:data.content[0].blocks
              },
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
        contentId:contentId,
       }
       
     try {
      const response= await axiosBlogInstance.put(`/addpost/${postId}`,postDetails,{withCredentials:true})
    if(response.data.status){
      setSendingResponse(false)
      handleVisibility(),
      navigate("/dashboard")
    }
      
     } catch (error) {
      console.log(error)
      setSendingResponse(false)
     }
       
       
    
    
        


    }
  
   








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
    <Button name='update post' onClick={handleVisibility} className='w-full my-4 md:text-xl font-semibold '/>
    </article>
    </section>
}