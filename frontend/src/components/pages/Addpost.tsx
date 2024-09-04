import EditorJS, { OutputData, ToolConstructable } from '@editorjs/editorjs';
import { useEffect,useRef, useState } from 'react';
import Header from '@editorjs/header';
import { editorBlocks } from '../../helper/editorBlock';
import axios from 'axios';
import Button from '../common/button';
import InputComponet from '../common/inputComponet';
// always initialise in useEffect hook
 

export default function AddPost(){
  const [content,setContent] = useState<OutputData>()
  const [isPostClicked,setIsPostClicked] = useState(false)
  const [catagory,setCategory] = useState("")
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

    function handleSubmit(){

    }
  
   








    return  <section>
  {isPostClicked&& <article>
  <div id="overlay " className="fixed   bg-[rgba(0,0,0,0.4)] -top-14 left-0 z-10 w-[104.6vw] h-[122vh]" onClick={handleVisibility}></div>
      <div className="absolute p-8  z-30   top-[50%] left-[50%] -translate-x-[50%]  bg-white rounded-lg shadow-xl  ">
        <h4 className='p-2 text-lg font-bold'>Set the Post Category</h4>
         <InputComponet type='text' name='category' placeholder='Post category' value={catagory} onChange={(e)=>{
          setCategory(e.target.value)
         }}/>
         <Button name='Post' onClick={handleSubmit} className='w-full my-8'/>
      </div>
  </article>}
     
    {!isPostClicked&&<article className='overflow-x-hidden'>
      <h4  className=' bg-white text-2xl text-gray-500 font-bold p-2 text-center'>Add a post here</h4>
    <div id='editorjs' className='bg-white overflow-y-scroll   h-[80vh]  text-xl'></div>
    </article>}
    <Button name='upload' onClick={handleVisibility} className='w-full mx-2 text-xl font-semibold '/>
    </section>
}