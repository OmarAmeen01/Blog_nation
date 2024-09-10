import Button from "./button"
interface ConfimationDailog{

    ShouldShow:boolean,
    handleCancel:React.MouseEventHandler,
    handleAgree:()=>void,
    title:string,
    description:string,
    handleVisibility:React.MouseEventHandler
}

export default function ConfimationDailog({ShouldShow,handleCancel,description,title, handleAgree,handleVisibility}:ConfimationDailog){
   
   return ShouldShow &&<>
     <div id="overlay " className="fixed   bg-[rgba(0,0,0,0.4)] top-0 left-0 z-10 w-[104.6vw] h-[100%]" onClick={handleVisibility}></div>
   <div className="fixed   z-30   top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] min-w-[200px]  p-6  flex flex-col justify-center items-center rounded-lg shadow-lg bg-white ">
   <h4 className="text-2xl    font-mono font-bold p-4">{title}</h4>
   <p className="font-mono text-gray-600 text-xl">{description}</p>
  <div id="buttons " className="flex  justify-around p-5 gap-5">
  <Button name="Cancel" className="bg-gray-400 text-black text-xl" onClick={handleCancel}/>
  <Button name="Delete" className="bg-red-500 text-xl" onClick={handleAgree}/>
  </div>
</div>
   </> 
}