import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
 
function UpdateListings() {
  const location = useLocation();
  const selectedListing = location.state?.selectedListing;
  const buildingName = location.state?.buildingName;
  console.log('buildingName', buildingName);
  console.log('inside update listings: array', selectedListing);
  const [formData, setFormData] = useState({
    unitAvailable: '',
    apartmentNumber: '',
    rent: '',
    address: '',
    pets: '',
    startsFrom: '',
    description: '',
    extras: '',
    buildingName: '',
  });
 
  const navigate = useNavigate();
 
  useEffect(() => {
    // Set form data with selected listing values when component mounts
    if (selectedListing) {
      setFormData({
        unitAvailable: selectedListing.unitAvailable,
        apartmentNumber: selectedListing.apartmentNumber,
        rent: selectedListing.rent,
        address: selectedListing.address,
        pets: selectedListing.pets,
        startsFrom: selectedListing.startsFrom,
        description: selectedListing.description,
        extras: selectedListing.extras,
        buildingName: selectedListing.buildingName,
      });
    }
  }, [selectedListing]);
 
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
 
  const handleSubmit = (e) => {
    e.preventDefault();
    // Implement logic to update the listing on the backend
    axios
      .put(`http://localhost:3001/Listings/${selectedListing.id}`, formData, {
        headers: {
          accessToken: JSON.parse(sessionStorage.getItem('userCred'))?.token,
        },
      })
      .then((response) => {
        console.log('Listing updated successfully:', response);
        // Redirect to the view listings page after updating
        navigate('/listings');
      })
      .catch((error) => {
        console.error('Error updating listing:', error);
      });
  };
 
  return (
    <div>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
       <Typography variant="h6">
        Edit Listing
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
            value={buildingName}
            placeholder="Enter the building Name"
          />
        </Grid>
      </Grid>
      <div align="center"> <button type="submit" className="btn btn-success" onClick={handleSubmit}> Update </button></div>  
    </div>
  );
}
 
export default UpdateListings;