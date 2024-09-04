import React from "react";
import { Link } from "react-router-dom";
interface Footer{
    className?:string;
    children?:React.ReactNode
}

const footerLinks =[
    {
        path:"/",
        name:'Home'
    },{
        path:"/help",
        name:"Help",
    },
    {
        path:"/careers",
        name:"Careers",
    },
    {
        path:"/blog",
        name:"Blog",
    },
    {
        path:"/privacy",
        name:"Privacy",
    }, {
        path:"/Team",
        name:"Team",
    }
    
]
// note here how to declare inline type in typescript 
export default function Footer({className}:{className?:string}){
    return (
        <div className={`border-t-2 p-2    text-sm border-black flex justify-center gap-4 ${className} `}>
         {footerLinks.map(link=>{
            return (
                <Link to={link.path} className=" text-gray-700 ease-in-out  hover:underline hover:underline-offset-4 " >{link.name}</Link>
            )
         })}
        </div>
    )
}