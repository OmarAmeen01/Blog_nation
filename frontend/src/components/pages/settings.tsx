import { useEffect, useState } from "react";
import Button from "../common/button";
import Switch from "../common/Switch";
import { useSelector,useDispatch } from "react-redux";
import { NotificationSettings, Store, User } from "../../typescript/interfaces";
import ConfimationDailog from "../common/confirmationDailog";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { unAuthenticate } from "../../store/authSlice";
import ChangePassword from "../auth/ChangePassword"
import {  setNotiStates } from "../../store/notiSlice";
export default function Settings (){
  const [sendingResponse,setSendingResponse] =useState(false)
 const [isChangePasswordVisible,toggleChangePassword] =useState(false)
 const [isDeleteClicked,setIsDeletdClicked] =useState(false)
const userApiUrl = import.meta.env.VITE_USER_API_URL
const navigate = useNavigate()
const dispatch = useDispatch()
const  notiSettings = useSelector<Store>(state=>state.noti.notificationSettings) as NotificationSettings
const  userDetails = useSelector<Store>(state=>state.auth.userData)
const userData = userDetails as User




//functions

function handleDeleteClick(){
 axios.delete(`${userApiUrl}/delete_user`,{withCredentials:true}).then(response=>{
   if(response.data.status){
   navigate('/')
   dispatch(unAuthenticate())
   setIsDeletdClicked(false)
   }else{
     setIsDeletdClicked(false)
   }
 }).catch(error=>{
   console.log(error)
   setIsDeletdClicked(false)
 })

 }


 function handleSaveClick(){
  setSendingResponse(true)
  axios.put(`${userApiUrl}/notification_settings/${notiSettings.id}`,notiSettings,{withCredentials:true}).then(response=>{
 console.log(response)
    if(response.data.status){

      const data= response.data.data

      dispatch(setNotiStates({
        id:data.id,
      likes:data.likes,
      shares:data.shares,
      comments:data.comments,
      post_uploads:data.post_uploads,
      }))

     setSendingResponse(false)
     window.location.reload()
    }else{
setSendingResponse(false)
    }

  }).catch(error=>{
    console.log(error)
    setSendingResponse(false)
  })

 }











    return <section className="lg:px-16 relative ">
         <h4 className="text-4xl font-bold  font-sans  p-4 border-b-black border">Settings</h4> 
          <h4 className="text-2xl font-bold font-sans p-4">Account</h4>
         <article id="account " className="px-4 lg:flex lg:justify-between  lg:gap-4">
          <div id="accountSection">
            <div id="email" className="flex justify-between md:gap-16 ">
                 <p className="text-xl md:text-2xl p-1 ">Email address</p>
                 <p className="text-sm md:text-lg font-sans text-gray-500 p-2">{userData?.email}</p>
            </div> 
            <div id="email" className="flex justify-between   ">
                 <p className="text-xl md:text-2xl p-1  font-sans ">Public Name</p>
                 <p className="text-sm  font-sans text-gray-500 md:text-lg p-2">{userData?.first_name} {userData?.last_name}</p>
            </div> 
          <Button onClick={()=>toggleChangePassword(prev=>!prev)} name="Change password" className="mt-6 lg:text-xl"/>
          <ChangePassword shouldShow={isChangePasswordVisible} handleVisibility={()=> toggleChangePassword(prev=>!prev)}/>
          </div>
           <div id="buttons" className="pt-3  lg:pt-0">
             <div id="delete account" className="border-2 my-6 lg:my-0 border-t-red-500 lg:border-none ">
                <h4 className="text-2xl font-bold font-sans p-2 text-red-500 lg:-mt-9">Delete Account</h4>
             <p className="text-sm font-sans text-gray-500 p-2 md:text-xl">Perminently delete your account and all your content</p>
             <Button onClick={()=>setIsDeletdClicked(prev=>!prev)} name="Delete account" className="bg-red-500 text-white my-2 md:text-xl"/>
             </div>
           </div>
           <ConfimationDailog 
             handleVisibility={()=>{
              setIsDeletdClicked(prev=>!prev)
             }}
           ShouldShow={isDeleteClicked} handleCancel={()=>{
            setIsDeletdClicked(prev=>!prev)
           }}  handleAgree={()=>handleDeleteClick()} title="Delete Account" description="We’re sorry to see you go. Once your account is deleted, all of your content will be permanently gone. If you are not sure click CANCEL" />
         </article>
         <article id="notification" className="p-4  max-w-[400px]">
           <h4 className="text-2xl font-bold font-sans p-2  ">Notifications</h4>
            <div className="flex justify-between">
                <p className="text-xl p-2  font-sans ">
                  Uploads Notification 
                </p>
                <Switch id="post" isOn={notiSettings.post_uploads} handleToggle={()=>{
                    
                    dispatch(setNotiStates({  
                      ...notiSettings,  post_uploads:!notiSettings.post_uploads,}))
                }} colorOne="black" colorTwo="gray"/>
            </div>
            <div className="flex justify-between">
                <p className="text-xl p-2  font-sans ">
                  Comments  Notification
                </p>
                <Switch id="comment" isOn={notiSettings.comments} 
                handleToggle={()=>{
                  
                  dispatch(setNotiStates({ ...notiSettings,   comments:!notiSettings.comments}))}}
                     colorOne="black" colorTwo="gray"/>
            </div>
            <div className="flex justify-between">
                <p className="text-xl p-2  font-sans ">
                   Likes Notification
                </p>
                <Switch id="like" isOn={notiSettings.likes} 
                handleToggle={()=>{
                  dispatch(setNotiStates({ ...notiSettings, likes:!notiSettings.likes}))
                   }}colorOne="black" colorTwo="gray"/>
            </div>
            <div className="flex justify-between">
                <p className="text-xl p-2  font-sans ">
                  Share Notification
                </p>
                <Switch id="share"  isOn={notiSettings.shares} 
                handleToggle={()=>{
                  dispatch(setNotiStates({...notiSettings, shares:!notiSettings.shares}))
                    }} colorOne="black" colorTwo="gray"/>
            </div>
            <div>
              <Button name={sendingResponse?"wait":"Save Changes"} disabled={sendingResponse?true:false} onClick={handleSaveClick} className="w-full mt-6 text-xl"/>
            </div>
         </article>
     
    
    
    </section>
     
}