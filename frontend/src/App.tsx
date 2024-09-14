
import './App.css'
import Footer from './components/common/footer'
  import Nav from './components/common/nav'
  import { Outlet } from 'react-router-dom'
  import { authenticate } from './store/authSlice'
  import { useDispatch} from 'react-redux'
import { useEffect , useState} from 'react'
import { setNotifications, setWatched } from './store/notiSlice'
import { setNotiStates } from './store/notiSlice'
import HomeLoader from './components/common/loaders/homeLoader'
import axiosBlogInstance from './api/AxiosBlogInstance'
import axiosUserInstance from './api/AxiosUserInstance'
function App() { 
 const [isLoading,setIsLoading]= useState(true)
 const [isError,setIsError]= useState(false)
 const [newNotifications,setNewNotifications] = useState([])
 const [getNotificationsState,setGetNotificationState] = useState(false)
 const [newNotiArrived,setNewNottiArrived] = useState(false)
  const dispatch = useDispatch()


useEffect(()=>{
 axiosUserInstance.get(`/login_status`,{withCredentials:true}).then(response=>{
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
     axiosUserInstance.get(`/notifications`, {withCredentials:true}).then(res=>{
         
      if(res.data.status){
     dispatch(setNotifications(res.data.data))
        setNewNotifications(res.data.data)
     setNewNottiArrived(true)
       
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
  setNewNottiArrived(false)
},1000*60*10)



useEffect(()=>{
  axiosUserInstance.get(`/notification_settings`,{withCredentials:true}).then(response=>{
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

  useEffect(()=>{
    if(newNotiArrived){
    
      axiosUserInstance.get(`/unWatch`,{withCredentials:true} ).then(res=>{
        const unWatched = res.data.data.un_watched
        const watched = res.data.data.watched
        console.log(newNotifications,"naya mal equal to garam mall")
        if(unWatched===null && watched===0){
    
          const unWatchedNotifications=newNotifications.length
         
          dispatch(setWatched(unWatchedNotifications))
          axiosUserInstance.put(`/unWatch`,{un_watched:unWatchedNotifications},{withCredentials:true}).then(res=>{
            console.log(res)
          })
          
        }else{
          
          if(newNotifications.length>unWatched){
            const unWatchedNotifications= newNotifications.length-watched +unWatched
            dispatch(setWatched(unWatchedNotifications))
            axiosUserInstance.put(`/unWatch`,{
              un_watched:unWatchedNotifications},{withCredentials:true}).then(res=>{
              console.log(res)
            })
          }else{

          }
          
          }
       })
    }else{
       const unWatchedNotifications=newNotifications.length
         
          dispatch(setWatched(unWatchedNotifications))
          axiosUserInstance.put(`/unWatch`,{un_watched:unWatchedNotifications},{withCredentials:true}).then(res=>{
            console.log(res)
          })
    }
    
    },[newNotiArrived])




  return (
   isLoading?<HomeLoader/>: <>
    <Nav/>
    <Outlet/>
    <Footer/>

    </>
  )
}

export default App
