
import './App.css'
import Footer from './components/common/footer'
  import Nav from './components/common/nav'
  import { Outlet } from 'react-router-dom'
  import axios from 'axios'
  import { authenticate } from './store/authSlice'
  import { useDispatch } from 'react-redux'
import { useEffect , useState} from 'react'
import { setNotifications } from './store/notiSlice'
import { setNotiStates } from './store/notiSlice'
import HomeLoader from './components/common/loaders/homeLoader'
function App() { 
 const [isLoading,setIsLoading]= useState(true)
 const [isError,setIsError]= useState(false)
 const [getNotificationsState,setGetNotificationState] = useState(false)
  const dispatch = useDispatch()
 const userApiUrl = import.meta.env.VITE_USER_API_URL





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
  

 
},[window.navigator.onLine])
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
 },[getNotificationsState,window.navigator.onLine])
setInterval(()=>{
  setGetNotificationState(prev=>!prev)
},1000*60*10)



useEffect(()=>{
  axios.get(`${userApiUrl}/notification_settings`,{withCredentials:true}).then(response=>{
    if(response.data.status){
      const data=response.data.data
    dispatch(setNotiStates({
      id:data.id,
    likes:data.likes,
    shares:data.shares,
    comments:data.comments,
    post_uploads:data.post_uploads,
    }))

    }
  })
},[window.navigator.onLine])

  return (
   isLoading?<HomeLoader/>: <>
    <Nav/>
    <Outlet/>
    <Footer/>

    </>
  )
}

export default App
