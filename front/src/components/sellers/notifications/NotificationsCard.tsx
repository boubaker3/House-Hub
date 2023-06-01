import { Avatar, Button, Card, Grid, Rating, Snackbar, Typography } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom';
import { ReviewResponse } from '../../../models/Review';
import { photos_url } from '../../../photos_url';
 



export default function NotificationsCard(props:ReviewResponse) {
 
  const user=JSON.parse(localStorage.getItem('user')??"");

  return (
        <Card
          sx={{
            boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
            borderRadius: "38px",
            padding: "20px 10px 10px 20px ",
            marginTop: "20px",
          }}
        >
    <Grid container  >
    <Grid item xs={2}  >
       <Avatar
      src={`${photos_url}${props.photo}`}
      sx={{
        borderRadius: "100%",
        width: " 80px" ,
        height: " 80px" ,
      }}
    ></Avatar>
    </Grid>
      <Grid item   md={10} display="flex" columnGap={1} mt={2} mb={2}>
      <Typography color='primary'  sx={{fontSize:{xs:"12px",md:"18px",} }}>
                    {props.fullname}  </Typography>
      <Typography   sx={{fontSize:{xs:"12px",md:"18px"}, color:'gray'}}>
                    has sent you a review</Typography>
   <Rating sx={{fontSize:{xs:"18px",md:"24px",lg:"32px"}}} color='primary'
    name="read-only" value={ props.rating } readOnly />
  
    </Grid> 
       
    <Grid item xs={12} display='flex' columnGap={2} justifyContent='center'   sx={{color:'gray'}}>
        <Typography sx={{ fontSize:{xs:"8px",md:"12px"}}}>ends at: {props.created_at.toLocaleString()}</Typography>
    </Grid>
    </Grid>

        </Card>
      
  )
}
