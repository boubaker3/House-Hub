import { createSlice} from "@reduxjs/toolkit";
import { showDemands,storeDemand,updateDemand,deleteDemand } from "../../sellers/demands/DemandsApi";
 
 

export const demandSlice =createSlice({
 name:"demand",
 initialState:{ 
    data : [],
    isLoading: false,
    wasAdded: "",
    wasDeleted: "",
    wasUpdated: "",
},
reducers:{

},
extraReducers:{ 
    [showDemands.pending.type]:(state,action)=>{
        state.isLoading = true
    },
 
    [showDemands.fulfilled.type]:(state,{payload})=>{
        state.data = payload
        state.isLoading = false
    },
    [showDemands.rejected.type]:(state,action)=>{
        state.isLoading=false
    },
   
    [updateDemand.pending.type]:(state,action)=>{
        state.isLoading = true
    },
    [updateDemand.fulfilled.type]:(state,{payload})=>{
        state.isLoading = false
    },
    [updateDemand.rejected.type]:(state,action)=>{
        state.isLoading=false
    },

    [storeDemand.pending.type]:(state,action)=>{
        state.isLoading = true
    },
    [storeDemand.fulfilled.type]:(state,{payload})=>{
        state.isLoading = false
        state.wasAdded = payload.res
    },
    [storeDemand.rejected.type]:(state,action)=>{
        state.isLoading=false
    },

    [deleteDemand.pending.type]:(state,action)=>{
        state.isLoading = true
    },
    [deleteDemand.fulfilled.type]:(state,{payload})=>{
        state.isLoading = false
        state.wasDeleted = payload.res
    },
    [deleteDemand.rejected.type]:(state,action)=>{
        state.isLoading=false
    },

   
}

})

export const demandReducer=demandSlice.reducer

