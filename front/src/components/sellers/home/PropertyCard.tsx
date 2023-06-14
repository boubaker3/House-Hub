import { Avatar, Button, Card, CardContent, Chip, Typography,Box ,Grid} from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'
import StarIcon from '@mui/icons-material/Star';
import { useSelector } from 'react-redux';
import { RootState,useAppDispatch } from '../../../store';
import { photos_url } from '../../../photos_url';
import { deleteProperty, showProperties } from './PropertyApi';
import { PropertyResponse } from '../../../models/Property';
import { images_url } from '../../../images_url';
export default function PropertyCard(props:PropertyResponse) {
  const user=JSON.parse(localStorage.getItem("user")??"");

  const dispatch=useAppDispatch();

  const deleteIt=( )=>{
    dispatch(deleteProperty(props.property_id));
    dispatch(showProperties({seller_id:props.property_seller_id,orderBy:"ASC",bedrooms:"null",
    city:'null',actiontype:'null',propertytype:'null',area:"null"}));
    }
  return (
    <Card
    sx={{
      boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
      borderRadius: "38px",
      padding: "20px ",
      marginTop: "20px",
      position:'relative'
    }}
  >
    <form onSubmit={deleteIt}>

    <Grid container   >
        <Chip
          sx={{
            backgroundColor: "white",
            color: "black",
            fontWeight: "bold",
            fontSize: "16px",
          }}
          icon={
            <StarIcon
              sx={{
                color: "var(--yellow) !important",
                width: "35px",
                height: "35px",
              }}
            />
          }
          label={props.rating}
        />
 <Grid item xs={12}  position="relative">
        <Avatar
          src={`${images_url}${props.image}`}
          sx={{
            borderRadius: "38px 38px 0  0",
            width:"100%",
            height: "120px",
            position:"absolute"
          }}
        ></Avatar>
    </Grid>
       
 <Grid item xs={12}  >
       <Avatar
      src={`${photos_url}${props.photo}`}
      sx={{
        borderRadius: "100%",
        width: " 80px" ,
        height: " 80px" ,
        left: "0",
        right: "0",
        margin: "auto",
        marginTop: "75px",
        fontSize: {xs:"12px",md:"16px"} }}
    ></Avatar>
    </Grid>
        <CardContent>
          <Typography
            sx={{
              fontWeight: "bold",
              textAlign: "center",
              marginTop: "10px",
            }}
            gutterBottom
            variant="h5"
            component="div"
          >
            {props.title}
          </Typography>
          <Box sx={{ fontSize: {xs:"12px",md:"16px"}}}>
            <Typography
              sx={{  fontSize: {xs:"12px",md:"16px"} }}
              gutterBottom
              variant="h6"
              component="div"
            >
              {props.propertytype}
            </Typography>

            <Typography
              sx={{  fontSize: {xs:"12px",md:"16px"}}}
              gutterBottom
              variant="h6"
              component="div"
            >
              city: {props.city}
            </Typography>
            <Typography
              sx={{  fontSize: {xs:"12px",md:"16px"} }}
              gutterBottom
              variant="h6"
              component="div"
            >
              price: {props.price}DH
            </Typography>
            <Typography
              sx={{ fontFamily: "Montserrat", color: "gray",  fontSize: {xs:"12px",md:"16px"} }}
              gutterBottom
              variant="h6"
              component="div"
            >
              address: {props.address}
            </Typography>
          </Box>
      
    <Grid container  justifyContent="center">

        <Button
        component={Link}
        to={{
          pathname:`${user.role=="seller"?"/owner/property":"/client/property"}`,
          search: `?property_id=${props.property_id}&owner_id=${props.property_seller_id}`,
        }}
        disableElevation
        variant="contained"
        sx={{
          width:"100%",
          paddingLeft: "40px",
          paddingRight: "40px",
          color: "white",
          borderRadius: "38px",
           fontSize: { xs: "8px", md: "12px"  },
          justifyContent: "center",
          marginLeft: "auto",
          marginRight: "auto",
          display: "block",
          marginTop: "5px",
          textAlign: "center",
        }}
      >
        Visit
      </Button>
    {
      user.role=="seller"&&
      <Button
      type='submit'
       disableElevation
       variant="contained"
       sx={{
         width:"100%",
         paddingLeft: "40px",
         paddingRight: "40px",
         color: "white",
         borderRadius: "38px",
         fontFamily: "Montserrat",
         fontSize: { xs: "8px", md: "12px"  },
         justifyContent: "center",
         marginLeft: "auto",
         marginRight: "auto",
         display: "block",
         marginTop: "  5px",
         textAlign: "center",
         backgroundColor:"#AA4444"
       }}
     >
     Delete 
     </Button>
   
  }
    
    </Grid>

        </CardContent>
    </Grid>
    </form>

      </Card>
  )
}
