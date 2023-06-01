import { Avatar, Box, Button, Divider, Grid, IconButton, Input, InputAdornment, Typography } from '@mui/material';
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { RootState,useAppDispatch } from '../../store';
import { getUserdata } from '../profiles/UserdataApi';
import { sendMsgs, showMsgs, updateStatus } from './ChatApi';
import Chat from "@mui/icons-material/Send";
import { MsgResponse } from '../../models/Msg';
import { photos_url } from '../../photos_url';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import { chat_files } from '../../chat_files';
export default function ChatRoom() {
const [sentMsg,setSentMsg]=React.useState<string>('');
const msgs=useSelector((state:RootState)=>state.chat.data);
const userdata=useSelector((state:RootState)=>state.userdata.data);
const isLoading=useSelector((state:RootState)=>state.chat.isLoading);
const user=JSON.parse(localStorage.getItem('user')??"");
const url = new URLSearchParams(useLocation().search);
const userid = url.get("userid")??"";
const dispatch=useAppDispatch();
const navigate=useNavigate();
const sendMsg=(event: React.FormEvent<HTMLFormElement>)=>{
event.preventDefault();
dispatch(sendMsgs({msg:sentMsg,sender_id:user.userid,receiver_id:userid,file:"null" }))
.then(()=>{
dispatch(showMsgs({sender_id:user.userid,receiver_id:userid}));
setSentMsg('');
})
}

useEffect(()=> {
dispatch(showMsgs({sender_id:user.userid,receiver_id:userid}));
},[dispatch]);

useEffect(()=> {
    dispatch(getUserdata(userid));
    if(userdata.userid=="null"){
      navigate(`/${user.role=="seller"?"owner":"client"}/chat`)
    }
},[dispatch]);
    
useEffect(()=> {
  dispatch(updateStatus({sender_id:user.userid,receiver_id:userid}));
},[dispatch]);

const uploadPhoto=(event:any)=>{
  const photo=event.target.files[0]
  dispatch(sendMsgs({msg:"",sender_id:user.userid,receiver_id:userid,file:photo}))
  .then(()=>{
  dispatch(showMsgs({sender_id:user.userid,receiver_id:userid}));
  setSentMsg('');
  })
 }

  return (
    <  >
        <Grid xs={12} display='flex' alignItems='center' columnGap={2}>
        <Avatar
          src={userdata.photo&&`${photos_url}${userdata.photo}`}
          sx={{
            width: { xs: "50px",md:"80px"},
            height:  { xs: "50px",md:"80px" },
          }}
        >
        </Avatar>

        <Typography
          sx={{
            color: "gray",
            textAlign: "center",
          }}
        >
          {userdata.fullname}
        </Typography>
        </Grid>

        <Divider sx={{mt:4}}/>

        <Box
          sx={{
            height: {xs:"400px",lg:"450px", xl:"600px"},
            width: "100%",
            padding: "10px",
            overflowX: "hidden",
            overflowY: "auto",
          }}
        >
          {msgs.map((msg:MsgResponse,index:number) => (
            <Box
              key={msg.id}
              sx={{ display: "block", marginTop: "5px",  }}
            >
              <Box  >
                <Avatar
                  src={userdata.photo&& `${photos_url}${msg.sender_user_photo}` 
                  }
                  sx={{
                    width: { xs: "50px" },
                    height: "50px",
                    borderRadius: "50%",
                    display: "inline-block",
                  }}
                >
                  {" "}
                </Avatar>
              {msg.msg!=null&&
                  <Box
                  sx={{
                    width: "200px",
                    padding: "20px",
                    borderRadius: "12px",
                    backgroundColor:
                      msg.sender_id == user.userid
                        ? "primary.main"
                        : "#F4F4F4",
                    display: "inline-block",
                    marginLeft: "5px",
                    overflow: "hidden",
                  }}
                  >
                  <Typography
                    sx={{
                      fontFamily: "Montserrat",
                      color:
                        msg.sender_id == user.userid ? "white" : "gray",
                    }}
                  >
                    {msg.msg}
                  </Typography>
                  </Box>
              } 
              {msg.hasFile==1&&
               <Box
              
               >
               <Avatar
               sx={{  width: {xs:"200px",lg:"250px",xl:"300px"},
               height:  {xs:"100px",lg:"150px",xl:"200px"},
               borderRadius: "32px",}}  src={`${chat_files}${msg.file}`}
               >
                  
               </Avatar>
               </Box>}
                <Typography
                  sx={{
                    fontFamily: "Montserrat",
                    color: "gray",
                    fontSize: "12px",
                    opacity: "0.7",
                    display: "inline-block",
                  }}
                >
                  {new Date(msg.created_at ).toLocaleString('en-US', { month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true })}
                </Typography>
               {index==msgs.length-1 && <Typography
                  sx={{
                    fontFamily: "Montserrat",
                    color: "gray",
                    fontSize: "12px",
                    opacity: "0.7",
                  }}
                >
                  {msg.seen == 0 ? "not seen yet" : "seen"}
                </Typography>}
              </Box>
            </Box>
          ))}
        </Box>
        <form onSubmit={sendMsg}>
        <Grid item xs={12} columnGap={1} alignItems="center" sx={{ backgroundColor:'#F0F0F0',p:1,borderRadius:"32px",display:'flex'}}>
        <Button type='submit'>
        <Chat/>
        </Button>
        <label htmlFor="avatar">
        <AddPhotoAlternateIcon sx={{color:"gray"}}/>
        </label>

          <Input
            id="avatar"
            sx={{  position: 'absolute',
            width: '1px',
            height: '1px',
            padding: 0,
            margin: '-1px',
            overflow: 'hidden',
            clip: 'rect(0, 0, 0, 0)',
            border: 0}}
            type="file"
            onChange={uploadPhoto}
          />
                    <Input
           
           fullWidth  
           onChange={(e)=>setSentMsg(e.target.value)}
              disableUnderline={true} 
              placeholder="write something..."
              value={sentMsg}
            ></Input>
      </Grid>
        </form>
      </>
  )
}
