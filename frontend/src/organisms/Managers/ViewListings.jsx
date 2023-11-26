/* eslint-disable no-alert */
/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable spaced-comment */
/* eslint-disable no-console */
/* eslint-disable no-undef */
/* eslint-disable max-len */
// src/pages/PropertyListPage.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import AddIcon from '@mui/icons-material/Add';

import './pageStyle.scss';
import FuzzySearch from 'react-fuzzy';
import AddListing from './addListings';
 
function ViewListings() {
  const location = useLocation();
 
  const buildingId = location.state?.buildingId;
  const buildingName = location.state?.buildingName;
 
  useEffect(() => {
    console.log('buildingName:', buildingName);
  }, [buildingId]);
 
  const [listings, setListings] = useState([]);
  const accessToken = JSON.parse(sessionStorage.getItem('userCred'))?.token;
  console.log('accessToken', accessToken);
  const [selectedListing, setSelectedListing] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    // Fetch property listings from the API when the component mounts
    axios
      .get(`http://localhost:3001/Listings/Building/${buildingId}`, {
        headers: {
          accessToken: JSON.parse(sessionStorage.getItem('userCred'))?.token,
        },
      })
      .then((response) => {
        setListings(response.data);
      })
      .catch((error) => {
        console.error('Error fetching listings:', error);
      });
  }, [accessToken]);
 
  const [listingImages, setListingImages] = useState({});
 
  const handleUpdate = (listingId) => {
    // Find the selected listing based on listingId
    const selectedListing = listings.data.find(listing => listing.id === listingId);
 
    // Set the selectedListing in the state
    setSelectedListing(selectedListing);
    console.log('selectedlisting', selectedListing);
 
    // Navigate to the AddListing component
    navigate('/updateListing', { state: { selectedListing, buildingName } });
  };
 
  const handleDelete = (listingId) => {
    axios
      .delete(`http://localhost:3001/Listings/${listingId}`, {
        headers: {
          accessToken: JSON.parse(sessionStorage.getItem('userCred'))?.token,
        },
      })
      .then((response) => {
        console.log('Listing deleted successfully:', response);
        // Update the local state or perform any other necessary actions
        // Reload the page after deletion
        window.location.reload();
      })
      .catch((error) => {
        console.error('Error deleting listing:', error);
      });
  };
 
  const handleViewApplications = (listingId) => {
    axios
      .get(`http://localhost:3001/Applications/allApplicationsForListing/${listingId}`, {
        headers: {
          accessToken: sessionStorage.getItem('accessToken'),
        },
      })
      .then((response) => {
        console.log('Applications received successfully:', response);
        if (response.data.message === 'No applications for listing yet!') {
          console.log(response.data.message);
          alert(response.data.message);
          navigate('/listings', { state: { buildingName } });
        } else {
          navigate('/applications', { state: { listingId } });
        }
      })
      .catch((error) => {
        console.error('Error viewing applications for this listing:', error);
      });
  };
 
  const handleAddApplication = () => {
    navigate('/addListing');
  }
  // eslint-disable-next-line no-console
  console.log('response', listings);
  return (
    <div style={{marginTop: '10%'}}>
      <h1>{buildingName} Listings</h1>
      <div style={{display: 'flex', flexDirection: 'row', marginTop: '50px'}}>
      {listings?.data?.map(listing => (
  <div className="col-md-4 mb-4" key={listing.id}>
    <div className="card-group">
    <Card sx={{ maxWidth: 345 }}>
    <CardContent>
      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
      <Typography gutterBottom variant="h5" component="div">
        <span  style={{fontWeight: '600'}} >Apartment No:</span>{listing.apartmentNumber}
      </Typography>
      <Button onClick={handleAddApplication}>
       <AddIcon/>
      </Button>
      </div>
      <Typography variant="body2" color="text.secondary" style={{marginTop: '15px'}}>
      <span style={{fontWeight: '600'}} >Bedrooms:</span>{listing.unitAvailable}
      </Typography>
      <Typography variant="body2" color="text.secondary" style={{marginTop: '15px'}}>
      <span  style={{fontWeight: '600'}} >Description:</span>{listing.description}
      </Typography>
      <Typography variant="body2" color="text.secondary" style={{marginTop: '15px'}} fontWeight={'600'}>
        Rent Per Month: ${listing.rent}
      </Typography>
      {/* Add other details as needed */}
    </CardContent>
    <CardActions>
      <Button size="small" onClick={() => handleUpdate(listing.id)}>Edit Listing</Button>
      <Button size="small" onClick={() => handleDelete(listing.id)}>Delete Listing</Button>
      <Button size="small" onClick={() => handleViewApplications(listing.id)}>
        View Applications
      </Button>
    </CardActions>
  </Card>
    </div>
  </div>
))}
</div>
    </div>
  );
}
 
export default ViewListings;
 