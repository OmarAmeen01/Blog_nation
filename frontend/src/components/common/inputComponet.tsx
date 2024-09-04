
import visible from "../../assets/eye-off-outline.svg"
type Input ={
    type?:string,
    placeholder:string,
    pattern?:string,
    onChange:React.ChangeEventHandler<HTMLInputElement>
    value:string
     label?:string,
    isValid?:Boolean,
    name:string,
    error?:string,
    id?:string,
    className?:string
    maxLength?:number
    }
export default function InputComponet({name,type,placeholder,value,onChange,label,isValid,error , maxLength, className,id}:Input ){

    return (
        <div className="flex flex-col">
       {label&&  <label htmlFor={label} className="font-semibold text-sm p-1 md:text-lg ">{label}</label>
          }
                <input  id={label|| id}   className={`rounded-lg text-sm   md:text-lg focus:border-black p-2 outline-0 border-2  ${className}`} type={type || "text"} name={name} placeholder={placeholder} value={value} onChange={onChange} maxLength={maxLength?maxLength: 50} />
                
                {isValid&& <p className="text-red-500 ">{error}</p>}
        </div>
    )
}