import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
// note how to create golbla router 
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Provider } from 'react-redux'
import {store} from "./store/store.ts"
import { Dashboard,Settings,Home } from './components/bridge.ts'
import Authenticator from './components/common/authenticator.tsx'
import Profile from './components/pages/Profile.tsx'
import AddPost from './components/pages/Addpost.tsx'
const router = createBrowserRouter([
  {
    path:"/",
    element:<App/>,
    children:[
      {
        path:"/",
        element:<Home/>,
      },
      {
        path:"/dashboard",
        element:(
          <Authenticator children={<Dashboard/>}/>
        )
      },
      {
        path:"/settings",
        element:(
         < Authenticator children={<Settings/>}/>
        )
      },
      {
        path:"/profile/:id",
        element:<Profile/>
      },
      {
        path:"/addPost",
        element:<Authenticator children={<AddPost/>} />
      }
    ]
  }


])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store ={store} >
  <React.StrictMode>
    <RouterProvider router= {router}/>
  </React.StrictMode>,
  </Provider>
)
