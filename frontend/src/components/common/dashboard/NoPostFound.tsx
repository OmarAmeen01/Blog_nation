
import PostNotFound from "../../../assets/NO-Record-Found.jpg"
import DashboardTopNav from "./DashboardTopNav"


export default function NoPostFound(){


    return <section>
   <DashboardTopNav/>

<div className="relative flex justify-center items-center h-[75vh] lg:h-[70vh] bg-white">
     <p  className="text-4xl text-mono font-bold -rotate-90 absolute  -left-40 bottom-52 ">IT LOOKS EMPTY HERE</p>
    <img src={PostNotFound}className="w-full object-contain max-h-[450px]  max-[620px]:h-[450px]" alt="post not found" />
  </div>
  </section>
}