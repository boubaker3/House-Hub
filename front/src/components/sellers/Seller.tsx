import React, { useEffect } from 'react'
import {Grid,Box,Tabs,Tab,Typography,Avatar, Divider,Button,Menu,MenuItem} from "@mui/material";
import SendIcon from '@mui/icons-material/Send';
import HomeIcon from '@mui/icons-material/Home';
 import MoreVertIcon from '@mui/icons-material/MoreVert';
import StarIcon from '@mui/icons-material/Star';
import DemandsIcon from '@mui/icons-material/CheckCircle';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
 import { Link, Outlet, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { photos_url } from '../../photos_url';
 import { useSelector } from 'react-redux';
import { useAppDispatch,RootState } from '../../store';
import { getUserdata } from '../profiles/UserdataApi';
export default function Seller() {
    const [value, setValue] = React.useState<number|null>(0);
    const Logo =  require('../../assets/logo.png');
    const menuData=[{title:"Home",icon:HomeIcon},{title:"Demands",icon:DemandsIcon},
                     {title:"Reviews",icon:StarIcon},
                    {title:"Chat",icon:SendIcon},{title:"Profile",icon:AccountCircleIcon},]
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const user = JSON.parse(localStorage.getItem("user") ?? "");
const dispatch=useAppDispatch();
 
    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
      setValue(newValue);
    };
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };
    const navigate=useNavigate();
    let location = useLocation();
    
    useEffect(() => {
      
      switch (location.pathname) {
        case "/owner/Home":
          setValue(0);
          break;
        case "/owner/Demands":
          setValue(1);
          break;
        case "/owner/Reviews":
          setValue(2);
          break;
        case "/owner/Chat":
          setValue(3);
          break;
        case "/owner/Profile":
            setValue(4);
            break;
        
      }
    }, [location.pathname]);
     return (
      <Grid container>
      <Grid item xs={2} sx={{width:"100%", height: "100vh", borderRight: 1, borderColor: "divider",position:"fixed"  }}>
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center" }} mt={2}>
          <Avatar src={Logo} sx={{ borderRadius: 0 }} />
          <Typography sx={{ ml: 1, fontSize: "14px",display:{xs:"none",lg:"flex"} }}>Dar-na</Typography>
        </Box>
        <Divider sx={{ mt: 4 }} />
        <Tabs
       
          orientation="vertical"
          value={value}
          onChange={handleChange}
          aria-label="Vertical tabs example"
          sx={{ width: "100%", position: "relative", top: "10%" }}
          TabIndicatorProps={{
            sx: {
              width: "100%" ,
              borderRadius: "0 32px 32px 0",
              zIndex: -1,
              mr:{xs:2,lg:8}
            },
          }}
        >
          {menuData.map((menuItem, index) => (
            <Tab
            component={Link}
            to={menuItem.title=="Profile"?"/owner/"+menuItem.title+"?userid="+user.userid:"/owner/"+menuItem.title}
            key={index}
              label={
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  {<menuItem.icon />}
                  <Typography sx={{ ml: 1,display:{xs:"none",lg:"flex", }}}>{menuItem.title}</Typography>
                </Box>
              }
              sx={{
                mt: {xs:1,md:2,xl:4},
                alignItems: "start",
                fontWeight: "bold",
                color: "black",
                "&.Mui-selected": {
                  color: "white",
                },
              }}
            />
          ))}
        </Tabs>
      </Grid>
         <Grid item xs={10} p={2} ml="auto">
      <Grid xs={12}  sx={{display:'flex'}} >
      <Box  sx={{width:"100%",}} >
        <Typography   sx={{fontSize:{xs:"12px",md:"18px"}}}>{`Good ${new Date().getHours() < 12 ? 'Morning' : 'Evening'}`} {user.fullname}</Typography>
        </Box>
        <Grid item display='flex' alignItems="center" columnGap={1}>
       <Link to={`/owner/addProperty`}>
       <Box sx={{ width: "40px", height: "40px", backgroundColor: "primary.main", borderRadius: 4, display: "flex", alignItems: "center", justifyContent: "center" }}>
  <AddCircleIcon sx={{color:"white"}}/>
</Box> 
</Link>
        <Avatar src={`${photos_url}${user.photo}`}></Avatar>
        <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
       <MoreVertIcon/>
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <Link to={`/owner/profile?userid=${user.userid}`} style={{textDecoration:'none'}}><MenuItem sx={{color:"black"}} onClick={handleClose}>Profile</MenuItem></Link>
        <MenuItem onClick={handleClose}>My account</MenuItem>
        <Link to="/logout" style={{textDecoration:'none'}}><MenuItem sx={{color:"black"}} onClick={handleClose}>Logout</MenuItem></Link>
      </Menu>
        </Grid> 
      </Grid>
      <Grid item xs={12} mt={4}>
     <Outlet/>
      </Grid>
      </Grid>
    
        </Grid>
    

    
  )
}
