import React from 'react'
import {
  Box,
  Button,
  CircularProgress,
  Avatar,
  Grid,
  Input,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import {Tabs,Tab} from '@mui/material';
import '../../styles/auth.css';
import { useSelector } from 'react-redux';
import { RootState,useAppDispatch } from "../../../store";
import { signup } from './SignupApi';
import User from '../../../models/User';
import { useNavigate } from 'react-router-dom';

const initialFormValues: User = {
  fullname: "",
  email: "",
  password: "",
  phone: "",
  photo: "",
  city: "",
  address: "",
  type: "Agency",
  role: "seller",
  bio: "",
};

 

const ownerTypes = [
  { value: "Agency", label: "Agency" },
  { value: "Personal", label: "Personal" },
];

interface UserResponse{
  id:number;
  fullname:string;
  userid:string;
  email:string;
  photo:string;
  role:string;
};

export default function Signup() {
 
    const [formValues, setFormValues] = React.useState<User>(
      initialFormValues
    )

    const [roleValue, setRoleValue] = React.useState(0);

   
    const navigate=useNavigate();
    const dispatch=useAppDispatch();
    const user=useSelector((state:RootState):UserResponse =>state.auth.user)
    const token=useSelector((state:RootState)=>state.auth.token)
    const is_logged=useSelector((state:RootState)=>state.auth.is_logged)
    const isLoading =useSelector(  (state:RootState)=>state.seller.isLoading  );

    const [uploaded, setUploaded] = React.useState("");
    const [error, setError] = React.useState<string>(""); 
  

    const handleChangeRole = (event: React.SyntheticEvent, newValue: number) => {
      setRoleValue(newValue);
      if(roleValue==0){
        setFormValues((prevValues) => ({
          ...prevValues,
        'role': 'client',
        }));
      }else{
        setFormValues((prevValues) => ({
          ...prevValues,
        'role': 'seller',
        }));
      }
    };
  
    function a11yPropsRole(index: number) {
      return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
      };
    }


    const handleChange = (event:any ) => {
      const { name, value } = event.target;
      setFormValues((prevValues) => ({
        ...prevValues,
        [name]: value,
      }));
    };
   const uploadPhoto=(event:any)=>{
    const photo=event.target.files[0]
    setUploaded(URL.createObjectURL(event.target.files[0]));
    setFormValues((prevValues) => ({
      ...prevValues,
      'photo':photo,
    }));
   }
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
 
      if(formValues.fullname==""||formValues.email==""||formValues.password==""||formValues.city==""
       ||formValues.address=="" ||formValues.phone==""){
        setError('all fields are required');
        
      }
      
      else{
        dispatch(signup(formValues)).then(()=>{
          if(user&&token){
            localStorage.setItem('user',JSON.stringify(user));
            localStorage.setItem('token',token);
            if(user.role=="admin"){
              navigate("/admin/owners")
            }else if(user.role=="seller"){
              navigate("/owner/home")
  
            }else{
              navigate("/client/home")
            }
        }else{
        setError('something went wrong!');
          
        }
      }
      ) 
      }
     

    };
    
   

  return (
    <Grid container justifyContent='center' mt={4}> 
<Grid item xs={12} md={8}> 
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
          <Grid item xs={12} >
            <Box
              sx={{
                margin: "50px auto",
                display: "block",
                width: "200px",
                height: "200px",
                backgroundColor: "rgb(241, 241, 241)",
                borderRadius: "38px",
                position: "relative",
              }}
            >
              <label htmlFor="avatar">
                <Avatar
                  src={uploaded}
                  sx={{
                borderRadius: "38px",
                width: "100%",
                height: "100%",
                   
                  }}
                
                ></Avatar>
              </label>

              <Input
                sx={{ visibility: "hidden" }}
                type="file"
                id="avatar"
                name="photo"
                onChange={uploadPhoto}
                 ></Input>
            </Box>
          </Grid>
            <Grid item xs={12}>
            <Box  sx={{ justifyContent:"center",alignItems:"center",display:'flex'}} >
            <Typography  variant='h6'>I'am a:</Typography>
          <Tabs value={roleValue} onChange={handleChangeRole} aria-label="basic tabs example">
          <Tab label="seller" {...a11yPropsRole(0)} />
          <Tab label="client" {...a11yPropsRole(1)} />
        </Tabs>
        </Box>
        </Grid>
            <Grid item xs={12}>
              <Input
              id='input'
              
              disableUnderline={true}
              fullWidth
                placeholder="Full Name"
                name="fullname"
                value={formValues.fullname}
                inputProps={{  minLength: 6,maxLength: 16 }}
                onChange={handleChange}
                ></Input>
            </Grid>
            <Grid item xs={12}>
              <Input
              id='input'
              disableUnderline={true}
              fullWidth
                placeholder="Email"
                name="email"
                type="email"
                value={formValues.email}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <Input
              id='input'
              disableUnderline={true}
              fullWidth
               placeholder="Password"
                name="password"
                type="password"
                value={formValues.password}
                inputProps={{  minLength: 8,maxLength: 16 }}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <Input
              disableUnderline={true}
              id='input'
              fullWidth
                placeholder="Phone"
                name="phone"
                value={formValues.phone}
                inputProps={{  minLength: 8,maxLength: 16 }}
                onChange={handleChange}
              ></Input>
            </Grid>
             
            <Grid item xs={12}>
              <Input
              disableUnderline={true}
              id='input'
              fullWidth
                placeholder="City"
                name="city"
                value={formValues.city}
                inputProps={{  minLength: 4,maxLength: 16 }}
                onChange={handleChange}
              ></Input>
            </Grid>
            <Grid item xs={12}>
              <Input
              disableUnderline={true}
              id='input'
              fullWidth
                placeholder="Address"
                name="address"
                value={formValues.address}
                inputProps={{  minLength: 8,maxLength: 16 }}    
                onChange={handleChange}
              ></Input>
            </Grid>
           {roleValue==0&&
            <Grid item xs={12}>
            <Select
              fullWidth
              label="owner type"
              name="type"
              value={formValues.type}
              onChange={handleChange}
            >
              {ownerTypes.map((ownerType) => (
                <MenuItem key={ownerType.value} value={ownerType.value}>
                  {ownerType.label}
                </MenuItem>
              ))}
            </Select>
          </Grid>}
           {roleValue==0&& <Grid item xs={12}>
            <Input
            id='input'
            fullWidth
            disableUnderline
        placeholder="Bio"
        name="bio"
        value={formValues.bio}
        inputProps={{  minLength: 8,maxLength: 150 }}
        onChange={handleChange}
        multiline
        rows={4}
      ></Input>
            </Grid>}
            <Grid item xs={12}  sx={{ justifyContent:"center",alignItems:"center",display:'flex'}} 
              >
            <Button
              type="submit"
              disableElevation
              variant="contained"
              sx={{
                justifyContent:"center",alignItems:"center",
                paddingLeft: "60px",
                paddingRight: "60px",
                color: "white",
                borderRadius: "38px",
                fontSize: "18px",

              }}
            >
              Signup
            </Button>
           
            </Grid>
            <Grid item xs={12}sx={{ justifyContent:"center",alignItems:"center",display:'flex'}} >
          <Typography  >{error}</Typography>
  
   {isLoading&& (
              <CircularProgress
              color='primary'
              
              
              />
            )}</Grid>

            </Grid>

            </form>
            </Grid>

      </Grid>
  )
}
