
import { useState } from "react"
import InputComponet from "../common/inputComponet"
import hidden from "../../assets/eye-off-outline.svg"
import visible from "../../assets/eye-outline.svg"
import Button from "../common/button"
import axios from "axios"
import { useDispatch, useSelector} from "react-redux"
import { authenticate, setIsSigninClicked, setIsSignupClicked } from "../../store/authSlice"
import Signup from "./signup"
import { setIsFormVisible } from "../../store/authSlice"
import {Store} from  "../../typescript/interfaces"
import validateCredentails from "../../helper/credentialValidator"
//functions 



export default function Signin() {
    const [isPasswordHidden, setPasswordHidden] = useState(true)
    const [isEmailInvalid, setIsEmailInvalid] = useState(false)
    const [isPasswordInvalid, setIsPasswordInvalid] = useState(false)
    const [sendingResponse, setSendingResponse] = useState(false)
    
   const isFormVisible= useSelector<Store>(state=>state.auth.isFromVisible) as boolean
   const isSigninClicked = useSelector<Store>(state=>state.auth.isSigninClicked) as boolean
   const isSignupClicked= useSelector<Store>(state=>state.auth.isSignupClicked) as boolean

   const backendUrl = import.meta.env.VITE_USER_API_URL

    const [error, setError] = useState({
        isError: false,
        error: ""
    })
    const dispatch =useDispatch()
    const [userDetails, setUserDetails] = useState({
        email: "",
        password: ""
    })

    //function 
    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
       
                try {
                    setSendingResponse(true)
                    const response = await axios.post(`${backendUrl}/signin`, userDetails,{withCredentials:true})

                   if(validateCredentails(userDetails.email,userDetails.password,setIsEmailInvalid,setIsPasswordInvalid)){

                
                   
                  
                
                    if (response.data.status) {
                           window.location.reload()
                            dispatch(setIsFormVisible(false))
                            dispatch(setIsSigninClicked(false))
                            dispatch(setIsSignupClicked(false))
                        setSendingResponse(false)
                    
                            dispatch(authenticate([response.data.status, response.data.data]))
               
                        
                        
                    }
                   else{
                    setError(prevState=>({
                        ...prevState,
                        isError:true,
                        error:response.data.msg
                    }))
                    setSendingResponse(false)
                   }
                }else{
                    setSendingResponse(false)
                }
                } catch (error) {
                    console.log(error)
                    setError(prevState => ({
                         ...prevState,
                        isError: true,
                        error: "Server didn't respond try again later"
                    }))
                    setSendingResponse(false)
                }
 
    }



    return (isFormVisible && isSigninClicked)&&<><div className="fixed   bg-[rgba(0,0,0,0.4)] top-0 left-0 z-10 w-[100%] h-[100%]" onClick={()=>{
         dispatch(setIsSigninClicked(!isSigninClicked))
        dispatch(setIsFormVisible(!setIsFormVisible)) }}>    </div>
    
<div className="fixed  z-30 top-[40%] left-[50%] -translate-x-[50%] -translate-y-[50%] w-full mx-4 sm:mx-0 min-[400px]:left-[50%] min-[400px]:mx-0 md:w-[45rem] p-4  mt-24 mb-24">
       {isSignupClicked?<Signup/>:<form className="bg-white px-6 py-2 rounded-lg shadow-lg   relative overflow-hidden " onSubmit={handleSubmit}>
     {sendingResponse&& <div id="form-loading" className="absolute top-0" ></div>}
       <h2 className="font-bold text-2xl p-2 text-center">Sign in to your account</h2>
            { error.isError&&<p className="text-red-500 text-lg text-center">{error.error}</p>}   
            <InputComponet type="email" name="email" 
            className={`"focus:border-2 focus:border-black w-full h-10" ${isEmailInvalid? "border-red-500  border-2":"h-10"}`}
            placeholder="omarameen@gmail.com" value={userDetails.email} isValid={isEmailInvalid} error="Please enter a valid email address." onChange={(e) => {
                setIsEmailInvalid(false);
                setUserDetails(prevState => ({
                    ...prevState,
                    email: e.target.value
                }))
            }} label="Email" />
 
            <div id="pass-word" className=" relative group  h-16border-2 border-black">
                <InputComponet id="Password" type={isPasswordHidden ? "password" : "text"} placeholder="Password..." name="password"
                label="password"
                className={`"focus:border-2 focus:border-black w-full h-10" ${isPasswordInvalid? "border-red-500  border-2":"h-10"}`}
                    maxLength={30}
                    isValid={isPasswordInvalid} error="Enter a Valid Password" value={userDetails.password} onChange={(e) =>{ 
                        setIsPasswordInvalid(false)
                        setUserDetails(prevState => ({
                        ...prevState,
                        password: e.target.value
                    }))}} />
                <img src={isPasswordHidden ? hidden : visible} className="p-2 w-9 absolute right-8 top-9" alt="" onClick={() => setPasswordHidden(prevState => !prevState)} />
            </div>

            <Button disabled={sendingResponse} className=" w-full mt-4 mb-2" name={sendingResponse?"wait...":"submit"} type="submit" />

            <p className="p-2 text-center mt-3 border-t-2 border-black ">Create a account <button onClick={()=>{
                 dispatch(setIsSigninClicked(!isSigninClicked))
                dispatch(setIsSignupClicked(!isSignupClicked))
            }}className="bg-white text-blue-800 text-lg  hover:underline underline-offset-8" >Sign up</button></p>
     
        </form>} 

        </div>
    </> 
}