import { createSlice} from "@reduxjs/toolkit";
import {login} from "./login/LoginApi";
import {signup} from "./signup/SignupApi";
 

export const authSlice =createSlice({
 name:"auth",
 initialState:{ 
    user: {
        id:1,
        userid:"",
        fullname: "",
        email:"",
        photo:"",
        role:"",
        created_at:"",
        updated_at:"",
      },
    token:"",
    is_logged:false,
    isLoading: false,
},
reducers:{

},
extraReducers:{
    [signup.pending.type]:(state,action)=>{
        state.isLoading = true
    },
    [signup.fulfilled.type]:(state,{payload})=>{
        state.user = payload.user
        state.is_logged = payload.is_logged
        state.token = payload.token
        state.isLoading = false
    },
    [signup.rejected.type]:(state,action)=>{
        state.isLoading=false
    },


    [login.pending.type]:(state,action)=>{
        state.isLoading = true
    },
 
    [login.fulfilled.type]:(state,{payload})=>{
        state.user = payload.user
        state.token = payload.token
        state.is_logged = payload.is_logged
        state.isLoading = false
    },
    [login.rejected.type]:(state,action)=>{
        state.isLoading=false
    },
}

})

export const authReducer=authSlice.reducer

