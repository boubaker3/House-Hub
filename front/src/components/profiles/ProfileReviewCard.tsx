import { Avatar, Box, Card, CardContent, Chip, Rating, Typography } from '@mui/material'
import React from 'react'
import { ReviewResponse } from '../../models/Review'
import { photos_url } from '../../photos_url'

export default function ProfileReviewCard(props:ReviewResponse) {
  return (
    <Card
    className="Card"
    sx={{
      width: { xs: "300px", sm: "300px" },
      boxShadow: "rgba(149, 157, 165, 0.5) 0px 8px 24px",
      borderRadius: "38px",
      padding: "10px",
      marginBottom: "50px",
      justifyContent:"center",
      alignItems:"center"
    }}
  >
    <Box >
    
    <Avatar
      src={`${photos_url}${props.photo}`}
      sx={{
        borderRadius: "100%",
        width: " 80px",
        height: "80px",
        margin: "0 auto",
      }}
    ></Avatar>
     
        </Box>

        <Typography
      sx={{
        textAlign:"center",
        fontFamily: "Montserrat",
        fontWeight: "bold",
        fontSize: "18px",
        marginTop:"5px"
      }}
      gutterBottom
      variant="h5"
      component="div"
    >
      {props.fullname}
    </Typography>
    <CardContent>
      <Box> 
    <Rating sx={{fontSize:{xs:"18px",md:"24px",lg:"32px"} }} color='primary' name="read-only" value={props.rating} readOnly />
        <Typography
          sx={{
            fontFamily: "Montserrat",
            color: "gray",
            fontSize: "16px",
            textAlign:"center"
          }}
          gutterBottom
          variant="h6"
          component="div"
        >
          {props.review}
        </Typography>
      </Box>
      
    </CardContent>
  </Card>
  )
}
