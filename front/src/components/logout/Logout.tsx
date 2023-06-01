import { CircularProgress, Grid, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState,useAppDispatch } from '../../store';
import { logout } from './LogoutApi';
export default function Logout() {
  const res=useSelector((state:RootState)=>state.logout.res);
  const dispatch=useAppDispatch();
  const navigate=useNavigate();
  useEffect(()=>{
    dispatch(logout()).then((result)=>{
      if(result.payload.loggedout==true){
        localStorage.clear();
        navigate("/");
      }
    });
  },[]);
  return (
    <Grid container  >
     <Grid item xs={12}  >
      <Typography sx={{textAlign:"center"}}>Logging out...</Typography>
      </Grid>
      <Grid item xs={12} justifyContent="center" display='flex' mt={2}>
      <CircularProgress  color='primary'  />
      </Grid>
      <Grid item xs={12}  >
      <Typography sx={{textAlign:"center"}}>{res}</Typography>
      </Grid>
    </Grid>
  )
}
