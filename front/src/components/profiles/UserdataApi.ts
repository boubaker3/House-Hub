import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../axios";
import UpdatedUser from "../../models/UpdatedUser";
import User from "../../models/User";
interface UpdatedPhoto{
    userid:string ;
    photo:string;
};
export const getUserdata =createAsyncThunk("userdata/getUserdata",async(userid:string|null)=>{
 
    const response = await api.get(`getUserdata?userid=${userid}`)
        return response.data;
                  
  });
  export const updatePhoto =createAsyncThunk("userdata/updatePhoto",async(updatedPhoto:UpdatedPhoto)=>{
 const formData=new FormData();
 formData.append('photo',updatedPhoto.photo);
 formData.append('userid',updatedPhoto.userid);
    const response = await api.post(`updatePhoto`,formData)
        return response.data;
                  
  });

  export const updateProfile =createAsyncThunk("userdata/updateProfile",async(user:UpdatedUser)=>{
     
      return await api.post(`updateUser`,user)
          .then(response=>response.data).catch(error=>console.log(error))
                     
     });