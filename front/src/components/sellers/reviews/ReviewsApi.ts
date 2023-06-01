import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../axios";
import { Review } from "../../../models/Review";
interface Check{
  sender_id:string|null;
  receiver_id:string|null;
}
export const storeReview =createAsyncThunk("review/storeReview",async(review:Review)=>{
 
  const response=await api.post("storeReviews", review) 
   return response.data;
});



export const showReviews =createAsyncThunk("review/showReviews",async(receiver_id:string|null)=>{
    const response = await api.get(`showReviews?seller_id=${receiver_id}`)
        return response.data
                  
  });
  export const checkReviews =createAsyncThunk("review/checkReviews",async(check:Check)=>{
    const response = await api.get(`checkReviews?seller_id=${check.receiver_id}&client_id=${check.sender_id}`)
        return response.data
                  
  });