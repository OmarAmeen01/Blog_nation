

export default function HomeLoader(){

   return  <div>
        <div id="nav" className=" bg-white p-4 flex justify-between">
        <div className="p-2 w-48  h-9 my-3 flex animation bg-gray-500">  </div>
      <div className="flex gap-4">
      <div className="p-2 w-28 round  h-7 mt-5 flex animation bg-gray-500">  </div>
      <div className="p-2 w-28  h-7  mt-5 flex animation bg-gray-500">  </div>
      <div  className="p-2 w-9 rounded-full  h-9 my-3 flex animation bg-gray-500"> </div>
      </div>
        </div>
      <div className="hero flex justify-between mt-8 p-8 ">
     <div className="flex flex-col  gap-4">
        <div className="h-12 w-[38rem] animation bg-gray-500"></div>
        <div className="h-12 w-[34rem] animation bg-gray-500"></div>
        <div className="h-12 w-[30rem] animation bg-gray-500"></div>
      <div className="flex gap-2 mt-4 flex-col">
      <div className="h-7 w-[38rem] animation bg-gray-500"></div>
        <div className="h-7 w-[34rem] animation bg-gray-500"></div>
        <div className="h-7 w-[30rem] animation bg-gray-500"></div>
      </div>

      <div id="buttons" className=" flex gap-6 mt-4">
      <div className="h-11 rounded-lg w-24 bg-gray-500 animation"></div>
      <div className="h-11 w-24 rounded-lg bg-gray-500 animation"></div>
      </div>
     </div>
        <div className=" animation w-[32rem] h-[25rem] bg-gray-500 ">

        </div>
      </div>
    </div>
}