import { Avatar, Button, Card, Grid, Rating, Snackbar, Typography } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState,useAppDispatch } from '../../../store';
import StarIcon from '@mui/icons-material/Star';
import { ReviewResponse } from '../../../models/Review';
import { photos_url } from '../../../photos_url';
export default function ReviewsCard(props:ReviewResponse) {
 const dispatch=useAppDispatch();
 
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
    
    <Grid item xs={12} md={8} display="flex" columnGap={1} mt={2} mb={2}>
     
    <Typography   sx={{fontSize:{xs:"12px",md:"18px"}, color:'gray'}}>
                    you have a new feedback from </Typography>
     <Typography color='primary'  sx={{fontSize:{xs:"12px",md:"18px",} }}>
                    {props.fullname}  </Typography>
     <Rating color='primary' name="read-only" value={props.rating} readOnly />

      
    </Grid>
     
    <Grid item xs={12} display='flex' columnGap={2} justifyContent='center'  sx={{color:'gray'}}>
        <Typography sx={{ fontSize:{xs:"12px",md:"18px"}}}>{props.review}</Typography>
    </Grid>
    </Grid>

        </Card>
      
  )
}
