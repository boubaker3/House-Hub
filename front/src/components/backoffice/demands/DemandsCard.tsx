import { Avatar, Button, Card, Grid, Snackbar, Typography } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState,useAppDispatch } from '../../../store';
import { photos_url } from '../../../photos_url';
import { acceptSeller, refuseSeller } from './DemandsApi';
import Seller from '../../../models/Seller';
import { showSellers } from '../sellers/SellersApi';

 

export default function DemandsCard(props:Seller) {
 const dispatch=useAppDispatch();

 const acceptIt=( )=>{
    dispatch(acceptSeller(props.seller_id));
    dispatch(showSellers({accepted:"0"}));

    }
    const refuseIt=( )=>{
      dispatch(refuseSeller(props.seller_id));
      dispatch(showSellers({accepted:"0"}));

      }
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
      <Typography color='primary'  sx={{fontSize:{xs:"12px",md:"18px",} }}>
                    {props.fullname}  </Typography>
      <Typography   sx={{fontSize:{xs:"12px",md:"18px"}, color:'gray'}}>
                    sent a demand to join the platform</Typography>
      
    </Grid>
    
    <Grid item xs={6} md={2}   columnGap={2} sx={{display:{xs:"flex",md:'block'}}}  >
    <Button
       onClick={acceptIt}
        disableElevation
        variant="contained"
        sx={{
          width:"60%",
        
          color: "white",
          borderRadius: "38px",
          fontFamily: "Montserrat",
          fontSize: { xs: "8px",md:"12px" },
          textAlign: "center",
        }}
      >
       accept 
      </Button>
      <Button
      onClick={refuseIt}
        disableElevation
        variant="contained"
        sx={{
            width:"60%",
          color: "white",
          borderRadius: "38px",
          fontFamily: "Montserrat",
          fontSize: { xs: "8px",md:"12px" },
          marginTop:{md:"25px"},
          textAlign: "center",
          backgroundColor:"#AA4444"
        }}
      >
     refuse 
      </Button>
    </Grid>
    <Grid item xs={12} display='flex' columnGap={2}   sx={{color:'gray'}}>
        <Typography sx={{ fontSize:{xs:"8px",md:"12px"}}}>Demand date: {new Date(props.created_at ).toLocaleString('en-US', { month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true }).replace(',', ' at')}</Typography>
    </Grid>
    </Grid>

        </Card>
      
  )
}
