import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { authReducer } from './components/auth/AuthSlice';
import { sellerReducer } from './components/backoffice/sellers/SellersSlice';
import { clientReducer } from './components/backoffice/clients/ClientsSlice';
import { sellerPropertyReducer } from './components/sellers/home/PropertySlice';
import { demandReducer } from './components/sellers/demands/DemandsSlice';
import { propertyReviewReducer  } from './components/sellers/propertyReviews/ReviewsSlice';
import { chatReducer } from './components/chat/ChatSlice';
import { userDataReducer } from './components/profiles/UserdataSlice';
import { reviewReducer } from './components/sellers/reviews/ReviewsSlice';
import { notificationsReducer } from './components/sellers/notifications/NotificationsSlice';
import { logoutReducer } from './components/logout/LogoutSlice';
import { contactReducer } from './components/landingPage/ContactusSlice';
import { savesReducer } from './components/clients/saves/SavesSlice';  
export const store = configureStore({
reducer:{
  auth: authReducer,
  seller:sellerReducer,
  client:clientReducer,
  demand:demandReducer,
  sellerProperty:sellerPropertyReducer,
  propertyReview:propertyReviewReducer,
  chat:chatReducer,
  userdata:userDataReducer,
  review:reviewReducer,
  notification:notificationsReducer,
  logout:logoutReducer,
  contact:contactReducer,
  saves:savesReducer
}
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();