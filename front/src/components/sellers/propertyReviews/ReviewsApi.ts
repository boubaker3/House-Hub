import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../axios";
import { PropertyReview } from "../../../models/Review";
interface Check{
  client_id:string;
  property_id:string;
}
export const storeReview =createAsyncThunk("propetyReview/storeReview",async(review:PropertyReview)=>{
 
  const response=await api.post("storePropertyReviews", review) 
   return response.data;
});



export const showReviews =createAsyncThunk("propetyReview/showReviews",async(property_id:string)=>{
    const response = await api.get(`showPropertyReviews?property_id=${property_id}`)
        return response.data
                  
  });
  export const checkReviews =createAsyncThunk("propetyReview/checkReviews",async(check:Check)=>{
    const response = await api.get(`checkPropertyReviews?client_id=${check.client_id}&property_id=${check.property_id}`)
        return response.data
                  
  });