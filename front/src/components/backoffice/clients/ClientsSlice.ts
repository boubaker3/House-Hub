import { createSlice} from "@reduxjs/toolkit";
import {deleteClient} from "./ClientsApi";
import {showClients} from "./ClientsApi";
 



export const clientSlice =createSlice({
 name:"client",
 initialState:{ 
    data : [],
    wasAdded:"",
    wasDeleted:"",
    isLoading: false,
},
reducers:{

},
extraReducers:{ 
 
    [showClients.pending.type]:(state,action)=>{
        state.isLoading = true
    },
 
    [showClients.fulfilled.type]:(state,{payload})=>{
        state.data = payload 
        state.isLoading = false
    },
    [showClients.rejected.type]:(state,action)=>{
        state.isLoading=false
    },
    [deleteClient.pending.type]:(state,action)=>{
        state.isLoading = true
    },
    [deleteClient.fulfilled.type]:(state,{payload})=>{
        console.log(payload)
        state.wasDeleted= payload.res 
        state.isLoading = false
    },
    [deleteClient.rejected.type]:(state,action)=>{
        console.log(action)
        state.isLoading=false
    },


   
}

})

export const clientReducer=clientSlice.reducer

