import React, { useEffect } from 'react'
import { Box, Button, CircularProgress, Grid, Input, Dialog, MenuItem, Select, Typography, DialogTitle  } from '@mui/material'
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import Filter from '../../../models/Filter';
import ClientCard from './ClientCard';
import { useSelector } from 'react-redux';
import { RootState,useAppDispatch } from '../../../store';
import { showClients } from './ClientsApi';
import Mentor from '../../../models/Seller';
import Client from '../../../models/Client';
 
 

 



export default function Mentees() {

  const [customSearch,setFilterSearch]=React.useState<string>("");
  const clients=useSelector((state:RootState)=>state.client.data);
  const isLoading=useSelector((state:RootState)=>state.client.isLoading);
  const [open, setOpen] = React.useState<boolean>(false);
  const dispatch=useAppDispatch();
  useEffect(()=>{
    dispatch(showClients(customSearch)).then(()=>{
      handleClose();
    });
  },[dispatch,customSearch,open]);
   
 

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  return (
    <Grid container>
      
      <Grid item xs={12}>
      <Typography   sx={{fontSize:{xs:"18px"},mt:4}}>all clients on the platform</Typography>
      </Grid>
      <Grid container mt={4} justifyContent="center">
      <Grid item xs={12}  md={6}  sx={{ backgroundColor:'#F0F0F0',p:1,borderRadius:"32px",display:'flex'}}>
        <Button >
        <SearchIcon/>
        </Button>
           <Input
           fullWidth  
            
           onChange={(e)=>setFilterSearch(e.target.value)}
              name="customSearch"
              disableUnderline={true} 
              placeholder="search For clients"
              value={ customSearch}
            ></Input>
      </Grid>
      </Grid>
       
      <Grid item xs={12} sx={{display:{md:'flex'}}}>
       {!isLoading?
       clients.map((clientItem:Client)=><Grid item xs={12} md={6} lg={3} >
        <ClientCard fullname={clientItem.fullname} email={clientItem.email}
       client_id={clientItem.client_id} photo={clientItem.photo}  
       address={clientItem.address} city={clientItem.city} role={clientItem.role} /></Grid>)
       

       :(<Grid item xs={12} mt={2} sx={{ justifyContent:"center",alignItems:"center",display:'flex'}} >
   
   <CircularProgress color='primary'  />
  </Grid>)
             }
        
      </Grid>

       
    </Grid>
  )
}
