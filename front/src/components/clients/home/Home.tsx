import React, { useEffect } from 'react'
import { Box, Button, CircularProgress, Grid, Input, Dialog, MenuItem, Select, Typography, DialogTitle  } from '@mui/material'
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import Filter from '../../../models/Filter';
import { useSelector } from 'react-redux';
import { RootState,useAppDispatch } from '../../../store';
import PropertyCard from '../../sellers/home/PropertyCard';
import { PropertyResponse } from '../../../models/Property';
import { showProperties } from '../../sellers/home/PropertyApi';  

const bedroomsData=[{value:"1",label:"1 bedroom"},{value:"2",label:"2 bedrooms"},{value:"3",label:"3 bedrooms"},{
  value:"4",label:"4 bedrooms"},{value:"5",label:"5 bedrooms"},{value:"6",label:"6 bedrooms"}];
  const actionTypes = [
    { value: "sell", label: "Sell" },
    { value: "rent", label: "Rent" },
  ];
  const propertyTypes = [
    { value: "Studio", label: "Studio" },
    { value: "Appartement", label: "Appartement" },
    { value: "Villa", label: "Villa" },
  ];

  const areas = [
    { value: "downtown", label: "Downtown" },
    { value: "country side", label: "Country side" },
  ];

  const cities = [
    { value: "Rabat", label: "Rabat" },
    { value: "Casablanca", label: "Casablanca" },
    { value: "Marrakech", label: "Marrakech" },
  ];
export default function Home() {
  const properties=useSelector((state:RootState)=>state.sellerProperty.data);
  const isLoading=useSelector((state:RootState)=>state.sellerProperty.isLoading);
  const user=JSON.parse(localStorage.getItem("user")??"");
  const [city,setCity]=React.useState<string>("Rabat");
  const [actiontype,setActiontype]=React.useState<string>("sell");
  const [propertytype,setPropertytype]=React.useState<string>("Studio");
  const [area,setArea]=React.useState<string>("downtown");
  const [bedrooms,setBedrooms]=React.useState<string>("1");
  const [orderBy,setOrderBy]=React.useState<string>("ASC");
  const [customSearch,setFilterSearch]=React.useState<string>("");

  const dispatch=useAppDispatch();
  useEffect(()=>{
    dispatch(showProperties({seller_id:"null",orderBy:orderBy,bedrooms:bedrooms,
    city:city,actiontype:actiontype,propertytype:propertytype,area:area,customSearch}));
  },[dispatch,orderBy,bedrooms,city,actiontype,propertytype,customSearch,area]);
    

  return (
    <Grid container>
       
      <Grid item xs={12}>
      <Typography   sx={{fontSize:{xs:"18px" },mt:4}}>Available properties</Typography>
      </Grid>
      <Grid container mt={4} justifyContent="center">
      <Grid item xs={12}  md={6}  sx={{ backgroundColor:'#F0F0F0',p:1,borderRadius:"32px",display:'flex'}}>
        <Button >
        <SearchIcon/>
        </Button>
           <Input
           fullWidth  
            
           onChange={(e)=>setFilterSearch(e.target.value)}
              name="customSearch"
              disableUnderline={true} 
              placeholder="search For properties"
              value={ customSearch}
            ></Input>
      </Grid>
      </Grid>
    
      <Grid item xs={12} display='flex ' mt={4} columnGap={1}>
      <Grid item xs={2} >
      <Select  
                label="ordredBy"
                name="orderBy"
                value={orderBy}
                onChange={(e)=>setOrderBy(e.target.value)}
                 defaultValue="newest" >
                  <MenuItem value="ASC">
                     order by: Newest
                  </MenuItem>
                  <MenuItem value="DESC">
                  order by: Oldest
                  </MenuItem>
        </Select>
      </Grid>

      <Grid item xs={1}>
            <Select
              fullWidth
              label="property type"
              value={propertytype}
              onChange={(e)=>setPropertytype(e.target.value)}
            >
              {propertyTypes.map((propertyType) => (
                <MenuItem key={propertyType.value} value={propertyType.value}>
                  {propertyType.label}
                </MenuItem>
              ))}
            </Select>
          </Grid> 


          <Grid item xs={1}>
            <Select
              fullWidth
              label="action type"
              value={actiontype}
              onChange={(e)=>setActiontype(e.target.value)}
            >
              {actionTypes.map((actionType) => (
                <MenuItem key={actionType.value} value={actionType.value}>
                  {actionType.label}
                </MenuItem>
              ))}
            </Select>
          </Grid> 

          <Grid item xs={2}>
            <Select
              fullWidth
              label="bedrooms"
              value={bedrooms}
              onChange={(e)=>setBedrooms(e.target.value)}
            >
              {bedroomsData.map((bedroomData) => (
                <MenuItem key={bedroomData.value} value={bedroomData.value}>
                  {bedroomData.label}
                </MenuItem>
              ))}
            </Select>
          </Grid> 

          <Grid item xs={2}>
            <Select
              fullWidth
              label="city"
              value={city}
              onChange={(e)=>setCity(e.target.value)}
            >
              {cities.map((city) => (
                <MenuItem key={city.value} value={city.value}>
                  {city.label}
                </MenuItem>
              ))}
            </Select>
          </Grid> 


          <Grid item xs={2}>
            <Select
              fullWidth
              label="area"
              value={area}
              onChange={(e)=>setArea(e.target.value)}
            >
              {areas.map((area) => (
                <MenuItem key={area.value} value={area.value}>
                  {area.label}
                </MenuItem>
              ))}
            </Select>
          </Grid> 
          </Grid> 

      
      
      <Grid item xs={12} sx={{display:{md:'flex'}}}>
       {!isLoading?
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

      
    </Grid>
  )
}
