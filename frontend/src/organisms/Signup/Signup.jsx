/* eslint-disable no-alert */
/* eslint-disable no-console */
/* eslint-disable no-shadow */
import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState, useEffect } from 'react';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const usernameRegex = /^[a-zA-Z]\w{7,}$/;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

function Signup() {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    userName: '',
    password: '',
    password1: '',
    email: '',
    role: '',
    apartmentNumber: '',
    buildingName: '',
    phoneNumber: '',
    address: '',
    name1: '',
    showFields: false,
  });

  const [errors, setErrors] = useState({
    usernameError: '',
    passwordError: '',
    PasswordReentry: '',
  });

  const [buildingNames, setBuildingNames] = useState([]);
  const [selectedBuildingName, setSelectedBuildingName] = useState('');

  useEffect(() => {
    axios.get('http://localhost:3001/Buildings/signup/byName')
      .then((response) => {
        if (response.data.success) {
          setBuildingNames(response.data.result);
        } else {
          console.error('Error fetching building names:', response.data.message);
        }
      })
      .catch((error) => {
        console.error('Error fetching building names:', error);
      });
  }, []);

  const filteredBuildingNames = buildingNames.filter(building => building.buildingName === selectedBuildingName);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setErrors({ usernameError: '', passwordError: '', passwordConfirmationError: '' });
    setInputs({
      ...inputs,
      [name]: value,
      showFields: (name === 'role' && value === 'Tenant') || name === 'apartmentNumber' || name === 'buildingName',
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const { userName, password, password1 } = inputs;
    const usernameError = usernameRegex.test(userName)
      ? ''
      : 'Username should be at least 8 characters and start with an alphabet';
    const passwordError = passwordRegex.test(password)
      ? ''
      : 'Password should be at least 8 characters with at least 1 lowercase and 1 uppercase letter';
    const passwordConfirmationError = password === password1
      ? ''
      : 'Passwords do not match';
    setErrors({ usernameError, passwordError, passwordConfirmationError });

    if (usernameError === '' && passwordError === '' && passwordConfirmationError === '') {
      if (inputs.role === 'Manager') {
        const {
          role, userName, password, email, name1, phoneNumber, address,
        } = inputs;
        const data = {
          userName, email, password, name: name1, role, phoneNumber, address,
        };
        axios.post('http://localhost:3001/auth/signup', data).then((response) => {
          if (response.data.error) {
            alert(response.data.error);
          } else {
            navigate('/signin');
          }
        });
      } else {
        const {
          role, userName, password, email, name1, phoneNumber, address, apartmentNumber, buildingName,
        } = inputs;
        const data = {
          userName, email, password, name: name1, role, phoneNumber, address, apartmentNumber, buildingName,
        };
        console.log('role', role);
        axios.post('http://localhost:3001/auth/signup', data).then((response) => {
          if (response.data.error) {
            alert(response.data.error);
          } else {
            navigate('/signin');
          }
        });
      }
    }
  };

  return (
    <ThemeProvider theme={createTheme()}>
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
                <span style={{ color: 'red' }}>{errors.usernameError}</span>
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
                <span style={{ color: 'red' }}>{errors.passwordError}</span>
              </Grid>

              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password1"
                  label="Repeat Password"
                  type="password"
                  id="password1"
                  onChange={handleInputChange}
                  autoComplete="password"
                />
                <span style={{ color: 'red' }}>{errors.passwordConfirmationError}</span>
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
                    <MenuItem value="Guest">Guest</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              {(inputs.role === 'Tenant') && (
                <>
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
                  <Grid item xs={12}>
                    <FormControl fullWidth>
                      <InputLabel htmlFor="buildingName">Select Building Name</InputLabel>
                      <Select
                        id="buildingName"
                        name="buildingName"
                        onChange={(e) => {
                          handleInputChange(e);
                          setSelectedBuildingName(e.target.value);
                        }}
                      >
                        <InputLabel htmlFor="buildingName">Select Building Name</InputLabel>
                        {buildingNames.map(building => (
                          <MenuItem key={building.buildingName} value={building.buildingName}>
                            {building.buildingName}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                </>
              )}
            </Grid>
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
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
      </Container>
    </ThemeProvider>
  );
}

export default Signup;
