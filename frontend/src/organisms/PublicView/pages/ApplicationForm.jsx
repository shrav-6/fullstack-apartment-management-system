import React, { useContext } from "react";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState } from 'react';
import {useLocation, useNavigate } from 'react-router-dom';
import { useRoomContext } from "../context";
import axios from "axios";

export default function ApplicationForm() {

  const context = useRoomContext();
  const location = useLocation();
  const navigate = useNavigate();

  // Accessing the state object from the current route
  const unitAvailable = location?.state?.unitAvailable;
  const buildingName = location?.state?.buildingName;
  const listingId= location?.state?.listingId;
  console.log(listingId);

  const [formData, setFormData] = useState({
    moveInDate: '',
    needParking: false,
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    address: '',
    additionalInfo: ''
  });
  const [errors, setErrors] = useState({});

    
    const validateFields = () => {
      let isValid = true;
  
      if (formData.moveInDate === '' || formData.firstName === '' || formData.lastName === '' || formData.email === '' || formData.phoneNumber === '' || formData.address === '') {
        setErrors({ ...errors, requiredFields: 'Please fill in all required fields.' });
        isValid=false
        return isValid;
      }
      return isValid;
    };
  
    async function handleSubmit(event){
      event.preventDefault();
  
      if (validateFields()) {
        const data = {...formData,listingId:listingId};
        console.log(data);
        const response=await axios.post('http://localhost:3001/Applications/create', data,
        {
          headers: {
            accessToken: JSON.parse(sessionStorage.getItem('userCred'))?.token,
          },
        }
      );
      if (response.data.error) {
           
            alert(response.data.message);
       } else {
        navigate('/home')
          }
      }
    };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();
  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(https://www.clagett.com/wp-content/uploads/2017/03/rental-property.jpg)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundAttachment: 'fixed',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
             <Avatar sx={{ m: 1, bgcolor: '#1273de' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Application for Apartment:{unitAvailable}:{buildingName}
            
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
                margin="normal"
                required
                fullWidth
                id="moveInDate"
                label="Your expected move in date"
                type="date"
                name="moveInDate"
                InputLabelProps={{
                  shrink: true,
                }}
                InputProps={{
                  placeholder: '',
                }}
                onChange={handleInputChange}
                value={formData.moveInDate}
              />

            <FormControlLabel
              control={<Checkbox color="primary" />}
              label="Do you need parking?"
              name="needParking"
              checked={formData.needParking}
              onChange={(e) => setFormData({ ...formData, needParking: e.target.checked })}
            />
            <hr style={{ width: '100%', marginTop: '20px', marginBottom: '20px' }} />
            <TextField
              margin="normal"
              required
              fullWidth
              id="firstName"
              label="First Name"
              name="firstName"
              autoComplete="your name"
              onChange={handleInputChange}
              value={formData.firstName}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="lastName"
              label="Last Name"
              name="lastName"
              autoComplete="sur-name"
              onChange={handleInputChange}
              value={formData.lastName}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Your email address*"
              name="email"
              autoComplete="email"
              onChange={handleInputChange}
              value={formData.email}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="phoneNumber"
              label="Phone Number"
              name="phoneNumber"
              type="tel"
              pattern="[0-9]{10}"
              onChange={handleInputChange}
              value={formData.phoneNumber}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="address"
              label="Address"
              name="address"
              multiline
              rows={4}
              onChange={handleInputChange}
              value={formData.address}
            />
            <TextField
              margin="normal"
              fullWidth
              id="additionalInfo"
              label="Additional info"
              name="additionalInfo"
              multiline
              rows={4}
              onChange={handleInputChange}
              value={formData.additionalInfo}
            />
            {errors.requiredFields && <p>{errors.requiredFields}</p>}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Submit
            </Button>
          </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}