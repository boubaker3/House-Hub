import { createSlice} from "@reduxjs/toolkit";
import {showMsgs, updateStatus} from "./ChatApi";
import {sendMsgs} from "./ChatApi";
import {showMessagedUsers} from "./ChatApi";
 
 



export const chatSlice =createSlice({
 name:"chat",
 initialState:{ 
    data : [],
    messagedUsers : [],
    wasAdded:"",
    wasUpdated:"",
    isLoading: false,
},
reducers:{

},
extraReducers:{
    [sendMsgs.pending.type]:(state,action)=>{
        state.isLoading = true
    },
    [sendMsgs.fulfilled.type]:(state,{payload})=>{
        
        state.wasAdded = payload.res 
        state.isLoading = false
    },
    [sendMsgs.rejected.type]:(state,action)=>{
        state.isLoading=false
    },

    [updateStatus.pending.type]:(state,action)=>{
        state.isLoading = true
    },
    [updateStatus.fulfilled.type]:(state,{payload})=>{
        
        state.wasUpdated = payload.res 
        state.isLoading = false
    },
    [updateStatus.rejected.type]:(state,action)=>{
        state.isLoading=false
    },


    [showMsgs.pending.type]:(state,action)=>{
        state.isLoading = true
    },
 
    [showMsgs.fulfilled.type]:(state,{payload})=>{
        state.data = payload.msgs 
        state.isLoading = false
    },
    [showMsgs.rejected.type]:(state,action)=>{
        state.isLoading=false
    },


    [showMessagedUsers.pending.type]:(state,action)=>{
        state.isLoading = true
    },
 
    [showMessagedUsers.fulfilled.type]:(state,{payload})=>{
        state.messagedUsers = payload.messagedUsers 
        state.isLoading = false
    },
    [showMessagedUsers.rejected.type]:(state,action)=>{
        state.isLoading=false
    },
}

})

export const chatReducer=chatSlice.reducer

