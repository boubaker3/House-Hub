import { Avatar, Typography ,Box, Grid} from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom';
import { photos_url } from '../../photos_url';
import MessagedUser from '../../models/MessagedUser';
export default function MessagedUsers(props:MessagedUser) {
  return (
    <Grid item sx={{boxShadow:"rgba(149, 157, 165, 0.2) 0px 8px 24px",p:2,borderRadius:4,display:"flex"}} columnGap={2}>
    
    <Avatar  sx={{width:{xs:"50px",md:"60px"},height:{xs:"50px",md:"60px"},}} 
    src={props.photo&&`${photos_url}${props.photo}`}/>
    <Typography   sx={{fontSize:{xs:"12px",md:"18px",color:'gray'}}}>{props.fullname}</Typography>
    </Grid>
  )
}
