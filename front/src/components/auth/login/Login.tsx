import React, { useEffect } from 'react'
import { Input,Grid,CircularProgress,Button,FormControlLabel,Checkbox,Box,Typography} from '@mui/material';
import '../../styles/auth.css';
import { useSelector } from 'react-redux';
import { RootState,useAppDispatch } from "../../../store";
import {login} from './LoginApi';
import { useNavigate } from 'react-router-dom';
interface LoginFormValues {
   email: string;
  password: string; 
}
interface User{
  id:number;
  fullname:string;
  userid:string;
  email:string;
  photo:string;
  role:string;
};
const initialFormValues: LoginFormValues = { 
  email: "",
  password: "",
 
};
export default function Login() {
 
   const dispatch=useAppDispatch();
    const navigate=useNavigate();
    const [formData, setFormData] = React.useState<LoginFormValues>(initialFormValues); 
    const [error, setError] = React.useState<string>(""); 
    const isLoading=useSelector((state:RootState)=>state.auth.isLoading)
  
    const user=useSelector((state:RootState):User =>state.auth.user)
    const token=useSelector((state:RootState)=>state.auth.token)
    const is_logged=useSelector((state:RootState)=>state.auth.is_logged)

    const handleChange=(event:any)=>{
      const {name,value}=event.target
      setFormData((prevFormData)=>({...prevFormData,[name]:value}))
    }
 
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      if(formData.email==""||formData.password==""){
        setError('all fields are required');
        
      }
     
      else{
        dispatch(login(formData)).then((result) => {
          if (result && result.payload.user && result.payload.token) {
            localStorage.setItem('user', JSON.stringify(result.payload.user));
            localStorage.setItem('token',result.payload.token);
            if (result.payload.user.role === 'admin') {
              navigate('/admin/owners');
            } else if (result.payload.user.role === 'seller') {
              navigate('/owner/home');
            } else {
              navigate('/client/home');
            }
          } else {
            setError('your email or password is wrong!');
          }
        });
      }
    

    };
  return (
    <Grid container justifyContent='center' mt={4}>
<Grid item xs={12} md={8} spacing={2}>

        <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} >
         <Input
           fullWidth  
           onChange={handleChange}
              name="email"
              disableUnderline={true} 
              id="input"
              placeholder="Email"
              value={formData.email}
            ></Input>
          </Grid>
          <Grid item xs={12}  >
            <Input
              id="input"
              fullWidth type="password"
              inputProps={{  minLength: 8,maxLength: 16 }}
              onChange={handleChange}
              name="password"
              disableUnderline={true}
             value={formData.password}
              placeholder="Password"
            ></Input>
          </Grid>
          <Grid item xs={12} md={6} >
            <FormControlLabel
              control={<Checkbox />}
              label="Agree on terms"
            />
          </Grid>
         
          <Grid item xs={12}  sx={{ justifyContent:"center",alignItems:"center",display:'flex'}}>
            <Button
              type="submit"
              disableElevation
              variant="contained"
              sx={{
                paddingLeft: "60px",
                paddingRight: "60px",
                color: "white",
                borderRadius: "38px",
                fontSize: "18px",
              }}
            >
              Login
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