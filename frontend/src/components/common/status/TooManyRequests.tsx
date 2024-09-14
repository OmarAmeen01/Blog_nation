import { useState } from "react"
import { useNavigate } from "react-router-dom"


export default function TooManyRequests(){
const [time ,setTime] = useState(120)
const  navigate = useNavigate()

if(time===0){
navigate("/")
}else{
    setInterval(()=>{
        setTime(prev=>prev-1)
    },1000)
}
   


const minutes = Math.floor(time/60)
const seconds = Math.floor(time/2)
 
const formatedSeconds = seconds<10? `0${seconds}`: seconds


    return (
        <div>
         <p className="text-4xl font-bold p-2 border-y-2 border-black">TOO MANY REQUESTS TRY AFTER <p>{minutes}:{formatedSeconds}</p> </p>
        </div>
    )
}