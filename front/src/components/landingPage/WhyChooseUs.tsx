import { Avatar, Grid, Typography } from '@mui/material';
import React from 'react';

const WhyChooseUs1 = require('../../assets/covers/whyChooseUs1.png');
const WhyChooseUs2 = require('../../assets/covers/whyChooseUs2.png');
const WhyChooseUs3 = require('../../assets/covers/whyChooseUs3.png');
const WhyChooseUs4 = require('../../assets/covers/whyChooseUs4.png');

const WhyChooseUs = () => {
  const whyChooseUsData = [WhyChooseUs1, WhyChooseUs2, WhyChooseUs3, WhyChooseUs4];

  return (
    <Grid container spacing={4} columnGap={4} justifyContent="center" mt={6}>
      <Grid item xs={12} display="flex" justifyContent="center">
        <Typography variant="h2" color="primary">
          Why Choose Us
        </Typography>
      </Grid>
      {whyChooseUsData.map((image, index) => (
        <Grid item xs={5} lg={2} key={index}>
          <Avatar src={image} alt={`Image ${index + 1}`} 
          sx={{ borderRadius: 0, width: "100%",height:'auto' }} />
        </Grid>
      ))}
    </Grid>
  );
}

export default WhyChooseUs;
