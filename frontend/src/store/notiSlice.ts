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
    unWatched:0
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
        setWatched:(state,action)=>{
          state.unWatched =action.payload
        }
    }
})

export const {setNotiStates,setNotifications,setWatched} = notiReducer.actions
export default notiReducer.reducer