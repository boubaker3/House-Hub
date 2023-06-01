import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../axios";
interface Filter{
    customSearch?:string,
    accepted:string
};
 

export const showSellers =createAsyncThunk("seller/showSellers",async(filter:Filter)=>{
    const response = await api.get(`showSellers?customSearch=${filter.customSearch}&accepted=${filter.accepted}`)
        return response.data
                  
  });

  export const deleteSeller =createAsyncThunk("seller/deleteSeller",async(seller_id:string)=>{
    const response = await api.get(`deleteSeller?seller_id=${seller_id}`)
        return response.data            
  });


 