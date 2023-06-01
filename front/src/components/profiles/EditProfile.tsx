import React, { useEffect } from 'react'
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
import { useSelector } from 'react-redux';
import { RootState,useAppDispatch } from '../../store';
import { useNavigate } from 'react-router-dom';
import UpdatedUser from '../../models/UpdatedUser';
import { getUserdata, updatePhoto, updateProfile } from './UserdataApi';
import { photos_url } from '../../photos_url';
 

 

 

export default function EditProfile() {
 
   
 
    const navigate=useNavigate();
    const dispatch=useAppDispatch();
    const isLoading =useSelector(  (state:RootState)=>state.userdata.isLoading  );
    const isLoading2 =useSelector(  (state:RootState)=>state.client.isLoading  );
    const userdata =useSelector(  (state:RootState)=>state.userdata.data  );
    const user=JSON.parse(localStorage.getItem("user")??"");
    const [formValues, setFormValues] = React.useState<UpdatedUser>(
      {userid:"",fullname:"",email:"",password:"",phone:"",address:"",
              city:"" ,bio:""}
    )
    const [uploaded, setUploaded] = React.useState("");
    const [error, setError] = React.useState<string>(""); 
  
  
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
    dispatch(updatePhoto({userid:user.userid,photo:photo})).then(()=>{
      if(user.role=="seller"){
        navigate('/owner/home');
      }else{
        navigate('/client/home');
      }
    });
   }
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      if(formValues.fullname==""||formValues.city==""
       ||formValues.address=="" ||formValues.phone==""||formValues.bio==""
       ||formValues.email==""||formValues.password==""){
        setError('all fields are required');
        
      }
      else{
        console.log(formValues)
       dispatch(updateProfile(formValues)).then(result=>{
        if (result && result.payload.user && result.payload.token) {
          console.log("succeed")
          localStorage.clear();
          localStorage.setItem('user', JSON.stringify(result.payload.user));
          localStorage.setItem('token',result.payload.token);
          if (result.payload.user.role === 'seller') {
            navigate('/owner/home');
          } else  {
            navigate('/client/home');
          }
        }
       });
      }
     
      

    };
useEffect(()=>{
dispatch(getUserdata(user.userid));
setFormValues({userid:userdata.userid,fullname:userdata.fullname,email:userdata.email,
  password:"",phone:userdata.phone,address:userdata.address,
  city:userdata.city ,bio:userdata.bio});
  setUploaded(userdata.photo);
},[]);
   

  return (
    <Grid container mt={4}> 
<Grid item xs={12} md={6}> 
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2} justifyContent="center">
          <Grid item xs={6} >
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
                  src={`${photos_url}${uploaded}`}
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
        
            <Grid item xs={12} >
              <Input
              id='input'
              disableUnderline={true}
              fullWidth
                placeholder="Full Name"
                name="fullname"
                value={formValues.fullname}
                inputProps={{  minLength: 8,maxLength: 16 }}    
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
           {user.role=="seller"&&
            <Grid item xs={12}>
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
            </Grid>
           } 

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
             update
            </Button>
           
            </Grid>
            <Grid item xs={12}  sx={{ justifyContent:"center",alignItems:"center",display:'flex'}}>
            <Typography  >{error}</Typography>

            {isLoading||isLoading2&& (
              <CircularProgress
              color='primary'
              
              />
            )}
            </Grid>

            </Grid>

            </form>
            </Grid>

      </Grid>
  )
}
