import { createSlice} from "@reduxjs/toolkit";
import { showProperties,storeProperty,deleteProperty,showPropertyDetails  } from "./PropertyApi";
 
 

export const sellerPropertySlice =createSlice({
 name:"property",
 initialState:{ 
    data : [],
    property : {property_id:"",title:"",area:"",city:"",address:"",rating:"",bedrooms:"",
                actiontype:"",propertytype:"",price:"",image:"",isactive:"",created_at:""},
    isLoading: false,
    wasAdded:"",
    isactive:"",
},
reducers:{

},
extraReducers:{  
    [showProperties.pending.type]:(state,action)=>{
        state.isLoading = true
    },
 
    [showProperties.fulfilled.type]:(state,{payload})=>{
        state.data = payload
        state.isLoading = false
    },
    [showProperties.rejected.type]:(state,action)=>{
        state.isLoading=false
    },
 
    [showPropertyDetails.pending.type]:(state,action)=>{
        state.isLoading = true
    },
 
    [showPropertyDetails.fulfilled.type]:(state,{payload})=>{
        state.property = payload.property
        state.isLoading = false
    },
    [showPropertyDetails.rejected.type]:(state,action)=>{
        state.isLoading=false
    },
    

    [storeProperty.pending.type]:(state,action)=>{
        state.isLoading = true
    },
    [storeProperty.fulfilled.type]:(state,{payload})=>{
        state.wasAdded = payload.res
        state.isLoading = false
    },
    [storeProperty.rejected.type]:(state,action)=>{
        state.isLoading=false
    },
    [deleteProperty.pending.type]:(state,action)=>{
        state.isLoading = true
    },
    [deleteProperty.fulfilled.type]:(state,{payload})=>{
        state.isLoading = false
    },
    [deleteProperty.rejected.type]:(state,action)=>{
        state.isLoading=false
    },

}

})

export const sellerPropertyReducer=sellerPropertySlice.reducer

