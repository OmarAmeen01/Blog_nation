
import './App.css'
import Footer from './components/common/footer'
  import Nav from './components/common/nav'
  import { Outlet } from 'react-router-dom'
  import axios from 'axios'
  import { authenticate } from './store/authSlice'
  import { useDispatch,useSelector } from 'react-redux'
  import { Notification } from './typescript/interfaces'
  import { Store } from './typescript/interfaces'
import { useEffect , useState} from 'react'
import { setNotifications } from './store/notiSlice'
function App() { 
 const [isLoading,setIsLoading]= useState(true)
 const [isError,setIsError]= useState(false)
 const [getNotificationsState,setGetNotificationState] = useState(false)
  const dispatch = useDispatch()
 const userApiUrl = import.meta.env.VITE_USER_API_URL
const  notificationsState = useSelector<Store>(state=>state.noti.notification) as Notification[]
const notifications =notificationsState?notificationsState:[]
useEffect(()=>{
  const BackenUrl = import.meta.env.VITE_USER_API_URL

 axios.get(`${BackenUrl}/login_status`,{withCredentials:true}).then(response=>{
  setIsLoading(false)
  if(response.data.status){
    dispatch(authenticate([response.data.status, response.data?.data]))
  }
 }).catch(error=>{
  console.log(error)
  setIsLoading(false)
  setIsError(true)
 })
  

 
},[])
 useEffect(()=>{
   const controller = new AbortController(); 
const signal = controller.signal;
  function getNotifications(){
    try {
     axios.get(`${userApiUrl}/notifications`, {withCredentials:true}).then(res=>{
         console.log(res.data.data)
      if(res.data.status){
         dispatch(setNotifications(res.data.data))
      }
        })
    } catch (error) {
     console.log(error)
    }
   }
     getNotifications()

   return ()=>{
    controller.abort()

   }
 },[getNotificationsState])
setInterval(()=>{
  setGetNotificationState(prev=>!prev)
},1000*60*10)
console.log(notifications.length)
  return (
   isLoading?<p>Loader here..</p>: <>
    <Nav/>
    <Outlet/>
    <Footer/>

    </>
  )
}

export default App
