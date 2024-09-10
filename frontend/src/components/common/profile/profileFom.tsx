import { ProfileDetails } from "../../../typescript/interfaces";
import React, { useState } from "react";
import InputComponet from "../inputComponet";
import Button from "../button";
import axois from "axios"


export default function ProfileForm({profileDetails,shouldShow,handleToggle}:{profileDetails?:ProfileDetails, shouldShow:boolean, handleToggle:()=>void}){
const [profileInfo,setProfileInfo] = useState({
    first_name:profileDetails?.first_name ||"",
    last_name:profileDetails?.last_name ||"",
    domain:profileDetails?.domain ||"",
     image:profileDetails?.image ||"",
    pronoun:profileDetails?.pronoun ||"",
    about:profileDetails?.about||"",
    cover_image:profileDetails?.cover_image ||"",
    domain_title:profileDetails?.domain_title ||""
})
const [sendingResponse,setSendingResponse] = useState(false)
const [Error,setError] = useState({
  error:"",
  isError:false,
})
const userApiUrl= import.meta.env.VITE_USER_API_URL
function handleSubmit(e:React.FormEvent){
  e.preventDefault() 
  setSendingResponse(true)
  axois.put(`${userApiUrl}/profile`,profileInfo,{withCredentials:true}).then(response=>{
    console.log(response)
    if(response.data.status){
      handleToggle()
      window.location.reload()
      setSendingResponse(false)
      setError(prev=>({
        error:"",
        isError:false
      }))
    }else{
      setError(prev=>({
        error:response.data.msg,
        isError:true,
      }))
      setSendingResponse(false)
    }
  }).catch(error=>{
    setError(prev=>({
      error:error,
      isError:true,
    }))
    setSendingResponse(false)
  })

 


}


return (
    shouldShow&&<>
    <div id="overlay " className="fixed   bg-[rgba(0,0,0,0.4)] top-0 left-0 z-10 w-[100%] h-[100%]  " onClick={handleToggle}></div>
     <form   className="fixed bg-white  z-20 top-[35%] left-[45%] -translate-x-[50%] -translate-y-[50%] w-full mx-4 sm:mx-0 min-[400px]:left-[50%] min-[400px]:mx-0 md:w-[45rem] p-4 rounded-lg shadow-xl mt-24 mb-24  overflow-y-scroll h-[95%]">
       <h4 className="border-b-4  text-lg p-3
         font-semibold md:text-xl">Edit Profile</h4>
      
      <InputComponet id="First Name"type="text" placeholder="First Name.." className="w-full" value={profileInfo.first_name}
        name="first_name"
       onChange={(e)=>setProfileInfo(prev=>({


        ...prev,
    
        first_name:e.target.value
       }))} label="First Name"/>
      <InputComponet id="Last Name"
      className="w-full" type="text" placeholder="Last Name.." value={profileInfo.last_name}
        name="last_name"
       onChange={(e)=>setProfileInfo(prev=>({


        ...prev,
    
        _name:e.target.value
       }))} label="Last Name"/>
  

     <InputComponet id="Domain"type="text" placeholder="www.omarameen.co.." value={profileInfo.domain}
        name="domain"
       onChange={(e)=>setProfileInfo(prev=>({


        ...prev,
    
        domain:e.target.value
       }))} label="Domain"/>
       <InputComponet id="Domain Title"type="text" placeholder="www.omarameen.co.." value={profileInfo.domain_title}
        name="domain_title"
       onChange={(e)=>setProfileInfo(prev=>({


        ...prev,
    
        domain_title:e.target.value
       }))} label="Domain Title"/>


      <InputComponet id="Image"type="text" placeholder="https://Image url.." value={profileInfo.image}
        name="image" maxLength={1000}
       onChange={(e)=>setProfileInfo(prev=>({


        ...prev,
    
        image:e.target.value
       }))} label="Image"/>
       <InputComponet id="Cover Image"type="text" placeholder="https://Image url.." value={profileInfo.cover_image}
       maxLength={1000}
        name="cover_image"

  
       onChange={(e)=>setProfileInfo(prev=>({


        ...prev,
    
        cover_image:e.target.value
      }))} label="Cover Image" />    
     <div className="flex flex-col ">
     <label htmlFor="about" className="font-semibold text-sm p-1 md:text-lg ">About
     </label>
      <textarea value={profileInfo.about} minLength={50} onChange={(e)=>setProfileInfo(prev=>({


...prev,
about:e.target.value
}))} name="" id="about" placeholder="Tell me about yourself..." className="rounded-lg Text text-sm md:text-lg  p-2 outline-0 border-2 focus:border-black  " rows={5}></textarea>
     </div>
  <select value={profileInfo.pronoun} onChange={(e)=>setProfileInfo(prev=>({


...prev,

pronoun:e.target.value
}))} name="Pronoun" id="pronoun" className="rounded-lg Text text-sm text-gray-500   md:text-lg  p-2 outline-0 border-2 w-full my-3 ">
    <option value="" disabled selected>Pronoun</option>
    <option value="He/Him">He/Him</option>
    <option value="She/Her">She/Her</option>
    <option value="Them/They">Them/They</option>
  </select>
  {Error.isError&&  <p className="text-red-500 p-2 bg-red-400 text-sm">{Error.error}</p>}
      <Button onClick={handleSubmit} name={sendingResponse?"Wait...":"Submit"} disabled={sendingResponse?true:false} className="w-full md:text-lg"/>
     </form>
      
    </>
)

}