import { createSlice} from "@reduxjs/toolkit";
import { acceptSeller, refuseSeller } from "../demands/DemandsApi";
import {deleteSeller} from "./SellersApi";
import {showSellers} from "./SellersApi";
 



export const sellerSlice =createSlice({
 name:"seller",
 initialState:{ 
    data : [],
    wasUpdated:"",
    wasDeleted:"",
    isLoading: false,
},
reducers:{

},
extraReducers:{
    
    [showSellers.pending.type]:(state,action)=>{
        state.isLoading = true
    },
 
    [showSellers.fulfilled.type]:(state,{payload})=>{
        console.log(payload)
        state.data = payload 
        state.isLoading = false
    },
    [showSellers.rejected.type]:(state,action)=>{
        state.isLoading=false
    },
  

    [deleteSeller.pending.type]:(state,action)=>{
        state.isLoading = true
    },
    [deleteSeller.fulfilled.type]:(state,{payload})=>{
        state.wasUpdated = payload.res 
        state.isLoading = false
    },
    [deleteSeller.rejected.type]:(state,action)=>{
        state.isLoading=false
    },

    [acceptSeller.pending.type]:(state,action)=>{
        state.isLoading = true
    },
    [acceptSeller.fulfilled.type]:(state,{payload})=>{
        state.wasUpdated = payload.res 
        state.isLoading = false
    },
    [acceptSeller.rejected.type]:(state,action)=>{
        state.isLoading=false
    },

    [refuseSeller.pending.type]:(state,action)=>{
        state.isLoading = true
    },
    [refuseSeller.fulfilled.type]:(state,{payload})=>{
        state.wasUpdated = payload.res 
        state.isLoading = false
    },
    [refuseSeller.rejected.type]:(state,action)=>{
        state.isLoading=false
    },



}

})

export const sellerReducer=sellerSlice.reducer

