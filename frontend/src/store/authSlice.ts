import {createSlice} from "@reduxjs/toolkit"
const  initialState={
   status:false,
   isFromVisible:false,
   isSignupClicked:false,
   isSigninClicked:false,
   userData:[]
}

export const authSlice = createSlice({
    name:"auth",
    initialState,
    reducers:{
        
        authenticate:(state,action)=>{
      
           state.status= action.payload[0]
           state.userData = action.payload[1]
        },
        unAuthenticate:(state)=>{
            state.status= false,
            state.userData = []
         

        },
    setIsFormVisible:(state,action)=>{
              state.isFromVisible= action.payload
       },

       setIsSignupClicked(state,action){
        state.isSignupClicked=action.payload
       },
        setIsSigninClicked(state,action){
        state.isSigninClicked=action.payload
       },
      
    }
})

export const {authenticate,unAuthenticate,setIsSigninClicked,setIsSignupClicked,setIsFormVisible} = authSlice.actions
export default authSlice.reducer