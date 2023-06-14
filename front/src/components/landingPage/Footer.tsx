import React from 'react';
import { Grid, Typography, Link, Box } from '@mui/material';
import { Facebook, Twitter, Instagram, Phone, Email, LocationOn } from '@mui/icons-material';

const Footer = () => {
  const footerStyles = {
    backgroundColor: '#18273d',
    color: '#fff',
    padding: '20px',
    marginTop:"100px"
  };

  const logoStyles = {
    width: '50px',
    height: '50px',
    marginRight: '10px',
  };

  const socialMediaStyles = {
    marginRight: '10px',
    color:"#fff"
  };
  
  const Logo = require('../../assets/logo.png');

  return (
    <footer style={footerStyles}>
      <Grid container justifyContent="center"  >
        <Grid item xs={12} md={4}>
          <Grid container alignItems="center">
            <img src={Logo} alt="Logo" style={logoStyles} />
            <Typography variant="h6">Dar-na</Typography>
          </Grid>
        <Grid item xs={12} display='flex' mt={4}>
            <Phone sx={{ marginRight: '5px' }} />
            <Typography variant="body2" sx={{ marginRight: '10px' }}>+212514280505</Typography>
          </Grid>
        <Grid item xs={12} display='flex' mt={2}>
            <Email sx={{ marginRight: '5px' }} />
            <Typography variant="body2" sx={{ marginRight: '10px' }}>darna@gmail.com</Typography>
          </Grid>
        <Grid item xs={12} display='flex' mt={2}>
            <LocationOn sx={{ marginRight: '5px' }} />
            <Typography variant="body2"> Street Mohamed 6, Guelmim</Typography>
            </Grid>
           
        </Grid>
        <Grid item xs={12} md={4}>
          <Typography variant="body2" align="center">
            &copy; {new Date().getFullYear()} House Hub. All rights reserved.
          </Typography>
        </Grid>
        <Grid item xs={12} md={4} >
          <Box display="flex" justifyContent="center">
          <Typography variant="body2" sx={{ marginRight: '10px' }}>Follow us on: </Typography>
            <Link href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
              <Facebook style={socialMediaStyles} />
            </Link>
            <Link href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
              <Twitter style={socialMediaStyles} />
            </Link>
            <Link href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
              <Instagram style={socialMediaStyles} />
            </Link>
          </Box>
        </Grid>
        <Grid container mt={2} justifyContent="center">
     <Grid item xs={12}  display="flex" justifyContent="center">
    <Typography variant='h2' color="white">  About us
     </Typography>
     </Grid>
      <Grid container xs={6} md={6} mt={2} justifyContent="center" textAlign='center'> 
        <Typography variant="body1">
          You're looking for houses to rent, sell, or buy? "House Hub" offers you an easy and good platform to communicate with real estate companies, owners, and clients. For a good and trustworthy business, let's work together.
        </Typography>
      </Grid>
        </Grid>
      </Grid>
    </footer>
  );
};

export default Footer;
