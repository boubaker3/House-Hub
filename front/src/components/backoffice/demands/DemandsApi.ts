import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../axios";
 

 

  export const acceptSeller =createAsyncThunk("seller/acceptSeller",async(seller_id:string )=>{
 
    const response = await api.post(`acceptSeller`,{seller_id:seller_id})
        return response.data;
                  
  });

  export const refuseSeller =createAsyncThunk("seller/refuseSeller",async(seller_id:string )=>{
 
    const response = await api.post(`refuseSeller`,{seller_id:seller_id})
        return response.data;
                  
  });