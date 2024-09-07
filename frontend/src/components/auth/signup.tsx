import { useState } from "react"
import InputComponet  from "../common/inputComponet"
import hidden from "../../assets/eye-off-outline.svg"
import visible from "../../assets/eye-outline.svg"
import { signin_out } from "mediumvalidate"
import Button from "../common/button"
import axios from "axios"
import { useDispatch, useSelector } from "react-redux"
import { authenticate, setIsSigninClicked, setIsSignupClicked } from "../../store/authSlice"
import Signin from "./signin"
import { setIsFormVisible } from "../../store/authSlice"
import  validateCredentails from "../../helper/credentialValidator"
import { Store } from "../../typescript/interfaces"
import formatUserDetails from "../../helper/formateUserDetails"
export default function Signup() {
    const [confirmPassword, setConfirmPassword] = useState("")
    const [isConfirmPasswordHidden, setConfirmPasswordHidden] = useState(true)
    const [isPasswordHidden, setPasswordHidden] = useState(true)
    const [isEmailInvalid, setIsEmailInvalid] = useState(false)
    const [isPasswordInvalid, setIsPasswordiInvalid] = useState(false)
    const [isPasswordMatching, setIsPasswordMatching] = useState(false)
    const [isLastNameEmpty,setIsLastNameEmpty]= useState(false)
    const [isFirstNameEmpty,setIsFirstNameEmpty]= useState(false)
    const [sendingResponse, setSendingResponse] = useState(false)
    const dispatch = useDispatch()

    const isFormVisible= useSelector<Store>(state=>state.auth.isFromVisible) as boolean
   const isSigninClicked = useSelector<Store>(state=>state.auth.isSigninClicked) as boolean
   const isSignupClicked= useSelector<Store>(state=>state.auth.isSignupClicked) as boolean
    // note here complex useState
    const backendUrl = import.meta.env.VITE_USER_API_URL

    
    const [error, setError] = useState({
        isError: false,
        error: ""
    })
    const [userDetails, setUserDetails] = useState<signin_out>({
        first_name: "",
        last_name: "",
        email: "",
        password: ""
    })

    //function 
    
    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
       
        if(userDetails.first_name==="" && userDetails.last_name===""){
            setIsLastNameEmpty(true)
            setIsFirstNameEmpty(true)
        }else{
            setIsLastNameEmpty(false)
            setIsFirstNameEmpty(false)
        }
        if (validateCredentails(userDetails.email, userDetails.password,setIsEmailInvalid,setIsPasswordiInvalid)) {

         if(userDetails.password === confirmPassword){
            setIsPasswordMatching(true)
         }else{
            setIsPasswordMatching(false)
         }
        if(!isFirstNameEmpty && !isLastNameEmpty){

        
    
            if (isPasswordMatching) {
           setSendingResponse(true)
                try {
                    const formatedUserDetails= formatUserDetails(userDetails)
                    const response = await axios.post(`${backendUrl}/signup`, formatedUserDetails,{withCredentials:true})
                  console.log(response)
                    if (response.data.status) {
                        

                        setSendingResponse(false)
                        dispatch(authenticate([response.data.status, response.data.data]))
                         dispatch(setIsFormVisible(false))
                         dispatch(setIsSigninClicked(false))
                         dispatch(setIsSignupClicked(false))
                    
                    }
                    setError(prevState=>({
                        isError:true,
                        error:response.data.msg
                    }))
                    setSendingResponse(false)
                } catch (error) {
                    setError(prevState => ({
                        isError: true,
                        error: "Server didn't respond try again later"
                    }))
                    setSendingResponse(false)
                }



            }
        }
        }
    }



    return    (isFormVisible && isSignupClicked)&&  <><div className="fixed   bg-[rgba(0,0,0,0.4)] -top-14 left-0 z-10 w-[104.6vw] h-[122vh]  " onClick={()=>{  dispatch(setIsSignupClicked(!isSignupClicked))
       
            dispatch(setIsFormVisible(!isFormVisible)) }}>    
            </div>
      <div className="absolute  z-30 top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] w-full mx-4 sm:mx-4 min-[400px]:left-[50%] min-[400px]:mx-0 md:w-[45rem] p-2 sm:p-4 my-24 ">
     
{isSigninClicked?<Signin/> :   <form className="bg-white px-6 py-2 rounded-lg shadow-lg  relative overflow-hidden max-w-[523px]" onSubmit={handleSubmit}>
     {sendingResponse&&<div id="form-loading" className="absolute top-0" ></div>}
       <h2 className="font-bold text-2xl text-center">Create a account</h2>
            { error.isError&&<p className="text-red-500 text-lg text-center">{error.error}</p>}
             

            <div id="name" className="flex gap-6 flex-col sm:flex-row">


                <InputComponet type="text" name="first_name " 
                className={`"focus:border-2 focus:border-black sm:w-56 w-full h-10" ${isFirstNameEmpty? "border-red-500  border-2":"h-10"}`}
                placeholder="Omar...." isValid={isFirstNameEmpty} error="Enter First name" value={userDetails.first_name || ""} onChange={(e) => {
                
                    setUserDetails(prevState => ({
                        ...prevState,
                        first_name: e.target.value
                    }))
                    if(userDetails.first_name!=="")setIsFirstNameEmpty(false)
                }} label="First Name" />

                <InputComponet type="text" name="last_name"  isValid={isLastNameEmpty} error="Enter Last name" 
                  className={`"focus:border-2 focus:border-black sm:w-56 w-full  h-10" ${isLastNameEmpty? "border-red-500  border-2":"h-10"}`}
                placeholder="Ameen..." value={userDetails.last_name || ""} onChange={(e) => {
                  
                    setUserDetails(prevState => ({
                        ...prevState,
                        last_name: e.target.value

                    }))
                    if(userDetails.last_name!=="")setIsLastNameEmpty(false)
                }} label="Last Name" />
            </div>

            <InputComponet type="email" name="email" 
            className={`"focus:border-2 focus:border-black  h-10" ${isEmailInvalid? "border-red-500  border-2":"h-10"}`}
            placeholder="omarameen@gmail.com" value={userDetails.email} isValid={isEmailInvalid} error="Please enter a valid email address." onChange={(e) => {
                setIsEmailInvalid(false);
                setUserDetails(prevState => ({
                    ...prevState,
                    email: e.target.value
                }))
                console.log(userDetails)
            }} label="Email" />



            
            <div id="pass-word" className=" relative group  h-16border-2 border-black">
                <InputComponet id="Password" type={isPasswordHidden ? "password" : "text"} placeholder="Password..." name="password"
                label="password"
                className={`"focus:border-2 focus:border-black  h-10" ${isPasswordInvalid? "border-red-500  border-2":"h-10"}`}
                    maxLength={30}
                    isValid={isPasswordInvalid} error="Enter a Valid Password" value={userDetails.password} onChange={(e) =>{ 
                        setIsPasswordiInvalid(false)
                        setUserDetails(prevState => ({
                        ...prevState,
                        password: e.target.value
                    }))}} />
                    <p className=" opacity-0 group-hover:opacity-100  text-md text-green-500">Password must be 8 characters long including 1 uppercase  1 lowercase, letter, 1 symbol, and 1 number</p>
                <img src={isPasswordHidden ? hidden : visible} className="p-2 w-9 absolute right-8 top-9" alt="" onClick={() => setPasswordHidden(prevState => !prevState)} />
            </div>



         
            <div id="  confirm-password" className="relative  h-[6rem] ">
                <InputComponet id="confirmPassword" type={isConfirmPasswordHidden ? "password" : "text"} placeholder="confirm password..." isValid={!isPasswordMatching}
                label="confirmPassword"
                maxLength={30}
                className={`"focus:border-2 focus:border-black  h-10" ${isPasswordMatching? "h-10":"border-red-500  border-2"}`}
                    error="Passwords do not match." name="confirmPassword" value={confirmPassword} onChange={(e) => { 
                         setIsPasswordMatching(true)
                        setConfirmPassword(e.target.value) }} />
              <img src={isConfirmPasswordHidden ? hidden : visible} alt="" className="p-2 w-9 absolute right-8 top-9" onClick={() => setConfirmPasswordHidden(prevState => !prevState)} />
            </div>
            <Button disabled={sendingResponse} className=" w-full mt-4 mb-2" name={sendingResponse?"wait...":"submit"} type="submit" />

            <p className="p-2 text-center mt-3 border-t-2 border-black ">Already have an account <button onClick={()=>{
                dispatch(setIsSignupClicked(!isSignupClicked))
                dispatch(setIsSigninClicked(!isSigninClicked))
            }} className="bg-white text-blue-800 text-lg  hover:underline underline-offset-8" >Sign In</button></p>
     
        </form>}
        </div>


    </>
}