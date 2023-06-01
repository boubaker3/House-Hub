import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../axios";
import { Msg } from "../../models/Msg";
interface MsgFilter{
sender_id:string|null;
receiver_id:string|null;
};
export const sendMsgs =createAsyncThunk("chat/sendMsgs",async(msg:Msg)=>{
  const formData=new FormData();
  formData.append("file",msg.file);
  formData.append("msg",msg.msg);
  formData.append("sender_id",msg.sender_id);
  formData.append("receiver_id",msg.receiver_id);
  return await api.post("storeMsgs", formData) 
  .catch(error=>console.log(error))                  
});

export const showMsgs =createAsyncThunk("chat/showMsgs",async(msg?:MsgFilter)=>{
 
    const response = await api.get(`showMsgs?sender_id=${msg?.sender_id}&receiver_id=${msg?.receiver_id}`)
        return response.data
                  
  });

  export const updateStatus =createAsyncThunk("chat/updateStatus",async(msg?:MsgFilter)=>{
 
    const response = await api.post(`updateStatus?sender_id=${msg?.sender_id}&receiver_id=${msg?.receiver_id}`)
        return response.data
                  
  });
 
  export const showMessagedUsers =createAsyncThunk("chat/showMessagedUsers",async(userid:string)=>{
 
    const response = await api.get(`showMessagedUsers?userid=${userid}`)
        return response.data
                  
  });