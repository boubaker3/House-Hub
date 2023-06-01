import { createSlice} from "@reduxjs/toolkit";
import { storeSave ,showSaves} from "./SavesApi";
 

export const savesSlice =createSlice({
 name:"saves",
 initialState:{ 
    data:[],
    isLoading:false,
    res:""
},
reducers:{

},
extraReducers:{
    

    [storeSave.pending.type]:(state,action)=>{
        state.isLoading = true
    },
 
    [storeSave.fulfilled.type]:(state,{payload})=>{
        state.res = payload.res
        state.isLoading = false

    },
    [storeSave.rejected.type]:(state,action)=>{
        state.isLoading=false
    },

    [showSaves.pending.type]:(state,action)=>{
        state.isLoading = true
    },
 
    [showSaves.fulfilled.type]:(state,{payload})=>{
        state.data = payload.saves
        state.isLoading = false

    },
    [showSaves.rejected.type]:(state,action)=>{
        state.isLoading=false
    },
}

})

export const savesReducer=savesSlice.reducer

