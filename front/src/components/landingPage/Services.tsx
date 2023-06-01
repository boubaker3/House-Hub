import React from 'react';
import { Grid, Avatar, Typography, Box } from '@mui/material';
import { servicesData } from './data/servicesData';

export default function Services() {
  const ServicesCover = require('../../assets/covers/services.png');

  return (
    <Grid container mt={6} justifyContent="center" display="flex">
    <Grid item xs={12} justifyContent="center" display="flex">
    <Typography variant='h2' color="primary">  Our services
     </Typography>
     </Grid>
     <Grid item xs={12} display="flex" justifyContent="center">
    <Typography   color="primary">
    what we offer to our clients </Typography> 
      </Grid>
        <Grid item xs={12} md={6} display='flex' columnGap={2} mt={6}> 
        <Grid container spacing={2}>
          {servicesData.map((service, index) => (
            <Grid item xs={5} key={index}>
              <Grid
                container
                justifyContent='center'
                sx={{
                  height: '350px',
                  p:2,
                  backgroundColor: 'primary.main',
                  color: 'white',
                  textAlign: 'center',
                  borderRadius: '24px',
                }}
              >
                  <Box>
                  <service.image sx={{ fontSize: '48px' }} />
                  <Typography variant='h5'>{service.title}</Typography>
                  <Typography sx={{mt:2}} variant='body1'>{service.description}</Typography>
                  </Box>
              </Grid>
            </Grid>
          ))}
        </Grid>
      </Grid>

      <Grid container xs={12} md={5}   justifyContent='center'
          alignItems='center'   sx={{display:{xs:'none',lg:"flex"}}}>
         
          <Avatar sx={{ width: '100%', height: 'auto', borderRadius: 0 }} src={ServicesCover} />
        
      </Grid>
    </Grid>
  );
}
