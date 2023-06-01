import React from 'react';
import Carousel from 'react-multi-carousel-18';
import { reviews } from './data/reviewsData';
import { Typography,Avatar,Card,CardContent,Box,Chip, Grid} from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import styled from 'styled-components';
export default function Reviews() {
 

  return (
    <Grid container  mt={6}>
    <Grid item xs={12} display="flex" justifyContent="center">
    <Typography variant="h2"   color="primary">
    our clients reviews
    </Typography>
    </Grid>
    
    <Grid item xs={12} display="flex" justifyContent="center">
    <Typography   color="primary">
      what our clients say about us </Typography> 
      </Grid>
    <Grid item xs={12} display="flex" justifyContent="center" mt={6} > 
     
      {reviews.map((rev) => (
              <Card
                className="Card"
                sx={{
                  width: { xs: "300px", sm: "300px" },
                  boxShadow: "rgba(149, 157, 165, 0.5) 0px 8px 24px",
                  borderRadius: "38px",
                  padding: "10px",
                  marginBottom: "50px",
                  margin:"50px auto",
                  justifyContent:"center",
                  alignItems:"center"
                }}
              >
                <Box sx={{}}>
                <Chip
                      sx={{
                        backgroundColor: "secondary.main",
                        color: "white",
                        fontWeight: "bold",
                        fontSize: "16px",
                      }}
                      icon={
                        <StarIcon
                          sx={{
                            color: "white !important",
                            width: "35px",
                            height: "35px",
                          }}
                        />
                      }
                      label={rev.rating}
                    />
                <Avatar
                  src={rev.photo}
                  sx={{
                    borderRadius: "100%",
                    width: " 80px",
                    height: "80px",
                    margin: "0 auto",
                  }}
                ></Avatar>
                 
                    </Box>

                    <Typography
                  sx={{
                    textAlign:"center",
                    fontFamily: "Montserrat",
                    fontWeight: "bold",
                    fontSize: "18px",
                    marginTop:"5px"
                  }}
                  gutterBottom
                  variant="h5"
                  component="div"
                >
                  {rev.name}
                </Typography>
                <CardContent>
                  <Box>
                  

                    <Typography
                      sx={{
                        fontFamily: "Montserrat",
                        color: "gray",
                        fontSize: "16px",
                        textAlign:"center"
                      }}
                      gutterBottom
                      variant="h6"
                      component="div"
                    >
                      {rev.review}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            ))}

  
    </Grid>
    </Grid>

  )
}
