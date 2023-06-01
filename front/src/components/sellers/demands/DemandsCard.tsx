import { Avatar, Button, Card, Grid, Snackbar, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState,useAppDispatch } from '../../../store';
import { showDemands, updateDemand } from './DemandsApi';
import { photos_url } from '../../../photos_url';
import { DemandResponse } from '../../../models/Demand';

 

export default function DemandsCard(props:DemandResponse) {
 const dispatch=useAppDispatch();
 const user=JSON.parse(localStorage.getItem('user')??"");
 const [status,setStatus]=useState("");
 const acceptIt=( )=>{
    dispatch(updateDemand({order_id:props.id,status:"1"}));
    dispatch(showDemands({seller_id:user.userid,client_id:"null"}));

    }
    const refuseIt=( )=>{
      dispatch(updateDemand({order_id:props.id,status:"-1"}));
      dispatch(showDemands({seller_id:user.userid,client_id:"null"}));

      }
      useEffect(()=>{
        if(props.accepted=="1"){
          setStatus("accepted");
        }else if(props.accepted=="0"){
          setStatus("not accepted yet");
        }else{
          setStatus("refused");
        }
      });
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
                    has ordered </Typography>
                    <Typography color='primary'  sx={{fontSize:{xs:"12px",md:"18px",},
                   overflow: 'hidden',
                   textOverflow: 'ellipsis',
                   whiteSpace: 'nowrap', }}>
                    {props.title}  </Typography>
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
        <Typography sx={{ fontSize:{xs:"8px",md:"12px"}}} color='primary'>status: {status}</Typography>
    </Grid>
    </Grid>

        </Card>
      
  )
}
