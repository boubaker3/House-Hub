import React, { useEffect } from 'react';
import {  Route,Routes } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import Auth from './components/auth/Auth';
import LandingPage from './components/landingPage/LandingPage';
import "./app.css";
import Login from './components/auth/login/Login';
import Signup from './components/auth/signup/Signup';
import { Provider } from "react-redux";
import { store } from "./store"; 
import BackOffice from './components/backoffice/BackOffice';
import Sellers from './components/backoffice/sellers/Sellers';
import Clients from './components/backoffice/clients/Clients';
import DemandsBO from './components/backoffice/demands/Demands';
 
import Seller from './components/sellers/Seller';
import SellerHome from './components/sellers/home/Home';
import AddProperty from './components/sellers/property/AddProperty';
import SellerDemands from './components/sellers/demands/Demands';
import SellerChat from './components/sellers/chat/Chat';
 import Profile from './components/profiles/Profile';
import EditProfile from './components/profiles/EditProfile';
import Notifications from './components/sellers/notifications/Notifications';

import Client from './components/clients/Client';
import ClientHome from './components/clients/home/Home';
import ClientDemands from './components/clients/demands/Demands';
import ClientChat from './components/clients/chat/Chat';
import Logout from './components/logout/Logout';
import ProperyDetails from './components/sellers/property/PropertyDetails';

function App() {
  const navigate = useNavigate();
  const user = localStorage.getItem('user');
  const token = localStorage.getItem('token');
useEffect(()=>{
  if (!user || !token) {
  }
},[]);

return (
  <Provider store={store}>
    <div className="App">
        <Routes>
          <Route path='/' element={<LandingPage/>} />
          <Route path='/auth' element={<Auth/>} >
              <Route path='login' element={<Login/>} />
              <Route path='signup' element={<Signup/>} /> 
          </Route>
          {
            user&&<>
              <Route path="/admin" element={<BackOffice/>}>
                <Route path="owners" element={<Sellers/>}/>
                <Route path="clients" element={<Clients/>}/>
                <Route path="demands" element={<DemandsBO/>}/>
                <Route path="profile" element={<Profile/>}/>  
          </Route>
           
          <Route path="/owner" element={<Seller/>}>
                <Route path="home" element={<SellerHome/>}/>
                <Route path="addProperty" element={<AddProperty/>}/>
                <Route path="demands" element={<SellerDemands/>}/>
                <Route path="reviews" element={<Notifications/>}/>
                <Route path="chat" element={<SellerChat/>}/>
                <Route path="profile" element={<Profile/>}/>
                <Route path="editProfile" element={<EditProfile/>}/>
                <Route path="property" element={<ProperyDetails/>}/>
          </Route>

          <Route path="/client" element={<Client/>}>
                <Route path="home" element={<ClientHome/>}/>
                <Route path="demands" element={<ClientDemands/>}/>
                <Route path="chat" element={<ClientChat/>}/>
                <Route path="profile" element={<Profile/>}/>
                <Route path="notifications" element={<Notifications/>}/>
                <Route path="editProfile" element={<EditProfile/>}/>
                <Route path="property" element={<ProperyDetails/>}/>
          </Route>
          <Route path="/logout" element={<Logout/>}/>
                </>
          }
        

        </Routes>
    
    </div>
  </Provider>

  );
}

export default App;