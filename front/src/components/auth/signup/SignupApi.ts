import { createAsyncThunk } from "@reduxjs/toolkit";
import User from "../../../models/User";
import api from "../../../axios";

export const signup =createAsyncThunk("auth/signup",async(user:User)=>{

  const formData=new FormData();
  formData.append('fullname',user.fullname);
  formData.append('email',user.email);
  formData.append('password',user.password);
  formData.append('photo',user.photo);
  formData.append('type',user.type);
  formData.append('phone',user.phone);
  formData.append('city',user.city);
  formData.append('address',user.address);
  formData.append('role',user.role);
  formData.append('bio',user.bio);
  const response = await api.post("signup", formData
                ) 
                  return response.data
                
});