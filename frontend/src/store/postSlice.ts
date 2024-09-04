import {createSlice} from "@reduxjs/toolkit"

const initialState = {
    status:false,
    posts:[]
}
export const postReducer = createSlice({
name:"post",
initialState,
reducers:{

    setPosts:(state,action)=>{
        state.status= action.payload[0],
        state.posts= action.payload[1]
    },
    removePost:(state,action)=>{
        state.status= action.payload[0],
        state.posts= []
    }
}
})

export const {setPosts,removePost} = postReducer.actions
export default postReducer.reducer