import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    id:"",
    likes:true,
    shares:true,
    comments:true,
    post_uploads:true,
    notifications:[]
}

export const  notiReducer = createSlice({
    name:"notiSlice",
    initialState,
    reducers:{
        setNotiStates :(state,action)=>({
            ...state,
            [action.payload[0]]:action.payload[1]
        }),
        setNotifications:(state,action)=>{
            state.notifications=action.payload
        }
    }
})

export const {setNotiStates,setNotifications} = notiReducer.actions
export default notiReducer.reducer