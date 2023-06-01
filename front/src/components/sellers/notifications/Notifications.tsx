import React, { useEffect } from 'react'
import { Button, Grid, Autocomplete , TextField ,Typography, Box, Dialog, DialogTitle, Divider   } from '@mui/material'
import { useSelector } from 'react-redux';
import { RootState,useAppDispatch } from '../../../store';
import NotificationsCard from './NotificationsCard';
import { ReviewResponse } from '../../../models/Review';
import { showReviewsAsNotifs } from './NotificationsApi';
  


export default function Notifications() {
 const dispatch=useAppDispatch();

  const notifications=useSelector((state:RootState)=>state.notification.data);
  const user=JSON.parse(localStorage.getItem("user")??"");

  useEffect(()=>{
    dispatch(showReviewsAsNotifs(user.userid));
  });
  return (
    <Grid container>
 
   
  <Grid item xs={12}>
      <Typography   sx={{fontSize:{xs:"18px" },mt:2}}>notifications</Typography>
      
</Grid>
 
      <Grid item xs={12} md={8}  mt={2} >

   {notifications.map((notification:ReviewResponse)=><NotificationsCard id={notification.id}  seller_id={notification.seller_id} client_id={notification.client_id}
                                                                        fullname={notification.fullname} photo={notification.photo} rating={notification.rating}
                                                                        review={notification.review} created_at={notification.created_at}
                                                                    />)}
    </Grid>
    </Grid>
  )
}
