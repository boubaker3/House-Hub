import React, { useEffect } from 'react'
import {Grid,Box,Tabs,Tab,Typography,Avatar, Divider,Button,Menu,MenuItem} from "@mui/material";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Group from '@mui/icons-material/Group';
import DemandsIcon from '@mui/icons-material/CheckCircle';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Link, Outlet, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { photos_url } from '../../photos_url';
  
export default function BackOffice() {
    const [value, setValue] = React.useState<number|null>(0);
    const Logo =  require('../../assets/logo.png');
    const menuData=[{title:"Owners",icon:AccountCircleIcon},{title:"Clients",icon:Group}, {title:"Demands",icon:DemandsIcon},
                    ]

    const user = JSON.parse(localStorage.getItem("user") ?? "");
    console.log(localStorage.getItem("token"))
    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
      setValue(newValue);
    };

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
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
        case '/admin/Owners':
          setValue(0);
          break;
        case '/admin/Clients':
          setValue(1);
          break;
        case '/admin/Demands':
          setValue(2);
          break;
        default:
          setValue(null);
      }
    }, [location.pathname]);
     return (
      <Grid container>
      <Grid item xs={2} sx={{width:"100%", height: "100vh", borderRight: 1, borderColor: "divider" ,position:"fixed" }}>
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center" }} mt={2}>
          <Avatar src={Logo} sx={{ borderRadius: 0 }} />
          <Typography sx={{ ml: 1, fontSize: "14px",display:{xs:"none",lg:"flex"} }}>House Hub</Typography>
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
            to={"/admin/"+menuItem.title}
            key={index}
              label={
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  {<menuItem.icon />}
                  <Typography sx={{ ml: 1,display:{xs:"none",lg:"flex"}}}>{menuItem.title}</Typography>
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
        <Box sx={{display:"flex"}}>
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
         
        <Link to="/logout" style={{textDecoration:'none'}}><MenuItem sx={{color:"black"}} onClick={handleClose}>Logout</MenuItem></Link>
      </Menu>
        </Box> 
      </Grid>
      <Grid item xs={12} mt={4}>
     <Outlet/>
      </Grid>
      </Grid>
    
        </Grid>
    

    
  )
}
