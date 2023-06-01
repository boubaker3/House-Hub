import { Avatar, Button, Card, CardContent, Chip, Typography,Box } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'
import StarIcon from '@mui/icons-material/Star';
import Mentee from '../../../models/Client';
import { useSelector } from 'react-redux';
import { RootState,useAppDispatch } from '../../../store';
import { deleteClient, showClients } from './ClientsApi';
import { photos_url } from '../../../photos_url';
export default function ClientCard(props:Mentee) {

  const dispatch=useAppDispatch();
 const isLoading=useSelector((state:RootState)=>state.client.isLoading)

  const deleteProfile=(event: React.FormEvent<HTMLFormElement>)=>{
    event.preventDefault();
    dispatch(deleteClient(props.client_id));
    dispatch(showClients());
    

  }
  return (
    <Card
    className="Card"
    sx={{
      boxShadow: "rgba(149, 157, 165, 0.5) 0px 8px 24px",
      borderRadius: "38px",
      padding: "10px 10px 10px 10px ",
      margin: "20px",
      position: "relative",
    }}
  >
    <form onSubmit={deleteProfile}>
    
   
    <Avatar
      src={`${photos_url}${props.photo}`}
      sx={{
        borderRadius: "100%",
        width: " 120px",
        height: "120px",
        left: "0",
        right: "0",
        margin: "auto",
      }}
    ></Avatar>

    <CardContent>
    <Typography
        sx={{
          fontFamily: "Montserrat",
          fontWeight: "bold",
          textAlign: "center",
          marginTop: "10px",
          fontSize:{xs:"12px",md:"16px"}
        }}
        gutterBottom
        component="div"
      >
        {props.fullname}
      </Typography>
      <Box sx={{}}>
        

        <Typography
          sx={{ fontFamily: "Montserrat", fontSize:{xs:"12px",md:"16px"}
        }}
          gutterBottom
          variant="h6"
          component="div"
        >
          City: {props.city}
        </Typography>

        <Typography
          sx={{ fontFamily: "Montserrat", fontSize:{xs:"12px",md:"16px"},overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
        }}
          gutterBottom
          variant="h6"
          component="div"
        >
          Address: {props.address}
        </Typography>
        
      </Box>
      <Button
        component={Link}
        to={{
          pathname: "/admin/profile",
          search: `?userid=${props.client_id}`,
        }}
        disableElevation
        variant="contained"
        sx={{
          width:"90%",
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
          marginTop: "25px",
          textAlign: "center",
        }}
      >
        Visit
      </Button>
      <Button
       type='submit'
        disableElevation
        variant="contained"
        sx={{
          width:"90%",
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
      {isLoading?"wait please...":"Delete"}
      </Button>
    </CardContent>
    </form>

  </Card>
  )
}
