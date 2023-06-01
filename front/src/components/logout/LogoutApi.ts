import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../axios";
 
 
 
  export const logout =createAsyncThunk("logout/logout",async()=>{
 
    const response= await api.get(`logout`) 
     return response.data;
  });