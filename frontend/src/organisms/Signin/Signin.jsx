/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-console */
import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
// styles
import styles from './SignIn.module.scss';

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      Copyright © <strong>Shelter</strong> {new Date().getFullYear()}
    </Typography>
  );
}

const defaultTheme = createTheme();

export default function Signin() {
  let navigate = useNavigate();
  const location = useLocation();

  // Accessing the state object from the current route
  const fromSignUp = location?.state?.fromSignUp;
  const unitAvailable = location?.state?.unitAvailable;
  const buildingName = location?.state?.buildingName;
  const listingId =  location?.state?.listingId;


// Accessing the state object from the current route
  // const isFromSignUp = location.state
  console.log(fromSignUp);

  const [inputs, setInputs] = useState({
    password: '',
    email: '',
  });

  const [errors, setErrors] = useState({
    passwordError: '',
    emailError: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  const validateFields = () => {
    const { email, password } = inputs;
    let isValid = true;

    const emailError = email.trim() === '' ? 'Email is required' : '';
    const passwordError = password.trim() === '' ? 'Password is required' : '';

    if (emailError || passwordError) {
      isValid = false;
    }

    setErrors({ emailError, passwordError });
    return isValid;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (validateFields()) {
      const { password, email } = inputs;
      const data = { email, password };
      // console.log(data);
      axios.post('http://localhost:3001/auth/login', data).then((response) => {
        if (response.data.error) {
          // eslint-disable-next-line no-alert
          alert(response.data.error);
        } else {
          console.log(response.data);
          sessionStorage.setItem('userCred', JSON.stringify(response?.data));
          if (fromSignUp) {
            navigate('/application', {
              state: { unitAvailable, buildingName, listingId }, // Your state object
            });
          } else {
            navigate('/home');
          }
        }
      });
    }
  };
  // console.log(isFromSignUp, "isfrom");
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
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={handleInputChange}
              error={!!errors.emailError}
              helperText={errors.emailError}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={handleInputChange}
              error={!!errors.passwordError}
              helperText={errors.passwordError}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <button
              type="button"
              className={styles.linkToSignUp}
              onClick={() => navigate('/signup')}
            >
              <span> Do not have an account? </span>
              <span> Sign Up </span>
            </button>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}
