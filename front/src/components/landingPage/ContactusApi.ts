import { createAsyncThunk } from "@reduxjs/toolkit";

import api from "../../axios";
import Contact from "../../models/Contact";

export const storeContact =createAsyncThunk("contact/storeContact",async(contact:Contact)=>{
 
  const response = await api.post("contactus", contact  ) 
                  return response.data
                
});