import { CircularProgress, Grid, MenuItem, Select, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { DemandResponse } from '../../../models/Demand';
import { RootState,useAppDispatch } from '../../../store';
import { showDemands } from '../../sellers/demands/DemandsApi';  
import DemandsCard from './DemandsCard';
 

export default function Demands() {
  const [orderBy,setOrderBy]=React.useState<string>("ASC");
  const demands=useSelector((state:RootState)=>state.demand.data);
  const isLoading=useSelector((state:RootState)=>state.demand.isLoading);
  const dispatch=useAppDispatch();
  const user=JSON.parse(localStorage.getItem('user')??"");
  useEffect(()=>{
    dispatch(showDemands({seller_id:"null",client_id:user.userid}));
  },[dispatch,orderBy,])

  return (
    <Grid container>

      <Grid item xs={4} >
      <Typography   sx={{fontSize:{xs:"12px",md:"18px"}}}>Demands</Typography>
      </Grid>
      
     

      <Grid item xs={12}  mt={2} >
      {isLoading&&(<Grid item xs={12} mt={2} sx={{ justifyContent:"center",alignItems:"center",display:'flex'}} >
   
   <CircularProgress color='primary'  />
  </Grid>)}

      <Grid item xs={12} md={8}  mt={2} >

   {demands&&demands.map((demand:DemandResponse)=><DemandsCard id={demand.id} sender_id={demand.sender_id}
                                                        receiver_id={demand.receiver_id}
                                                        property_id={demand.property_id}
                                                        title={demand.title}
                                                         fullname={demand.fullname}  
                                                         photo={demand.photo}
                                                         accepted={demand.accepted}     
                                                        created_at={demand.created_at} 
                                                      /> )}
    </Grid>
     </Grid>

    </Grid>

  )
}
