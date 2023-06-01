import { Avatar, Box, Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, Input, Rating, Typography, Snackbar } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { photos_url } from '../../../photos_url';  
import { RootState,useAppDispatch } from '../../../store';
import { getUserdata } from '../../profiles/UserdataApi'; 
import SendIcon from '@mui/icons-material/Send';
import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd';
import { checkReviews, showReviews, storeReview } from '../propertyReviews/ReviewsApi';
import { ReviewResponse } from '../../../models/Review';  
import PropertyReviewCard from '../propertyReviews/ReviewsCard';
import { toggleChecked } from '../propertyReviews/ReviewsSlice';
import { images_url } from '../../../images_url';
import { showPropertyDetails } from '../home/PropertyApi';
import { storeDemand } from '../demands/DemandsApi';
import { storeSave } from '../../clients/saves/SavesApi';
 

export default function ProperyDetails() {
const userdata=useSelector((state:RootState)=>state.userdata.data);
const property=useSelector((state:RootState)=>state.sellerProperty.property);
const isLoading=useSelector((state:RootState)=>state.sellerProperty.isLoading);
const reviews=useSelector((state:RootState)=>state.propertyReview.data);
const checked=useSelector((state:RootState)=>state.propertyReview.checked);
const wasAdded=useSelector((state:RootState)=>state.demand.wasAdded);
const isactive=useSelector((state:RootState)=>state.sellerProperty.isactive);
const [openSnackbar,setOpenSnackbar]=useState<boolean>(false);
const dispatch=useAppDispatch();
const [value, setValue] = React.useState<number>(0);

const user=JSON.parse(localStorage.getItem('user')??"");
const url = new URLSearchParams(useLocation().search);
let property_id = url.get("property_id");
let owner_id = url.get("owner_id");
const navigate=useNavigate();

const [rating, setRating] = React.useState<number>(2);
const [review, setReview] = React.useState<string>("");
const [error, setError] = React.useState<string>(""); 


 
const sendReview = () => {
  if(review==""||!rating){
    setError('all fields are required');

  }else{
    if(property_id&&owner_id)
    dispatch(storeReview({property_id:property_id,client_id:user.userid,seller_id:owner_id,review:review,rating:rating})).then(()=>{
      dispatch(toggleChecked());
      if(property_id!=null){
        dispatch(showReviews(property_id));
      }
    })
  }

};

useEffect(()=>{
  if(property_id!=null&&user!=null){
    dispatch(showPropertyDetails(property_id));
    dispatch(checkReviews({client_id:user.userid,property_id:property_id})).then((result)=>{
      if(result.payload.checked){
        if(user.userid==owner_id){
            dispatch(toggleChecked()); 
            
        }
      }})
  }

  

},[]);

 
useEffect(()=>{ 
  dispatch(getUserdata(owner_id)).then((result)=>{
    if(result.payload.userdata.userid==""){
      navigate(`/${user.role=="seller"?"owner":"client"}/${"home"}`);
    }
    
  })
 
},[]);
useEffect(()=>{
if(property_id!=null){
  dispatch(showReviews(property_id));
}

},[dispatch]);
 
   
const sendOrder=( )=>{
  if(property_id!=null&&owner_id){
    dispatch(storeDemand({property_id:property_id,sender_id:user.userid,receiver_id:owner_id}))
    .then(()=>{
      setOpenSnackbar(true);
    });  
  }
}
  

const save = () => { 
  dispatch(storeSave({property_id:property.property_id,client_id:user.userid})) 
  .then(()=>{
    setOpenSnackbar(true);
  });  
   };
  return (
    <Grid container>
     
  <Grid item xs={12}>
      <Typography   sx={{fontSize:{xs:"18px" },mt:2}}>property details</Typography>
  </Grid>
      <Grid item xs={12} sx={{display:{md:'flex'}}} columnGap={1} alignItems="center" mt={2}>
        <Avatar sx={{width:{xs:"25px",md:"40px",lg:"40px"},height:{xs:"25px",md:"40px",lg:"40px"} 
        ,borderRadius:"32px"}} src={`${photos_url}${userdata.photo}`}></Avatar>
      <Grid item xs={12} rowGap={2}  >
      <Grid item xs={12} rowGap={2} sx={{display:{md:'flex'}}} columnGap={2} alignItems="center" mt={2}>
        <Typography  sx={{fontSize:{xs:"12px",md:"16px" }}}>{userdata.fullname}</Typography>

      </Grid>
      
      </Grid> 
      </Grid>
 
      <Grid item xs={12} md={10} sx={{display:{md:'flex'}}} columnGap={4} alignItems="center" mt={2}>
        <Avatar sx={{height:{xs:"250px" },width:"100%" 
        ,borderRadius:"32px 32px 0 0"}} src={`${images_url}${property.image}`}></Avatar>
      </Grid>
      <Grid item xs={12} rowGap={2}  >
        
      <Grid item xs={12} rowGap={2} sx={{display:{md:'flex'}}} columnGap={4} alignItems="center" mt={2}>
        <Typography  sx={{fontSize:{xs:"18px",md:"24px",lg:"32px"}}}>{property.title}</Typography>
  <Rating sx={{fontSize:{xs:"18px",md:"24px",lg:"32px"}}} color='primary' name="read-only" value={Number.parseFloat(property.rating)} readOnly />

      </Grid>
      <Grid item xs={12} rowGap={2} sx={{display:{md:'flex'} }} columnGap={4} alignItems="center" mt={2}>
       {owner_id!=user.userid&&<Button disabled={property.isactive=="0"&&true} onClick={sendOrder}><SendIcon  sx={{mr:1}}/> send order</Button>} 
       {user.role=="client"&& <Button  onClick={save}><BookmarkAddIcon  sx={{mr:1}}/>save property</Button>} 
        
      </Grid>
 
      </Grid> 
 
      <Grid item xs={12} mt={2} display="flex">
      <Typography  sx={{fontSize:{xs:"12px",md:"18px" ,},color:"gray" }} >city : {property.city}/</Typography>
      <Typography  sx={{fontSize:{xs:"12px",md:"18px" ,},color:"gray" }} >{property.address}</Typography>
      </Grid>
      <Grid item xs={12} mt={2}>
      <Typography  sx={{fontSize:{xs:"12px",md:"18px" ,},color:"gray" }}  >property type : {property.propertytype}</Typography>
      </Grid>
      <Grid item xs={12} mt={2}>
      <Typography  sx={{fontSize:{xs:"12px",md:"18px" ,},color:"gray" }}  >action type : {property.actiontype}</Typography>
      </Grid>
      <Grid item xs={12} mt={2}>
      <Typography  sx={{fontSize:{xs:"12px",md:"18px" ,},color:"gray" }}  >price : {property.price}DH</Typography>
      </Grid>
      <Grid item xs={8} mt={2}>
      <Typography  sx={{fontSize:{xs:"12px",md:"18px" ,},color:"gray" }}  >bedrooms : {property.bedrooms}</Typography>
      </Grid> 
      
 
     
     <Grid item xs={12} >
   
     <Grid item xs={12} ><Typography variant='h2' sx={{textAlign:"center"}}>Reviews</Typography></Grid>
      <Grid item xs={12} mt={4}>
      {isLoading&&(<Grid item xs={12} mt={2} sx={{ justifyContent:"center",alignItems:"center",display:'flex'}} >
   
   <CircularProgress color='primary'  />
  </Grid>)
             }
        {
           reviews.map((review:ReviewResponse)=>
        <PropertyReviewCard id={review.id} client_id={review.client_id} seller_id={review.seller_id}
                            fullname={review.fullname} photo={review.photo} created_at={review.created_at} 
                            rating={review.rating} review={review.review}/>
        )
        }
      </Grid>
      </Grid>
    
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

<Snackbar
  open={openSnackbar}
  onClose={()=>setOpenSnackbar(false)}
  message="succeed"
  autoHideDuration={6000}/>

    </Grid>
  )
}
