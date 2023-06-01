import React, { useEffect } from 'react'
import { Box, Button, CircularProgress, Grid, Input, Dialog, MenuItem, Select, Typography, DialogTitle  } from '@mui/material'
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import Filter from '../../../models/Filter';
import SellerCard from './SellerCard';
import { useSelector } from 'react-redux';
import { RootState,useAppDispatch } from '../../../store';
import { showSellers } from './SellersApi';
import Seller from '../../../models/Seller';
 
 


 

export default function Mentors() {

  const [customSearch,setFilterSearch]=React.useState<string>("");
  const sellers=useSelector((state:RootState)=>state.seller.data);
  const isLoading=useSelector((state:RootState)=>state.seller.isLoading);
  const dispatch=useAppDispatch();
  useEffect(()=>{
    dispatch(showSellers({customSearch,accepted:"1"}));
  },[dispatch,customSearch]);
    

  const [open, setOpen] = React.useState<boolean>(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  return (
    <Grid container>
       
      <Grid item xs={12}>
      <Typography   sx={{fontSize:{xs:"18px"},mt:4}}>all sellers on the platform</Typography>
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
              placeholder="search For sellers"
              value={ customSearch}
            ></Input>
      </Grid>
      </Grid>
     
      <Grid item xs={12} sx={{display:{md:'flex'}}}>
       {!isLoading?
       sellers.map((seller:Seller)=><Grid item xs={12} md={6} lg={3} >
        <SellerCard fullname={seller.fullname} email={seller.email}
       seller_id={seller.seller_id} photo={seller.photo} type={seller.type}
         city={seller.city} role={seller.role} address={seller.address} rating={seller.rating} created_at={seller.created_at}/></Grid>)
       

       :(<Grid item xs={12} mt={2} sx={{ justifyContent:"center",alignItems:"center",display:'flex'}} >
   
   <CircularProgress color='primary'  />
  </Grid>)
             }
        
      </Grid>

       
    </Grid>
  )
}
