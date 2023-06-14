import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../axios";
import {Property} from "../../../models/Property";
  
interface PropertyFilter{
    customSearch?:string;
    seller_id?:string;
    bedrooms?:string;
    city?:string;
    area?:string;
    actiontype?:string;
    propertytype?:string;
    orderBy?:string;
}
export const showProperties =createAsyncThunk("property/showProperties",async(propertyFilter:PropertyFilter)=>{
    const response = await api.get(`showProperties?seller_id=${propertyFilter.seller_id}&city=${propertyFilter.city}
                            &bedrooms=${propertyFilter.bedrooms}&area=${propertyFilter.area}&actiontype=${propertyFilter.actiontype}
                            &propertytype=${propertyFilter.propertytype}&customSearch=${propertyFilter.customSearch}&orderBy=${propertyFilter.orderBy}`)
        return response.data
                  
});

export const showPropertyDetails =createAsyncThunk("property/showPropertyDetails",async(property_id:string)=>{
    const response = await api.get(`showPropertyDetails?property_id=${property_id}`)
        return response.data
                  
});

 

export const storeProperty =createAsyncThunk("property/storeProperty",async(property:Property)=>{
    const formData=new FormData();
  formData.append('property_seller_id',property.property_seller_id);
  formData.append('title',property.title);
  formData.append('propertytype',property.propertytype);
  formData.append('actiontype',property.actiontype);
  formData.append('address',property.address);
  formData.append('city',property.city);
  formData.append('area',property.area);
  formData.append('bedrooms',property.bedrooms);
  formData.append('image',property.image);
  formData.append('price',property.price);
  const response = await api.post(`storeProperty`,formData)
      return response.data
});

export const deleteProperty =createAsyncThunk("property/deleteProperty",async(property_id:string)=>{
    const response = await api.get(`deleteProperty?property_id=${property_id}  `)
        return response.data
                  
});