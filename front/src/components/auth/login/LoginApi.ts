import { createAsyncThunk } from "@reduxjs/toolkit";
import Auth from "../../../models/Auth";

import api from "../../../axios";

export const login =createAsyncThunk("auth/login",async(user:Auth)=>{
 
  const response = await api.post("login", user
                ) 
                  return response.data
                
});