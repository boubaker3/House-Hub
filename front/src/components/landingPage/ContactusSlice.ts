import { createSlice} from "@reduxjs/toolkit";
import { storeContact } from "./ContactusApi";
 

export const contactSlice =createSlice({
 name:"contact",
 initialState:{ 
    isLoading:false,
    res:""
},
reducers:{

},
extraReducers:{
    

    [storeContact.pending.type]:(state,action)=>{
        state.isLoading = true
    },
 
    [storeContact.fulfilled.type]:(state,{payload})=>{
        state.res = payload.res
        state.isLoading = false

    },
    [storeContact.rejected.type]:(state,action)=>{
        state.isLoading=false
    },
}

})

export const contactReducer=contactSlice.reducer

