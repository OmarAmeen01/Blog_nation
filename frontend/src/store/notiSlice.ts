import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    id:"",
    likes:true,
    shares:true,
    comments:true,
    post_uploads:true
}

export const  notiReducer = createSlice({
    name:"notiSlice",
    initialState,
    reducers:{
        setNotiStates :(state,action)=>({
            ...state,
            [action.payload[0]]:action.payload[1]
        })
    }
})

export const {setNotiStates} = notiReducer.actions
export default notiReducer.reducer