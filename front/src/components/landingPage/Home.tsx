import React from 'react'
import {Grid,Avatar,Typography,Box,Button, Divider } from "@mui/material";
import { Link } from 'react-router-dom';
export default function Home() {
  
    const HomeCover =  require('../../assets/covers/home.png');

    const welcomeimg = require('../../assets/covers/home.png');
    const cercle= require('../../assets/covers/cercle.png');
    const patternImg= require('../../assets/covers/BACK1.png');
    
  return (
    <>
     
    <Box sx={{ height: { xs: "80vh", md: '80vh' } }}>
        <Avatar src={cercle} sx={{ display: { xs: "none", md: "flex" }, width: { xs: "500px", md: "900px" }, height: { xs: "450px", md: "100vh" }, borderRadius: 0, position: "absolute", right: 0, top: 0 }}></Avatar>
        <Avatar src={welcomeimg} sx={{ width: { xs: "350px", md: "682px" }, height: { xs: "200px", md: "462px" }, borderRadius: 0, position: "absolute", right: { xs: "25px ", md: "50px" }, top: { xs: "90px ", md: "80px" }, }}></Avatar>
        <Grid container sx={{ margin: 0, marginTop: { xs: "30%", md:"0"} , padding: "20px", position:"absolute", top: "50%", msTransform: "translateY(-50%)", transform: "translateY(-50%)" }}>
          <Grid xs={12}><Typography variant='h2' sx={{   fontSize: { xs: "25px", md: "35px" }, fontWeight: 'bold', color: "#052851" }}>DARNA  REAL ESTATE
            <br /> FOR <span style={{ color: "#249E48" }}>RENT</span> & <span style={{ color: "#249E48" }}> SELL </span>HOUSES</Typography></Grid>
          <Grid xs={12} mt={4}><Typography variant='h6' sx={{   marginLeft: "25px", color: "#05285180", fontSize: "16px" }}> - for a good and trustable business  let’s work together.
            <br /> - first you must login your account to find our articles ,<br />   sign up if you don’t have account
          </Typography>
          </Grid>
          <Grid mt={4} xs={12}>
              <Button type='button' component={Link} to='/auth/login' variant='contained' 
 sx={{ backgroundColor: '#249E48', color: "white", padding: "4px 50px 4px 50px", borderRadius: "38px" }} >Login</Button>
  <Button component={Link} to='/auth/signup' variant='contained' 
 sx={{ marginLeft: "16px", backgroundColor: 'white', color: "#249E48", padding: "4px 50px 4px 50px", borderRadius: "38px", border: "#249E48 2px solid " }}>Signup</Button>
       
           </Grid>
          
        </Grid>
      </Box>
      
        
    
    {/* <Grid container mt={4}>
     
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
    </Grid> */}
    
    </>
  )
}