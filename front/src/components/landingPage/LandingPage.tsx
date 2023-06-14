import React from 'react'
import {Grid,Box,Tabs,Tab,Typography,Avatar} from "@mui/material";
import Home from './Home';
import Reviews from './Reviews';
import Contact from './Contact';
import Services from './Services';
import Faq from './Faq';
import Footer from './Footer';
import WhyChooseUs from './WhyChooseUs';
  function a11yProps(index: number) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }
  

 export default function LandingPage() {
    const [value, setValue] = React.useState(0);
    const Logo =  require('../../assets/logo.png');
    const menuData=[{title:"Home"},{title:"Services"},{title:"Reviews"},{title:"Contact us"},{title:"FAQs"},]
    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
      setValue(newValue);
    };
  return (
     
<Grid container rowGap={2}  p={2} id='Home'> 
  <Grid item xs={12} md={4} lg={6} >
  <Box display="flex" alignItems="center" >
      <Avatar src={Logo} sx={{borderRadius:0}} />
      <Typography variant="h6" component="h2" sx={{marginLeft: "1rem"}} color='primary'>DAR-NA</Typography>
    </Box>
  </Grid>
  <Grid item xs={12} md={7} lg={5}  >
  <Tabs
  value={value}
  onChange={handleChange}
  variant="scrollable"
  scrollButtons="auto"
 TabIndicatorProps={{
    sx: {
      position: "absolute",
      backgroundColor: "transparent",
      
      width: "100%",
      height: "auto",
      maxWidth: "100%",
      borderRadius:  "0px"
       },
  }}
>
  {menuData.map((menuItem, index) => (
    <Tab   
    key={index}
      label={menuItem.title 
      }
      href={"#"+menuItem.title}
      {...a11yProps(index)}
      sx={{
        zIndex: "100",
        color: "#ffffff !important",
        fontSize: "13px",
        letterSpacing: "1.5px",
        marginRight: "10px"
    ,
        "&.Mui-selected": {
          borderBottom: 'white 2px solid' ,
          transform: 'scale(1.1)'
        },
              }}
       
      
      />
  ))}
</Tabs>
  </Grid>
  <Grid item xs={12} sx={{overflow:"hidden"}}>
      <Home />
      <WhyChooseUs/>  
       <Grid id='Services'>
    <Services/>
    </Grid>
    <Grid id='Reviews'>
    <Reviews/>  
    </Grid>
    <Grid id='#Contact'>
    <Contact/>  
    </Grid>
    <Grid id='#Faqs'>
     <Faq/>  
     </Grid>
    <Footer/>  
   </Grid>

</Grid>

     
  )
}