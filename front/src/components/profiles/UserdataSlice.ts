import { createSlice} from "@reduxjs/toolkit";
import {getUserdata} from "./UserdataApi";
import {updatePhoto} from "./UserdataApi";
import { updateProfile } from "./UserdataApi";



export const userDataSlice =createSlice({
 name:"userdata",
 initialState:{ 
    data : {id: 1,
    userid:"" ,
    fullname: "",
    email: "",
    photo: "",
    role: "",
    created_at: "",
    updated_at: "",
    seller_id: '',
     phone: '',
    city: "",
    address: "",
    bio: "",
    accepted: "",
    rating: ""},
    wasUpdated:'',
    isLoading: false,
},
reducers:{

},
extraReducers:{
    

    [getUserdata.pending.type]:(state,action)=>{
        state.isLoading = true
    },
 
    [getUserdata.fulfilled.type]:(state,{payload})=>{
        state.data = payload.userdata
        state.isLoading = false
    },
    [getUserdata.rejected.type]:(state,action)=>{
        state.isLoading=false
    },

    [updatePhoto.pending.type]:(state,action)=>{
        state.isLoading = true
    },
 
    [updatePhoto.fulfilled.type]:(state,{payload})=>{
        state.wasUpdated = payload.res
        state.isLoading = false
    },
    [updatePhoto.rejected.type]:(state,action)=>{
        state.isLoading=false
    },

    [updateProfile.pending.type]:(state,action)=>{
        state.isLoading = true
    },
 
    [updateProfile.fulfilled.type]:(state,{payload})=>{
        state.wasUpdated = payload.res
        state.isLoading = false
    },
    [updateProfile.rejected.type]:(state,action)=>{
        state.isLoading=false
    },

    
}

})

export const userDataReducer=userDataSlice.reducer

