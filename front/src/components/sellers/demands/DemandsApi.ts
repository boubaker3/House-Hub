import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../axios";
import { Demand } from "../../../models/Demand";
interface DemandFilter{
  seller_id:string
  client_id:string;
  };

  interface DemandUpdate{
    order_id:number
    status:string;
};

export const showDemands =createAsyncThunk("demand/showDemands",async(demandFilter:DemandFilter)=>{
    const response = await api.get(`showOrders?seller_id=${demandFilter.seller_id}&
                                    client_id=${demandFilter.client_id}`)
        return response.data
                  
});

export const storeDemand =createAsyncThunk("demand/storeDemand",async(demand:Demand)=>{
  const response = await api.post(`storeOrder`,demand)
      return response.data
});

export const updateDemand =createAsyncThunk("demand/updateDemand",async(demandUpdate:DemandUpdate)=>{
  const response = await api.post(`updateOrder`,demandUpdate)
      return response.data
});

export const deleteDemand =createAsyncThunk("demand/deleteDemand",async(order_id:number)=>{
  const response = await api.post(`deleteOrder`,{order_id:order_id})
      return response.data
});