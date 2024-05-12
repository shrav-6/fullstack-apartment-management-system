/* eslint-disable spaced-comment */
/* eslint-disable key-spacing */
/* eslint-disable eol-last */
/* eslint-disable no-console */
/* eslint-disable max-len */
/* eslint-disable react/style-prop-object */
/* eslint-disable react/no-unknown-property */
/* eslint-disable no-trailing-spaces */
/* eslint-disable react/jsx-max-props-per-line */
/* eslint-disable react/jsx-first-prop-new-line */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
// eslint-disable-next-line import/no-unresolved
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';

 
function ListingsForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    unitAvailable: '',
    apartmentNumber: '',
    rent: '',
    address: '',
    pets: '',
    startsFrom: '',
    description: '',
    extras: '',
    buildingName:'',
  });  
 
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
 
  const [images, setImages] = useState([]);
  const handleImageChange = (e) => {    
    const fileArray = Array.from(e.target.files);
    setImages(prevImages => [...prevImages, ...fileArray]);
    console.log('fileArray', fileArray);
  };
 
  const handleSubmit = (e) => {
    e.preventDefault();
    // eslint-disable-next-line no-console
    //sessionStorage.setItem('accessToken', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NSwiZW1haWwiOiJlbDg2NzkwM0BkYWwuY2EiLCJyb2xlIjoiTWFuYWdlciIsImlhdCI6MTY5ODc2NTI1NX0.gf_p-hvMbybFooqzRPFJB2gguiS2bqOpWDGAVBrnXsg');
    console.log('form data', formData);
    // eslint-disable-next-line function-call-argument-newline, function-paren-newline
    axios.post('http://172.17.0.237:8074/Listings', formData,
      {
        headers: {
          accessToken: JSON.parse(sessionStorage.getItem('userCred'))?.token,
        },
      },
    ).then((res) => {
      if (res.data.error) {
        // eslint-disable-next-line no-alert
        alert(res.data.error);
      } else {        
        // eslint-disable-next-line no-console
        console.log('RESPONSE RECEIVED:', res);
        try {
          console.log('Created ListingId:', res.data.data);
          const listingId = res.data.data;
          // Create a folder for storing images (assuming response.data contains the new listing ID)
          const imageFolder = `static/${listingId}`;
          // You can use the listing ID to create a unique folder for each listing
          console.log('image folder', imageFolder);
          // Upload images to the folder
          // const formDataImages = new FormData();
          console.log('images before loop', images);
          /*images.forEach((image, index) => {
            formDataImages.append(`image${index}`, image);
          });
          console.log('formDataImages', formDataImages);*/
          setImages([]);
 
          // navigate to Dashboard
          navigate('/listings');
          //formDataImages.clear;
          //console.log('listingId', listingId);
 
          /*axios.post(`http://172.17.0.237:8074/uploadImages/${listingId}`, images, {
            headers: {
              accessToken: sessionStorage.getItem('accessToken'),
              'Content-Type': 'multipart/form-data',
            },
          });*/
          // eslint-disable-next-line brace-style
          // clear images array at the end          
        // eslint-disable-next-line brace-style
        }  
        // console.log('Images uploaded successfully');*/
        catch (error) {
          console.error('Error creating listing:', error);
        }
      }
    });    
  };
 
  return (
    <div>
      <h1 class="card-header heading" paddingBottom="50px">Add a new listing</h1>
      <form style={{maxWidth:'100%'}} onSubmit={handleSubmit}>
        <br></br>
        <br></br>
        <br></br>
        <Typography variant="h6">
        Add Listing
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} style={{ marginTop: '15px'}}>
          <TextField
            required
            fullWidth
            variant="outlined"
            type="number"
            id="unitAvailable"
            name="unitAvailable"
            label="unitAvailable"
            value={formData.unitAvailable}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}  style={{ marginTop: '15px'}}> 
          <TextField
            required
            label="apartmentNumber"
            fullWidth
            autoComplete="family-name"
            variant="outlined"
            type="number"
            id="apartmentNumber"
            name="apartmentNumber"
            value={formData.apartmentNumber}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            label="rent"
            fullWidth
            variant="outlined"
            type="number"
            id="rent"
            name="rent"
            value={formData.rent}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="address"
            fullWidth
            variant="outlined"
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Enter your address"
            rows="5"
            cols="40"
            required
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            label="pets"
            fullWidth
            variant="outlined"
            type="number"
            id="pets"
            name="pets"
            value={formData.pets}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="startsFrom"
            fullWidth
            variant="outlined"
            type="date"
            id="startsFrom"
            name="startsFrom"
            value={formData.startsFrom}
            onChange={handleChange}
            required
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            label="description"
            fullWidth
            variant="outlined"
            type="text"
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter description"
            rows="5"
            cols="40"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="extras"
            fullWidth
            variant="outlined"
            type="text"
            id="extras"
            name="extras"
            value={formData.extras}
            onChange={handleChange}
            placeholder="Enter additional information"
            rows="5"
            cols="40"
            required
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="buildingName"
            fullWidth
            variant="outlined"
            type="text"
            onChange={handleChange}
            rows="5"
            cols="40"
            required
            id="buildingName"
            name="buildingName"
            value={formData.buildingName}
            placeholder="Enter the building Name"
          />
        </Grid>
      </Grid>
        <br></br>
        <div align="center"> <button type="submit" className="btn btn-success"> Submit </button></div>    
      </form>    
    </div>
  );
}
 
export default ListingsForm;