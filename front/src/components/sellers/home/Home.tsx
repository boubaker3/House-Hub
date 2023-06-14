import React, { useEffect } from 'react'
import { Box, Button, CircularProgress, Grid, Input, Dialog, MenuItem, Select, Typography, DialogTitle  } from '@mui/material'
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import Filter from '../../../models/Filter';
import { useSelector } from 'react-redux';
import { RootState,useAppDispatch } from '../../../store';
import PropertyCard from './PropertyCard';
import { PropertyResponse } from '../../../models/Property';
import { showProperties } from './PropertyApi';


 
export default function Home() {
  const properties=useSelector((state:RootState)=>state.sellerProperty.data);
  const isLoading=useSelector((state:RootState)=>state.sellerProperty.isLoading);
  const user=JSON.parse(localStorage.getItem("user")??"");

  const dispatch=useAppDispatch();
  useEffect(()=>{
    dispatch(showProperties({seller_id:user.userid,orderBy:"ASC",bedrooms:"null",
    city:'null',actiontype:'null',propertytype:'null',area:"null",customSearch:"null"}));
  },[dispatch]);
    

  return (
    <Grid container>
       
      <Grid item xs={12}>
      <Typography   sx={{fontSize:{xs:"18px" },mt:4}}>All your properties</Typography>
      </Grid>
       
      
      <Grid item xs={12} sx={{display:{md:'flex'}}}>
       {!isLoading?
       properties.map((property:PropertyResponse)=><Grid item xs={12} md={6} lg={3} ml={2}>
        <PropertyCard fullname={property.fullname} photo={property.photo} userid={property.userid} title={property.title}  property_seller_id={property.property_seller_id}
          property_id={property.property_id} image={property.image} 
          propertytype={property.propertytype} price={property.price} area={property.area}
           bedrooms={property.bedrooms} city={property.city} actiontype={property.actiontype} 
         address={property.address} rating={property.rating} created_at={property.created_at}/></Grid>)
       

       :(<Grid item xs={12} mt={2} sx={{ justifyContent:"center",alignItems:"center",display:'flex'}} >
   
   <CircularProgress color='primary'  />
  </Grid>)
             }
        
      </Grid>

      
    </Grid>
  )
}
