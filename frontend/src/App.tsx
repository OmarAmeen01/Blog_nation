
import './App.css'
import Footer from './components/common/footer'
  import Nav from './components/common/nav'
  import { Outlet } from 'react-router-dom'
  import axios from 'axios'
  import { authenticate } from './store/authSlice'
import { setNotiStates } from './store/notiSlice'
  import { useDispatch } from 'react-redux'
import { useEffect , useState} from 'react'
function App() { 
 const [isLoading,setIsLoading]= useState(true)
 const [isError,setIsError]= useState(false)
  const dispatch = useDispatch()

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
 

  return (
   isLoading?<p>Loader here..</p>: <>
    <Nav/>
    <Outlet/>
    <Footer/>

    </>
  )
}

export default App
