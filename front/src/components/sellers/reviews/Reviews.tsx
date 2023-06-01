import { CircularProgress, Grid, MenuItem, Select, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { RootState,useAppDispatch } from '../../../store';
import { showReviews } from './ReviewsApi';
import { ReviewResponse } from '../../../models/Review';
import ReviewsCard from './ReviewsCard';

export default function Reviews() {
  const dispatch=useAppDispatch();
  const reviews=useSelector((state:RootState)=>state.review.data);
  const isLoading=useSelector((state:RootState)=>state.review.isLoading);
  const user=JSON.parse(localStorage.getItem('user')??"");
  useEffect(()=>{
    dispatch(showReviews(user.userid));
    
  },[dispatch])

  return (
    <Grid container>

      <Grid item xs={12} >
      <Typography   sx={{fontSize:{xs:"18px" }}}>your reviews</Typography>
      </Grid>
      
     
      {isLoading&&(<Grid item xs={12} mt={2} sx={{ justifyContent:"center",alignItems:"center",display:'flex'}} >
   
   <CircularProgress color='primary'  />
  </Grid>)
             }

      <Grid item xs={12} md={8}  mt={2} display="flex">

   {reviews.map((review:ReviewResponse)=><ReviewsCard id={review.id} client_id={review.client_id} seller_id={review.seller_id}
                                                         review={review.review}  rating={review.rating} fullname={review.fullname}
                                                          photo={review.photo} created_at={review.created_at} 
                                                          />)}
    </Grid>

    </Grid>

  )
}
