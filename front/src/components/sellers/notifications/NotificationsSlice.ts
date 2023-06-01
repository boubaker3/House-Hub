import { createSlice} from "@reduxjs/toolkit"; 
import { showReviewsAsNotifs} from "./NotificationsApi";
 



export const notificationsSlice =createSlice({
 name:"notification",
 initialState:{ 
    data : [],
    isLoading: false,
},
reducers:{

},
extraReducers:{
    
  
    [showReviewsAsNotifs.pending.type]:(state,action)=>{
        state.isLoading = true
    },
 
    [showReviewsAsNotifs.fulfilled.type]:(state,{payload})=>{
        state.data = payload.notifications
        state.isLoading = false
    },
    [showReviewsAsNotifs.rejected.type]:(state,action)=>{
        state.isLoading=false
    },
}

})

export const notificationsReducer=notificationsSlice.reducer

