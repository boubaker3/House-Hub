import { createSlice} from "@reduxjs/toolkit";
import { logout } from "./LogoutApi"; 



export const logoutSlice =createSlice({
 name:"logout",
 initialState:{ 
    loggedOut:"",
    res:"",
    isLoading: false,
},
reducers:{

},
extraReducers:{
    [logout.pending.type]:(state,action)=>{
        state.isLoading = true
    },
    [logout.fulfilled.type]:(state,{payload})=>{
        state.res = payload.res 
        state.loggedOut = payload.loggedout 
        state.isLoading = false
    },
    [logout.rejected.type]:(state,action)=>{
        state.isLoading=false
    },


    
}

})

export const logoutReducer=logoutSlice.reducer

