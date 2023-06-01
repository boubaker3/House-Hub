import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../axios";
 
  export const showReviewsAsNotifs =createAsyncThunk("notification/showReviewsAsNotifs",async(seller_id:string)=>{
    const response = await api.get(`reviewsAsNotifs?seller_id=${seller_id}`)
        return response.data
                  
  });

 