import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  notificationSettings:{
    id:"",
    likes:true,
    shares:true,
    comments:true,
    post_uploads:true,
  },
    notifications:[],
    unWatched:0,
    watched:0
}

export const  notiReducer = createSlice({
    name:"notiSlice",
    initialState,
    reducers:{
        setNotiStates :(state,action)=>{
                    return {
              
                      ...state,
                     notificationSettings:{
   
                           ...action.payload
                       },
              
                    };
              
    
            
  
        },
        setNotifications:(state,action)=>{
            state.notifications=action.payload
        },
        setUnWatched:(state,action)=>{
          state.unWatched =action.payload
        },
        setWatched:(state,action)=>{
       state.watched= action.payload
        }
    }
})

export const {setNotiStates,setNotifications,setUnWatched,setWatched} = notiReducer.actions
export default notiReducer.reducer