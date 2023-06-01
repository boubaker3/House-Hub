import React, { FormEventHandler } from 'react'
import { Grid,TextField,Typography,Button,CircularProgress,Box } from '@mui/material';
import { useSelector } from 'react-redux';
import { useAppDispatch,RootState } from '../../store';
import { storeContact } from './ContactusApi';
export default function Contact() {
  const [formData, setFormData] = React.useState({ fullname: '', email: '', phone: '',city:'' ,message:'' });
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };
  const isLoading=useSelector((state:RootState)=>state.contact.isLoading)
  const res=useSelector((state:RootState)=>state.contact.res)
  const dispatch=useAppDispatch();
     const submitContact=(event: React.FormEvent<HTMLFormElement>)=>{
      event.preventDefault();
      dispatch(storeContact(formData));
      
     }
  return (
    <Grid container columnGap={8} alignItems='center' mt={6}>
    <Grid item xs={12} display="flex" justifyContent="center">
    <Typography variant="h2" sx={{marginLeft: "1rem"}} color="primary">
   Contact us
    </Typography>
    </Grid>
    <Grid item xs={12} display="flex" justifyContent="center">
    <Typography   color="primary">
    Any question or remarks? Just write us a message!
    </Typography>
    </Grid>
    <Grid item xs={12} md={5} mt={6}>
    <Box  sx={{marginLeft: "1rem",textAlign:"center"}}>
 <Typography variant="h2">
 we care for your feedbacks <br/>
 so please send us one
  </Typography> 
  <Typography variant="h2" color="primary">
  And
  </Typography>
  <Typography variant="h2" > 
share us your opinions on <br/>
our platform
    </Typography>
 </Box>
 
    </Grid>
    <Grid item xs={12} md={5} mt={6}>
    <form  onSubmit={submitContact}>
    <Grid item xs={12} md={10}>
          <TextField
            variant="outlined"
            required
            fullWidth
            name="fullname"
            label="fullname"
            type="text"
            value={formData.fullname}
            onChange={
              handleChange}
              margin="normal"          />
        </Grid>
        <Grid item xs={12} md={10}>
          <TextField
            variant="outlined"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            value={formData.email}
            onChange={handleChange}
            margin="normal" autoComplete="email"
          />
        </Grid>

        <Grid item xs={12} md={10}>
          <TextField
            variant="outlined"
            required
            fullWidth
            name="phone"
            label="phone number"
            type="number"
            value={formData.phone}
            margin="normal" onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} md={10}>
          <TextField
            variant="outlined"
            required
            fullWidth
            name="city"
            label="city"
            value={formData.city}
            margin="normal" onChange={handleChange}
          />
        </Grid>
      
        <Grid item xs={12} md={10}>
          <TextField
            variant="outlined"
            required
            fullWidth
            name="message"
            label="message"
            type="text"
            value={formData.message}
            onChange={handleChange}
            margin="normal" multiline
          />
        </Grid>
        <Grid item xs={4}>
          <Button
            disableElevation
            fullWidth
            variant="contained"
            type="submit"
            color="primary"
            sx={{
              textAlign: "center",
              color: "white",
              fontFamily: "montserrat",
            }}
          >
            Submit
          </Button>
        </Grid>
        { isLoading&& (
          <CircularProgress
            style={{
              color: "var(--yellow)",
              margin: "20px auto",
              display: "block",
            }}
          />
        )}

        <Typography
          sx={{
            fontSize: "14px",
            fontFamily: "Montserrat",
            textAlign: "center",
            marginTop: "25px",
          }}
        >
          {res}
        </Typography>
    </form>
    </Grid>
    </Grid>
  )
}
