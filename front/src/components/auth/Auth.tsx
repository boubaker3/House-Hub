import React from 'react'
import { Tab, Box, Grid, Typography ,Avatar} from '@mui/material'
import { TabContext, TabList } from "@mui/lab";
import { Link, Outlet } from "react-router-dom";
const logo=require('../../assets/logo2.png');
const authCover=require('../../assets/covers/reg2.png');
export default function Auth() {
    const [value, setValue] = React.useState<string>("1");
    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
      setValue(newValue);
 };
  return (
    <Box >
    <Grid container >
        <Grid item md={6}  sx={{ backgroundColor: 'secondary.main',height:'100vh',justifyContent:'center'
            ,alignItems:"center",display:{xs:'none',lg:'grid'},position:'relative'}}>
      <Box sx={{position:"fixed"}}> 
        <Grid item md={6}  sx={{ backgroundColor: 'secondary.main',height:'100vh',justifyContent:'center'
            ,alignItems:"center",display:{xs:'none',lg:'grid'} ,position:'relative'}}>
     
            <Grid item xs={12}>  
            <Avatar sx={{borderRadius:0,width:"150px",height:'auto',margin:"auto"}} src={logo}></Avatar>
            <Typography sx={{textAlign:'center',color:"white"}} variant='h4'>Darna</Typography>
            </Grid>  
            <Grid item xs={12}>  
            <Avatar  sx={{borderRadius:0,width:"60%",height:'auto',margin:"auto"}} src={authCover}></Avatar>
            </Grid>
            <Grid  sx={{ marginLeft:"64px",color:"white",fontSize:"32px"}}  > 
            <Typography variant='h3' sx={{fontSize:"inherit !important"}}>Hello friend, </Typography>
            <Typography variant='h3' sx={{fontSize:"inherit !important"}}> Enter your personal infos </Typography>
            <Typography variant='h3' sx={{fontSize:"inherit !important"}}> to start your journey with us</Typography>
            </Grid>
            </Grid>
            </Box>
        
        </Grid>

        <Grid item xs={12} sx={{display:{xs:'block',lg:'none'}}}> 
           
            <Avatar sx={{borderRadius:0,width:"150px",height:'auto',margin:"auto"}} src={logo}></Avatar>
            <Typography sx={{textAlign:'center' }} variant='h4'>House Hub</Typography>
            </Grid> 
    <Grid item md={6} sx={{margin:"auto",padding:"24px"}}>
          <Box  sx={{ justifyContent:"center",alignItems:"center",display:'flex'}} >

          <TabContext value={value} >
            <TabList
              TabIndicatorProps={{
                sx: { height: "100%", borderRadius: "38px" },
              }}
              onChange={handleChange}
            >
              <Tab
                component={Link}
                to="/auth/login"
                onClick={() => {
                }}
                sx={{
                  width: {
                    xs: "200px",
                    sm: "250px",
                    md: "250px",
                    lg: "250px",
                    xl: "250px",
                  },
                  zIndex: "100", 
                  fontSize: "18px",
                  fontWeight: "bold",
                  color: "black",
                    "&.Mui-selected": {
                      color: "white"
                    }
                }}
                label="Login"
             value="1" />

              <Tab
                component={Link}
                to="/auth/signup"
                onClick={() => {
                }}
                sx={{
                  width: {
                    xs: "200px",
                    sm: "250px",
                    md: "250px",
                    lg: "250px",
                    xl: "250px",
                  },
                  zIndex: "100",
                  fontSize: "18px",
                  fontWeight: "bold",
                  color: "black",
                    "&.Mui-selected": {
                      color: "white"
                    }
                }}
                label="Signup"
             value="2" />
            </TabList>
          </TabContext> 
          </Box>

          <Outlet/> 
    </Grid>
      

    </Grid>
    </Box>

  )
}
