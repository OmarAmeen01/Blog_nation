import { useState } from "react";
import Button from "../common/button";
import InputComponet from "../common/inputComponet";
import hidden from "../../assets/eye-off-outline.svg"
import visible from "../../assets/eye-outline.svg"
import  {validateChangePassword} from "mediumvalidate"
import axios from "axios"
export default function ChangePassword({shouldShow, handleVisibility}:{shouldShow:boolean,handleVisibility:()=>void}){
const [passwordVisbility,setPasswordVisibilty] = useState({
    isPasswordHidden:true,
    isConfirmPasswordHidden:true,
    isNewPasswordHidden:true,
})
 const [isPasswordInvalid,setIsPasswordInvalid] = useState(false)
 const [passwords,setPasswords] = useState<validateChangePassword>({
     oldPassword:'',
     newPassword:""
 })
 const [confirmPassword ,setConfirmPassword] = useState("")
 const [isPasswordMatching,setIsPasswordMatching] =useState(false)
const [error,setErorr] = useState('')
const[changingPassword,setChangingPassword] = useState(false)
const  userApiUrl= import.meta.env.VITE_USER_API_URL

function handleSubmit(){
  
    if(confirmPassword===passwords.newPassword){

  


 axios.put(`${userApiUrl}/change_password`,passwords,{withCredentials:true}).then(response=>{

     setChangingPassword(true)
    if(response.data.status){
      
         setChangedPassword(true)
         setPasswords(prev=>({
            ...prev,
            newPassword:"",
            oldPassword:""
         }))
         setErorr("")
         setIsPasswordInvalid(false)
      setConfirmPassword("")
         setTimeout(()=>{
            handleVisibility()
            setChangingPassword(false)
         },3000)
    }
    setErorr(response.data.msg)
    setIsPasswordInvalid(true)
 }).catch(error=>{
    console.log(error)
 })
}else{
setIsPasswordMatching(false)
}
}

    return shouldShow && <>
     
      <div id="overlay " className="fixed   bg-[rgba(0,0,0,0.4)] top-0 left-0 z-10 w-[104.6vw] h-[122vh]" onClick={handleVisibility}></div>
      {changedPassword?<div className="z-20 relative overflow-hidden -top-16 left-1 md:left-2  bg-white p-4 rounded-lg md:p-8 lg:w-[500px] lg:left-16">
    <p className="bg-green-500 text-2xl font-bold  p-4 font-mono rounded-lg text-white">
        Password Changed successfully
    </p>
    <div id="form-loading" className="absolute top-0 bg-green-500" ></div>

</div> : <div className="z-20 fixed  top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] bg-white p-4 rounded-lg md:p-8">
    <h4 className="p-2 text-2xl font-bold text-center text-mono"> Change password</h4>
           <div id="pass-word" className=" relative group ">
           <InputComponet id="Old Password" type={passwordVisbility.isPasswordHidden ? "password" : "text"} placeholder="Password..." name="password"
                label="Old Password"
                className={`"focus:border-2 focus:border-black  h-10" ${isPasswordInvalid? "border-red-500  border-2":"h-10"}`}
                    maxLength={30}
                    isValid={isPasswordInvalid} error={error} value={passwords.oldPassword} onChange={(e) =>{ 
                        setIsPasswordInvalid(false)
                       setPasswords(prev=>({
                        ...prev,
                        oldPassword:e.target.value,
                       }))
                }} />
                <img src={passwordVisbility.isPasswordHidden ? hidden : visible} className="p-2 w-9 absolute right-8 top-9" alt="" onClick={() => setPasswordVisibilty(prev=>({
                    ...prev,
                    isPasswordHidden:!prev.isPasswordHidden
                }))} />
            </div>

            <div id="new-pass-word" className=" relative group  border-black">
           <InputComponet id="New Password" type={passwordVisbility.isNewPasswordHidden ? "password" : "text"} placeholder="New Password..." name="password"
                label="New Password"
                className={`"focus:border-2 focus:border-black  h-10" ${isPasswordInvalid? "border-red-500  border-2":"h-10"}`}
                    maxLength={30}
                    isValid={isPasswordInvalid} error="Enter a valid password" value={passwords.newPassword} onChange={(e) =>{ 
                        setIsPasswordInvalid(false)
                       setPasswords(prev=>({
                        ...prev,
                        newPassword:e.target.value,
                       }))
                }} />
                    <p className=" opacity-0 group-hover:opacity-100  text-md text-green-500">Password must be 8 characters long including 1 uppercase  1 lowercase, letter, 1 symbol, and 1 number</p>
                <img src={passwordVisbility.isNewPasswordHidden ? hidden : visible} className="p-2 w-9 absolute right-8 top-9" alt="" onClick={() => setPasswordVisibilty(prev=>({
                    ...prev,
                    isNewPasswordHidden:!prev.isNewPasswordHidden
                }))} />
            </div>

         
            <div id="  confirm-password" className="relative  h-[6rem] ">
                <InputComponet id="
                Confirm Password" type={passwordVisbility.isConfirmPasswordHidden ? "password" : "text"} placeholder="confirm password..." isValid={!isPasswordMatching}
                label="Confirm Password"
                maxLength={30}
                className={`"focus:border-2 focus:border-black  h-10" ${isPasswordMatching? "h-10":"border-red-500  border-2"}`}
                    error="Passwords do not match." name="confirmPassword" value={confirmPassword} onChange={(e) => { 
                         setIsPasswordMatching(true)
                        setConfirmPassword(e.target.value) }} />
              <img src={passwordVisbility.isConfirmPasswordHidden ? hidden : visible} alt="" className="p-2 w-9 absolute right-8 top-9" onClick={() => setPasswordVisibilty(prev=>({
                ...prev,
                isConfirmPasswordHidden:!prev.isConfirmPasswordHidden
              }))} />
            </div>
     
      <Button name="Change Password" className="w-full mt-6 text-lg font-semibold" onClick={handleSubmit}/>

    </div>}
      
    </>
}