import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { BrowserRouter } from 'react-router-dom';

const theme = createTheme({
  palette: {
    primary: {
      main: "#18273d",
    },
    secondary: {
      main: "#249e48" 
    } 
  }, 
   typography: {
    fontFamily: 'Outfit',
    
    h2: {
      fontSize: '2rem',
    },
  },

});
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <BrowserRouter>

  <React.StrictMode>
    <ThemeProvider  theme={theme}>
<App />
      </ThemeProvider>
  </React.StrictMode>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
