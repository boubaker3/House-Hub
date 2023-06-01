import { Avatar, Box, Button, CircularProgress, Tab, Tabs,  Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, Input, Rating, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { photos_url } from '../../photos_url';
import { RootState,useAppDispatch } from '../../store';
import { getUserdata } from './UserdataApi';
import EditIcon from '@mui/icons-material/Edit';
import SendIcon from '@mui/icons-material/Send';
import { checkReviews, showReviews, storeReview } from '../sellers/reviews/ReviewsApi';
import { ReviewResponse } from '../../models/Review';
import ProfileReviewCard from './ProfileReviewCard';
import { toggleChecked } from '../sellers/reviews/ReviewsSlice';
import { LocalizationProvider, DateField } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { PropertyResponse } from '../../models/Property';
import PropertyCard from '../sellers/home/PropertyCard';
import { showProperties } from '../sellers/home/PropertyApi';
import { showSaves, storeSave } from '../clients/saves/SavesApi';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
};


function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}
function TabPanel(props: TabPanelProps) {
  const { children, value, index } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
    >
      {value === index && (
        <Box sx={{ mt: {xs:2,md:10} }} >
        {children} 
        </Box>
      )}
    </div>
  );
}

export default function Profile() {
const userdata=useSelector((state:RootState)=>state.userdata.data);
const reviews=useSelector((state:RootState)=>state.review.data);
const saves=useSelector((state:RootState)=>state.saves.data);
const isLoading=useSelector((state:RootState)=>state.saves.isLoading);
const isLoadingReviews=useSelector((state:RootState)=>state.review.isLoading);
const checked=useSelector((state:RootState)=>state.review.checked);
const dispatch=useAppDispatch();
const [value, setValue] = React.useState<number>(0);

const user=JSON.parse(localStorage.getItem('user')??"");
const url = new URLSearchParams(useLocation().search);
let userid = url.get("userid");
const navigate=useNavigate();

const [openOrderDialog, setOpenOrderDialog] = React.useState(false);
const [rating, setRating] = React.useState<number>(2);
const [review, setReview] = React.useState<string>("");
const [error, setError] = React.useState<string>(""); 

const properties=useSelector((state:RootState)=>state.sellerProperty.data);
  const isLoadingProperties=useSelector((state:RootState)=>state.sellerProperty.isLoading);

 
const sendReview = () => {
  if(review==""||!rating){
    setError('all fields are required');

  }else{
    dispatch(storeReview({client_id:user.userid,seller_id:userid,review:review,rating:rating})).then(()=>{
      dispatch(toggleChecked());
      dispatch(showReviews(userid));
    })
  }

}; 

useEffect(()=>{
  dispatch(checkReviews({sender_id:user.userid,receiver_id:userid})).then((result)=>{
if(result.payload.checked){
  if(user.userid==userid){
      dispatch(toggleChecked()); 
      
  }
}
  })

},[]);

const handleChange = (event: React.SyntheticEvent, newValue: number) => {
  setValue(newValue);
};

useEffect(()=>{
  if(userid==null){
    userid=user.userid;
   }
  dispatch(getUserdata(userid)).then((result)=>{
    if(result.payload.userdata.userid==""){
      navigate(`/${user.role=="seller"?"owner":"client"}/${"home"}`);
    }
    else{
      dispatch(showProperties({seller_id:userdata.userid,orderBy:"ASC",bedrooms:"null",
    city:'null',actiontype:'null',propertytype:'null',area:"null"}));
    dispatch(showSaves(userdata.userid));
    }
  })
 
},[]);
useEffect(()=>{
  dispatch(showReviews(userid));
  },[dispatch]);

  const handleClose = () => {
    setOpenOrderDialog(false);
  };
     
 
  
  return (
    <Grid container>
     
  <Grid item xs={12}>
      <Typography   sx={{fontSize:{xs:"18px" },mt:2}}>profile</Typography>
  </Grid>
      <Grid item xs={12} sx={{display:{md:'flex'}}} columnGap={4} alignItems="center" mt={2}>
        <Avatar sx={{width:{xs:"150px",md:"150px",lg:"200px"},height:{xs:"150px",md:"150px",lg:"200px"} 
        ,borderRadius:"32px"}} src={`${photos_url}${userdata.photo}`}></Avatar>
      <Grid item xs={12} rowGap={2}  >
      <Grid item xs={12} rowGap={2} sx={{display:{md:'flex'}}} columnGap={4} alignItems="center" mt={2}>
        <Typography  sx={{fontSize:{xs:"18px",md:"24px",lg:"32px"}}}>{userdata.fullname}</Typography>
{
  userdata.role=="seller"&&
  <Rating sx={{fontSize:{xs:"18px",md:"24px",lg:"32px"}}} color='primary' name="read-only" value={Number.parseFloat(userdata.rating)} readOnly />

}
      </Grid>
      <Grid item xs={12} rowGap={2} sx={{display:{md:'flex'} }} columnGap={4} alignItems="center" mt={2}>
      {userid==user.userid&&<Button component={Link}  to={`/${user.role=="seller"?"owner":"client"}/editProfile`}><EditIcon sx={{mr:1}}/>edit</Button>}  
       {userid!=user.userid||!userid&&<Button component={Link}  to={`/${user.role}/chat?userid=${userid}`}><SendIcon  sx={{mr:1}}/> chat</Button>} 
        
      </Grid>
      </Grid> 
      </Grid>
 
      <Grid item xs={12} mt={2} display="flex">
      <Typography  sx={{fontSize:{xs:"12px",md:"18px" ,},color:"gray" }} >city : {userdata.city}/</Typography>
      <Typography  sx={{fontSize:{xs:"12px",md:"18px" ,},color:"gray" }} >{userdata.address}</Typography>
      </Grid>
      <Grid item xs={12} mt={2}>
      <Typography  sx={{fontSize:{xs:"12px",md:"18px" ,},color:"gray" }}  >phone : {userdata.phone}</Typography>
      </Grid>
      <Grid item xs={12} mt={2}>
      <Typography  sx={{fontSize:{xs:"12px",md:"18px" ,},color:"gray" }}  >email : {userdata.email}</Typography>
      </Grid>
      <Grid item xs={12} mt={2}>
      <Typography  sx={{fontSize:{xs:"12px",md:"18px" ,},color:"gray" }}  >role : {userdata.role}</Typography>
      </Grid>
      {userdata.role=="seller"&&
      <Grid item xs={8} mt={2}>
      <Typography  sx={{fontSize:{xs:"12px",md:"18px" ,},color:"gray" }}  >bio : {userdata.bio}</Typography>
      </Grid>}
      

   

     {userdata.role=='seller'&& 
     <>
     <Grid item xs={12}  mt={4} justifyContent="center" display="flex">
     <Tabs
     value={value}
     onChange={handleChange}
     variant="scrollable"
     scrollButtons="auto"
    TabIndicatorProps={{
       sx: {
        height: "100%",
         borderRadius:"32px", zIndex:-1,
          },
     }}
   >
       <Tab 
       key={0}
         label="Properties"
         href=""
         {...a11yProps(0)}
         sx={{
          fontSize:{xs:"12px",md:"16px"},
         fontWeight:"bold",
         color: "black",
           "&.Mui-selected": {
             color: "white"
           }
         }} 
         />
          <Tab 
       key={1}
         label="reviews"
         href=""
         {...a11yProps(1)}
         sx={{
          fontSize:{xs:"12px",md:"16px"},
         fontWeight:"bold",
         color: "black",
           "&.Mui-selected": {
             color: "white"
           }
         }} 
         />
   </Tabs>
     </Grid>
     <Grid item xs={12} >
     <TabPanel value={value} index={0}>
     <Grid item xs={12} ><Typography variant='h2' sx={{textAlign:"center"}}>Properties</Typography></Grid>
     <Grid item xs={12} sx={{display:{md:'flex'}}}>
       {!isLoadingProperties?
       properties.map((property:PropertyResponse)=><Grid item xs={12} md={6} lg={3} ml={2}>
        <PropertyCard fullname={property.fullname} photo={property.photo} userid={property.userid} title={property.title}  property_seller_id={property.property_seller_id}
          property_id={property.property_id} image={property.image} 
          propertytype={property.propertytype} price={property.price} area={property.area}
           bedrooms={property.bedrooms} city={property.city} actiontype={property.actiontype} 
         address={property.address} rating={property.rating} created_at={property.created_at}/></Grid>)
       

       :(<Grid item xs={12} mt={2} sx={{ justifyContent:"center",alignItems:"center",display:'flex'}} >
   
   <CircularProgress color='primary'  />
  </Grid>)
             }
        
      </Grid>
       </TabPanel>
       <TabPanel value={value} index={1}>
    
       <Grid item xs={12} mt={2}>
      <Grid item xs={12} ><Typography variant='h2' sx={{textAlign:"center"}}>Reviews</Typography></Grid>
      <Grid item xs={12} mt={4}>
      {isLoadingReviews&&(<Grid item xs={12} mt={2} sx={{ justifyContent:"center",alignItems:"center",display:'flex'}} >
   
   <CircularProgress color='primary'  />
  </Grid>)
             }
        {
           reviews.map((review:ReviewResponse)=>
        <ProfileReviewCard id={review.id} client_id={review.client_id} seller_id={review.seller_id}
                            fullname={review.fullname} photo={review.photo} created_at={review.created_at} 
                            rating={review.rating} review={review.review}/>
        )
        }
      </Grid>
      
      </Grid>
       </TabPanel>
        
      </Grid>
      </>
     }
     {
      userdata.role=="seller"&&
      <Dialog
        open={checked}
        keepMounted
        onClose={sendReview}
        aria-describedby="alert-dialog-slide-description"
        sx={{
          color: 'gray', 
        }} >
        <DialogTitle sx={{textAlign:'center',fontSize:"32px"}}>Rate {userdata.fullname}{checked}</DialogTitle>
        <DialogContent >

        <Avatar sx={{width:{xs:"150px",md:"150px",lg:"200px"},height:{xs:"150px",md:"150px",lg:"200px"} 
        ,borderRadius:"32px",margin:"0 auto"}} src={`${photos_url}${userdata.photo}`}></Avatar>
<Grid container justifyContent="center" display='flex'>
          <Rating sx={{fontSize:"64px",color:"primary.main",mt:2}}
  size="large"
  color='primary'
  name="half-rating"
  onChange={(e) => {
    const value = (e.target as HTMLInputElement).value;
    setRating(Number.parseInt(value));
  }}
  defaultValue={2}
             precision={1}
              />
</Grid>

          <Input
            id='input'
            fullWidth
            disableUnderline
        placeholder="write you review"
        value={review}
        inputProps={{  minLength: 4,maxLength: 150 }}
         onChange={(e)=>setReview(e.target.value)}
        multiline
        rows={4}
      ></Input>
<Typography  >{error}</Typography>

        </DialogContent>
        <DialogActions>
          <Button onClick={sendReview}>Send the review</Button>
        </DialogActions>
        <DialogActions>
          <Button onClick={() =>dispatch(toggleChecked())}>No thanks</Button>
        </DialogActions>
      </Dialog> 
     }
   {userdata.role=="client"&& 
   <Grid item xs={12}>
     <Grid item xs={12} ><Typography variant='h2' sx={{textAlign:"center"}}>Saved Properties</Typography></Grid>
     <Grid item xs={12} sx={{display:{md:'flex'}}}>
       {!isLoading?
       saves.map((property:PropertyResponse)=><Grid item xs={12} md={6} lg={3} ml={2}>
        <PropertyCard fullname={property.fullname} photo={property.photo} userid={property.userid} title={property.title}  property_seller_id={property.property_seller_id}
          property_id={property.property_id} image={property.image} 
          propertytype={property.propertytype} price={property.price} area={property.area}
           bedrooms={property.bedrooms} city={property.city} actiontype={property.actiontype} 
         address={property.address} rating={property.rating} created_at={property.created_at}/></Grid>)
       

       :(<Grid item xs={12} mt={2} sx={{ justifyContent:"center",alignItems:"center",display:'flex'}} >
   
   <CircularProgress color='primary'  />
  </Grid>)
             }
        
      </Grid>
      </Grid>
    }

    </Grid>
  )
}
