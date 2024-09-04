import { configureStore } from "@reduxjs/toolkit";
import userReducer from  "./authSlice"
import  postReducer from "./postSlice"
import notiReducer from "./notiSlice"
export const store = configureStore({
    reducer:{
      auth:userReducer,
    post:postReducer,
    noti:notiReducer
    }
})
//Note  export the type of reducer as returntype 