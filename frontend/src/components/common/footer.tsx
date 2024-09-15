import { Link } from "react-router-dom";
import { setIsFormVisible, setIsSigninClicked } from "../../store/authSlice"
import { useDispatch, useSelector } from "react-redux";
import { Store } from "../../typescript/interfaces";


const footerLinks =[
    {
        path:"/",
        name:'Home'
    },{
        path:`/addPost`,
        name:"Write",
    },
    {
        path:"/settings",
        name:"Settings",
    },
    {
        path:"/dashboard",
        name:"Dashboord",
    },
]
// note here how to declare inline type in typescript 
export default function Footer({className}:{className?:string}){
   const dispatch  = useDispatch()
 
    const loginStatus = useSelector<Store>(state=>state.auth.status) as boolean
    const  formVisible = useSelector<Store>(state=>state.auth.isFromVisible) as boolean
    const  signinVisible = useSelector<Store>(state=>state.auth.isSigninClicked) as boolean

   function handleClick(){
    dispatch(setIsFormVisible(!formVisible))
    dispatch(setIsSigninClicked(!signinVisible))
   }


    return (
        <div className={`border-t-2 p-2    text-sm border-black flex justify-center gap-4 ${className} `}>
         {footerLinks.map(link=>{
            return (
              loginStatus?  <Link key={link.name+link.path} to={link.path} className=" text-gray-700 ease-in-out  hover:underline hover:underline-offset-4 " >{link.name}</Link>:<button onClick={handleClick}>{link.name}</button>
             
            )   
         })}
          <Link to="/explore_features">Explore Features</Link>
        </div>
    )
}