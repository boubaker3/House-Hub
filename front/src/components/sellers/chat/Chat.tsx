import { Grid } from '@mui/material'
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
const dispatch=useAppDispatch();
const url = new URLSearchParams(useLocation().search);
const userid = url.get("userid");
useEffect(()=> {
  dispatch(showMessagedUsers(user.userid));
  },[dispatch]);
  
  return (
    <Grid container columnGap={4} rowGap={4}>
      <Grid item xs={12} md={8} lg={6}  >
      {userid&& <ChatRoom/>}
      </Grid>
      <Grid item xs={12} md={4}   >
        {messagedUsers.map((messagedUser:MessagedUser)=>
        <Grid item key={messagedUser.userid} component={Link} to={`/owner/chat?userid=${messagedUser.userid}`} style={{ textDecoration: 'none' }} >
          <MessagedUsers fullname={messagedUser.fullname} 
        photo={messagedUser.photo} userid={messagedUser.userid}/></Grid>)}
      </Grid>
    </Grid>
  )
}
