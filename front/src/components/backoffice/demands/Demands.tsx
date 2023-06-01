import { CircularProgress, Grid, MenuItem, Select, Typography,Button,Input } from '@mui/material'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import Seller from '../../../models/Seller';
import { RootState,useAppDispatch } from '../../../store';
import { showSellers } from '../sellers/SellersApi';
import SearchIcon from '@mui/icons-material/Search';
import DemandsCard from './DemandsCard';
 

export default function Demands() {
  const [orderBy,setOrderBy]=React.useState<string>("ASC");
  const [customSearch,setFilterSearch]=React.useState<string>("");
  const dispatch=useAppDispatch();
  const demands=useSelector((state:RootState)=>state.seller.data);
  const isLoading=useSelector((state:RootState)=>state.seller.isLoading);
  useEffect(()=>{
    dispatch(showSellers({customSearch:customSearch,accepted:"0"}));
  },[dispatch]);
    

  return (
    <Grid container>

      <Grid item xs={4} >
      <Typography   sx={{fontSize:{xs:"18px"}}}>Demands</Typography>
      </Grid>
    
      <Grid item xs={4} display='flex '>
      <Select  
                label="ordredBy"
                name="orderBy"
                value={orderBy}
                onChange={(e)=>setOrderBy(e.target.value)}
                 defaultValue="newest" >
                  <MenuItem value="ASC">
                     order by: Newest
                  </MenuItem>
                  <MenuItem value="DESC">
                  order by: Oldest
                  </MenuItem>
        </Select>
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
              placeholder="search For demands (name,city)"
              value={ customSearch}
            ></Input>
      </Grid>
      </Grid>
      <Grid item xs={12}  mt={2} >
      {isLoading&&(<Grid item xs={12} mt={2} sx={{ justifyContent:"center",alignItems:"center",display:'flex'}} >
   
   <CircularProgress color='primary'  />
  </Grid>)
             }

      <Grid item xs={12} md={8}  mt={2} >

   {demands.map((demand:Seller)=><DemandsCard seller_id={demand.seller_id}  
                                                         fullname={demand.fullname}  
                                                         email={demand.email} photo={demand.photo} 
                                                         role={demand.role} rating={demand.rating} created_at={demand.created_at} city={demand.city} address={demand.address} type={demand.type}/> )}
    </Grid>
     </Grid>

    </Grid>

  )
}
