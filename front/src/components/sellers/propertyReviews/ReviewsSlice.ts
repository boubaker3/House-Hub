import { createSlice} from "@reduxjs/toolkit";
import {showReviews} from "./ReviewsApi";
import {storeReview} from "./ReviewsApi";
import {checkReviews} from "./ReviewsApi";
 
 

export const propertyReviewSlice =createSlice({
 name:"propertyReview",
 initialState:{ 
    data : [],
    wasAdded:"",
    checked:false,
    isLoading: false,
},
reducers: {
    toggleChecked: (state) => {
      state.checked = !state.checked;
    }
},
extraReducers:{ 
    
    [storeReview.pending.type]:(state,action)=>{
        state.isLoading = true
    },
    [storeReview.fulfilled.type]:(state,{payload})=>{
        state.wasAdded = payload.res
        state.isLoading = false
    },
    [storeReview.rejected.type]:(state,action)=>{
        state.isLoading=false
    },
    
    

    [showReviews.pending.type]:(state,action)=>{
        state.isLoading = true
    },
 
    [showReviews.fulfilled.type]:(state,{payload})=>{
        state.data = payload.reviews
        state.isLoading = false
    },
    [showReviews.rejected.type]:(state,action)=>{
        state.isLoading=false
    },

    [checkReviews.pending.type]:(state,action)=>{
        state.isLoading = true
    },
 
    [checkReviews.fulfilled.type]:(state,{payload})=>{
        state.checked = payload.checked
        state.isLoading = false
    },
    [checkReviews.rejected.type]:(state,action)=>{
        state.isLoading=false
    },
}

})

export const propertyReviewReducer=propertyReviewSlice.reducer
export const { toggleChecked } = propertyReviewSlice.actions;
