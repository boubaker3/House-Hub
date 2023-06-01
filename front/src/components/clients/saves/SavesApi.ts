import { createAsyncThunk } from "@reduxjs/toolkit";

import api from "../../../axios";
import Save from "../../../models/Save";

export const storeSave =createAsyncThunk("saves/storeSave",async(save:Save)=>{
 
  const response = await api.post("storeSave", save  ) 
                  return response.data
                
});

export const showSaves =createAsyncThunk("saves/showSaves",async(client_id:string)=>{
 
  const response = await api.get(`showSaves?client_id=${client_id}` ) 
                  return response.data
                
});