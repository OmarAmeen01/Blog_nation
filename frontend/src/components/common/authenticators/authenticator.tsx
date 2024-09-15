
import { useEffect } from "react";
import { Store } from "../../../typescript/interfaces";
import { useSelector,useDispatch} from "react-redux";
import { useNavigate } from "react-router-dom";
import { setIsFormVisible,setIsSigninClicked } from "../../../store/authSlice";
export default function Authenticator({children}:{children:React.ReactNode}){
 const status = useSelector<Store>(state=>state.auth.status)
 const  isFormVisible = useSelector<Store>(state=>state.auth.isFromVisible)
 const isSigninClicked = useSelector<Store>(state=>state.auth.isSigninClicked)
 
 const navigate = useNavigate()
 const dispatch =useDispatch()
 useEffect(()=>{
    if(!status){
        navigate("/")
         dispatch(setIsFormVisible(!isFormVisible))
         dispatch(setIsSigninClicked(!isSigninClicked))
       }
 },[navigate,status])

 return <>
  {children}
 </>
}