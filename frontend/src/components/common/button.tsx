import React from "react";

type button= {
    name?:string,
    className?:string,
     onClick?:React.MouseEventHandler<HTMLButtonElement>
    type?:"submit"| "reset" | "button" | undefined,
disabled?:boolean}
export default function Button({name,className,onClick,type,disabled}:button){

    return (
        <button  onClick={onClick} type={type} disabled={disabled} className={` bg-black   rounded-lg text-white text-sm p-3  hover:opacity-80 ${className}`}>{name}</button>
    )
}