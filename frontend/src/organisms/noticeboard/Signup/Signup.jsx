/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
/* eslint-disable no-alert */
/* eslint-disable react/jsx-props-no-spreading */
import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState } from 'react';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// phoneNumber,address

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <h1>
        Shelter
      </h1>
      {new Date().getFullYear()}
      .
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function SignUp() {
  const navigate = useNavigate();

  const [inputs, setInputs] = useState({
    userName: '',
    password: '',
    email: '',
    role: '',
    apartmentNumber: '',
    buildingName: '',
    phoneNumber: '',
    address: '',
    name1: '',
    showFields: false,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setInputs({
      ...inputs,
      [name]: value,
      showFields: (name === 'role' && value === 'Tenant') || name === 'apartmentNumber' || name === 'buildingName',
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (role === 'Manager') {
      const {
        role, userName, password, email, name1, phoneNumber, address,
      } = inputs;
      const data = {
        userName,
        email,
        password,
        name: name1,
        role,
        phoneNumber,
        address,
      };
      console.log(data);
      axios.post('https://shelter-project2.onrender.com/auth/signup', data).then((response) => {
        if (response.data.error) {
          alert(response.data.error);
        } else {
          localStorage.setItem('token', response.data.token);
          navigate('/signin');
        }
      });
    } else {
      const {
        role, userName, password, email, name1, phoneNumber, address, apartmentNumber, buildingName,
      } = inputs;
      const data = {
        userName,
        email,
        password,
        name: name1,
        role,
        phoneNumber,
        address,
        buildingName,
        apartmentNumber,
      };
      console.log(data);
      axios.post('https://shelter-project2.onrender.com/auth/signup', data).then((response) => {
        if (response.data.error) {
          alert(response.data.error);
        } else {
          localStorage.setItem('token', response.data.token);
          navigate('/signin');
        }
      });
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="Username"
                  name="userName"
                  required
                  fullWidth
                  id="userName"
                  label="Username"
                  onChange={handleInputChange}

                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="name1"
                  label="Name"
                  name="name1"
                  onChange={handleInputChange}
                  autoComplete="Name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  onChange={handleInputChange}
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  onChange={handleInputChange}
                  autoComplete="password"
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="phoneNumber"
                  label="Phone Number"
                  id="phoneNumber"
                  onChange={handleInputChange}
                  autoComplete="Phone Number"
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="address"
                  label="Address"
                  id="address"
                  onChange={handleInputChange}
                  autoComplete="Address"
                />
              </Grid>

              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel htmlFor="role">Select Role</InputLabel>
                  <Select
                    id="role"
                    name="role"
                    onChange={handleInputChange}
                  >
                    <InputLabel htmlFor="role">Select Role</InputLabel>
                    <MenuItem value="Manager">Manager</MenuItem>
                    <MenuItem value="Tenant">Tenant</MenuItem>
                    <MenuItem value="Role">Guest</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              {inputs.showFields && (
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="apartmentNumber"
                    label="Apartment Number"
                    id="apartmentNumber"
                    onChange={handleInputChange}
                    autoComplete="apartmentNumber"
                  />
                </Grid>

              )}
              {inputs.showFields && (
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="buildingName"
                    label="Building Name"
                    id="buildingName"
                    onChange={handleInputChange}
                    autoComplete="buildingName"
                  />
                </Grid>

              )}

            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/signin" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}
