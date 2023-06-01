import { Alert, Avatar, Button, Card, Grid, Menu, MenuItem, Snackbar, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState,useAppDispatch } from '../../../store';
import { deleteDemand, showDemands } from '../../sellers/demands/DemandsApi';
import { photos_url } from '../../../photos_url';
import { DemandResponse } from '../../../models/Demand';
import MoreVertIcon from '@mui/icons-material/MoreVert';

 

export default function DemandsCard(props:DemandResponse) {
 const dispatch=useAppDispatch();
 const wasDeleted=useSelector((state:RootState)=>state.demand.wasDeleted);
 const user=JSON.parse(localStorage.getItem('user')??"");
 const [status,setStatus]=useState("");
 const [openSnackbar,setOpenSnackbar]=useState<boolean>(false);
 const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
 const open = Boolean(anchorEl);
 
 const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
  setAnchorEl(event.currentTarget);
};
const handleClose = () => {
  setAnchorEl(null);
};
      useEffect(()=>{
        if(props.accepted=="1"){
          setStatus("accepted");
        }else if(props.accepted=="0"){
          setStatus("not accepted yet");
        }else{
          setStatus("refused");
        }
      });
const deleteIt=()=>{
  handleClose();
  dispatch(deleteDemand(props.id)).then(()=>{
    dispatch(showDemands({client_id:user.userid,seller_id:"null"}));
    setOpenSnackbar(true);
  })
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
    <Grid  container  justifyContent="end" display='flex' >
    <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
       <MoreVertIcon/>
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
  
        <MenuItem onClick={deleteIt}>delete</MenuItem>
        
        
      </Menu>
    </Grid>

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
    
    <Grid item xs={12} md={10} display="flex" columnGap={1} mt={2} mb={2}>
    <Typography   sx={{fontSize:{xs:"12px",md:"18px"}, color:'gray'}}>
                    you've sent an order to </Typography>
      <Typography color='primary'  sx={{fontSize:{xs:"12px",md:"18px",} }}>
                    {props.fullname} for </Typography>
      
                    <Typography color='primary'  sx={{fontSize:{xs:"12px",md:"18px",},
                   overflow: 'hidden',
                   textOverflow: 'ellipsis',
                   whiteSpace: 'nowrap', }}>
                    {props.title}  </Typography>
    </Grid>
    
  
    <Grid item xs={12} display='flex' columnGap={2} mt={2}  sx={{color:'gray'}}>
    <Typography sx={{ fontSize:{xs:"8px",md:"12px"}}}>Demand date: {new Date(props.created_at ).toLocaleString('en-US', { month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true }).replace(',', ' at')}</Typography>
        <Typography sx={{ fontSize:{xs:"8px",md:"12px"}}} color='primary'>status: {status}</Typography>
    </Grid>
  
    </Grid>
     
<Snackbar
  open={openSnackbar}
  onClose={()=>setOpenSnackbar(false)}
  message={wasDeleted}
  autoHideDuration={6000}/>
        </Card>
      
  )
}
