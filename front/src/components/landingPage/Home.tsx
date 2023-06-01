import React from 'react'
import {Grid,Avatar,Typography,Box,Button} from "@mui/material";
import { Link } from 'react-router-dom';
export default function Home() {
  
    const HomeCover =  require('../../assets/covers/home.png');

  return (
    <Grid container mt={4}>
     
<Grid item xs={12} md={6}> 
<Avatar sx={{width:"100%",height:"auto",borderRadius:0,}} src={HomeCover}></Avatar>
 </Grid>
<Grid xs={12} md={6}  container justifyContent="center"  >
  
<Box sx={{ fontSize: {xs:"18px",md:"32px"},fontWeight:"bold"}}>
<Typography sx={{   fontSize: "inherit !important" ,mt:4 }} color="primary">
    House Hub Real estate
  </Typography>
  <Grid container display="flex" columnGap={2}   >
  <Typography sx={{   fontSize: "inherit !important"  }}  >
    For
  </Typography>
  <Typography sx={{   fontSize: "inherit !important"  }} color="secondary">
    Renting and Selling
  </Typography>
  <Typography sx={{   fontSize: "inherit !important"  }}  >
    Houses
  </Typography>
  </Grid>
  <Typography sx={{fontFamily:"sans-serif",fontSize:{xs:"12px",md:"14px"},color:"gray",mt:4}}>
  -for a good and trustable business let’s work together<br/>
  -first you must login your account to find our articles 
  ,<br/> -sign up if you don’t have account

  </Typography>
  <Grid display="flex" justifyContent="center" columnGap={4} mt={8}>
  <Button component={Link} to='/auth/login' variant='contained' color='secondary' 
  sx={{color:"white", fontSize: {xs:"12px",md:"16px"},borderRadius:"16px",p:"8px 48px 8px 48px" }}>Login</Button>
  <Button component={Link} to='/auth/signup' variant='contained' 
  sx={{color:"white", fontSize: {xs:"12px",md:"16px"},borderRadius:"16px",p:"8px 48px 8px 48px",}}>Signup</Button>
</Grid>

</Box> 
</Grid>
    </Grid>
  )
}
