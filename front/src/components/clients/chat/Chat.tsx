import { Grid, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import ChatRoom from '../../chat/ChatRoom'
import MessagedUsers from '../../chat/MessagedUsers'
import { useSelector } from 'react-redux';
import { RootState,useAppDispatch } from '../../../store';
import { showMessagedUsers } from '../../chat/ChatApi';
import MessagedUser from '../../../models/MessagedUser';
import { Link, useLocation } from 'react-router-dom';

export default function Chat() {
const messagedUsers=useSelector((state:RootState)=>state.chat.messagedUsers);
const user=JSON.parse(localStorage.getItem('user')??"");
const url = new URLSearchParams(useLocation().search);
const userid = url.get("userid");
const dispatch=useAppDispatch();
useEffect(()=> {
  dispatch(showMessagedUsers(user.userid));
  },[dispatch]);
  
  return (
    <Grid container columnGap={4} rowGap={4}>
      <Grid item xs={12} md={8} lg={6}  >
       {userid&& <ChatRoom/>}
      </Grid>
      <Grid item xs={12} md={4}   >
        {messagedUsers?messagedUsers.map((messagedUser:MessagedUser)=>
        <Grid component={Link} to={`/client/chat?userid=${messagedUser.userid}`} style={{ textDecoration: 'none' }} >
          <MessagedUsers fullname={messagedUser.fullname} 
        photo={messagedUser.photo} userid={messagedUser.userid}/></Grid>):<Typography>No chats available</Typography>}
      </Grid>
    </Grid>
  )
}
