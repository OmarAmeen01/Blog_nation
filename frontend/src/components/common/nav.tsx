
import { useSelector, useDispatch } from "react-redux"
import { Link } from "react-router-dom"
import Button from "./button"
import write from "../../assets/write.svg"
import Signup from "../auth/signup"
import { setIsFormVisible, setIsSignupClicked } from "../../store/authSlice"
import { Store } from "../../typescript/interfaces"
import DropDown from "./DropDown"
import Profile from "../../assets/profile.png"
import Signin from "../auth/signin"
import { useState } from "react"
import NotificationCenter from "./NotificationCenter"
const navLinks = [
    {
        path: "/our_story",
        name: "Our story"
    },
    {
        path: "/membership",
        name: "Membership"
    }
]

// functions 


export default function Nav({ className }: { className?: string }) {
    //note here export the import the type of reducer as generic to useSelect function
    const status = useSelector<Store>(state => state.auth.status)
    const isFormVisible = useSelector<Store>(state => state.auth.isFromVisible) as boolean
    const isSignupClicked = useSelector<Store>(state => state.auth.isSignupClicked) as boolean
    const isSigninClicked = useSelector<Store>(state => state.auth.isSigninClicked) as boolean
    const [isProfileClicked, setIsProfileClicked] = useState(false)
    const dispatch = useDispatch()
    function handleClick() {
        dispatch(setIsSignupClicked(!isSignupClicked))
        dispatch(setIsFormVisible(!isFormVisible))
    }




    return (


        <>
            <nav className="border-b-2 bg-white relative border-black flex  justify-between  px-4 lg:px-16">
                <Link to="/" className="text-lg md:text-2xl lg:text-3xl font-extrabold py-2">BlogNation</Link>
                <div className="flex  ">
                    <div className={` gap-6 text-sm hidden lg:flex border-black py-4 px-4  ${className} `}>
                        {navLinks.map(link => {
                            return <Link to={link.path} className=" font-sans text-gray-700  hover:underline hover:underline-offset-4">{link.name}</Link>


                        })}


                    </div>

                    <div id="buttons" className="flex gap-4  justify-center items-center ">
                        {status ? <Link className="hidden sm:flex   hover:underline  hover:underline-offset-4" to="/addpost"><img src={write} className="w-5 h-5 " alt="" /><p className="font-sans text-sm text-gray-700 px-1"> Write</p></Link> : <button className="  hover:underline underline-offset-4 hidden sm:flex" onClick={handleClick}><img src={write} alt="" className="" /><p className="font-sans text-gray-700 text-sm">Write</p></button>}
                        {status ? <div className=" flex gap-4">
                            <NotificationCenter />
                            <button onClick={() => setIsProfileClicked(prev => !prev)
                            }>
                                <img src={Profile} alt="profile" className=" rounded-full  h-9 w-9 hover:contrast-50" /></button>
                        </div>
                            : <Button name="Get started " className="" onClick={handleClick} />}

                    </div>
                    <DropDown shouldShow={isProfileClicked} handleVisibility={() => setIsProfileClicked(prev => !prev)} />
                </div>
            </nav>
            {isSignupClicked && <Signup />}
            {isSigninClicked && <Signin />}
        </>
    )
}