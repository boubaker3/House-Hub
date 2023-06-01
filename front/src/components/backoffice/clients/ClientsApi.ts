import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../axios";
 
export const showClients =createAsyncThunk("client/showClients",async(customSearch?:string)=>{
 
    const response = await api.get(`showClients?customSearch=${customSearch}`)
        return response.data
                  
  });

export const deleteClient =createAsyncThunk("client/deleteClient",async(client_id:string)=>{
 
    const response = await api.get(`deleteClient?client_id=${client_id}`)
        return response.data            
  });


 