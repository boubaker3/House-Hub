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
import { useNavigate } from 'react-router-dom';
import { Property } from '../../../models/Property';
import { storeProperty } from '../home/PropertyApi';

const initialFormValues: Property = {
    property_seller_id:"", 
    title:"" ,
    propertytype: "Studio",
    price: "",
    image:"" ,
    city: "",
    area: "",
    bedrooms:"" ,
    address: "",
    actiontype:"sell"
};

 

const propertytypes = [
  { value: "Studio", label: "Studio" },
  { value: "Appartement", label: "Appartement" },
  { value: "Villa", label: "Villa" },
];

 

export default function AddProperty() {
 
    const [formValues, setFormValues] = React.useState<Property>(
      initialFormValues
    )

    const [roleValue, setRoleValue] = React.useState(0);

   
    const navigate=useNavigate();
    const dispatch=useAppDispatch();
    const res=useSelector((state:RootState) =>state.sellerProperty.wasAdded)
    const isLoading =useSelector(  (state:RootState)=>state.sellerProperty.isLoading  );
    const user=JSON.parse(localStorage.getItem("user")??"");
    const [uploaded, setUploaded] = React.useState("");
    const [error, setError] = React.useState<string>(""); 
  

    const handleChangeRole = (event: React.SyntheticEvent, newValue: number) => {
      setRoleValue(newValue);
      if(roleValue==0){
        setFormValues((prevValues) => ({
          ...prevValues,
        'actiontype': 'sell',
        }));
      }else{
        setFormValues((prevValues) => ({
          ...prevValues,
        'actiontype': 'rent',
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
    const image=event.target.files[0]
    setUploaded(URL.createObjectURL(event.target.files[0]));
    setFormValues((prevValues) => ({
      ...prevValues,
      'image':image,
    }));
   }
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      formValues.property_seller_id=user.userid;
      if(formValues.title==""||formValues.address==""||formValues.actiontype==""||formValues.city==""
       ||formValues.address=="" ||formValues.area==""||formValues.bedrooms==""
      ||formValues.image==""||formValues.price==""){
        setError('all fields are required');
        
      }
      
      else{
        dispatch(storeProperty(formValues)).then(()=>{
            navigate("/owner/home")
        });
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
                width: "500px",
                height: "250px",
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
                name="image"
                onChange={uploadPhoto}
                 ></Input>
            </Box>
          </Grid>
            <Grid item xs={12}>
            <Box  sx={{ justifyContent:"center",alignItems:"center",display:'flex'}} >
            <Typography  variant='h6'>Action type : </Typography>
          <Tabs value={roleValue} onChange={handleChangeRole} aria-label="basic tabs example">
          <Tab label="sell" {...a11yPropsRole(0)} />
          <Tab label="rent" {...a11yPropsRole(1)} />
        </Tabs>
        </Box>
        </Grid>
            <Grid item xs={12}>
              <Input
              id='input'
              
              disableUnderline={true}
              fullWidth
                placeholder="property title"
                name="title"
                value={formValues.title}
                inputProps={{  minLength: 6,maxLength: 50 }}
                onChange={handleChange}
                ></Input>
            </Grid>
          
            
            <Grid item xs={12}>
              <Input
              disableUnderline={true}
              id='input'
              fullWidth
                placeholder="how many bedrooms"
                name="bedrooms"
                type='number'
                value={formValues.bedrooms}
                inputProps={{  minLength: 1,maxLength: 10 }}
                onChange={handleChange}
              ></Input>
            </Grid>
             
            <Grid item xs={12}>
              <Input
              disableUnderline={true}
              id='input'
              fullWidth
                placeholder="price in DH"
                name="price"
                value={formValues.price}
                type='number'
                inputProps={{  minLength: 500,maxLength: 100000 }}
                onChange={handleChange}
              ></Input>
            </Grid>
            <Grid item xs={12}>
              <Input
              disableUnderline={true}
              id='input'
              fullWidth
                placeholder="city"
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
                placeholder="propery address"
                name="address"
                value={formValues.address}
                inputProps={{  minLength: 8,maxLength: 16 }}    
                onChange={handleChange}
              ></Input>
            </Grid>
           
            <Grid item xs={12}>
            <Select
              fullWidth
              label="property type"
              name="propertytype"
              value={formValues.propertytype}
              onChange={handleChange}
            >
              {propertytypes.map((propertytype) => (
                <MenuItem key={propertytype.value} value={propertytype.value}>
                  {propertytype.label}
                </MenuItem>
              ))}
            </Select>
          </Grid> 
            <Grid item xs={12}>
            <Input
            id='input'
            fullWidth
            disableUnderline
        placeholder="what area (downtown,country side...)"
        name="area"
        value={formValues.area}
        inputProps={{  minLength: 8,maxLength: 150 }}
        onChange={handleChange}
        multiline
        rows={4}
      ></Input>
            </Grid> 
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
              Add property
            </Button>
           
            </Grid>
            <Grid item xs={12}sx={{ justifyContent:"center",alignItems:"center",display:'flex'}} >
          {res!=""&&<Typography  >{error}</Typography>
          }
          <Typography  >{res}</Typography>
  
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
