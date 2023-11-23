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
import AddListing from './addListings';

function ViewListings() {
  const location = useLocation();

  const buildingId = location.state?.buildingId;
  const buildingName = location.state?.buildingName;

  useEffect(() => {
    console.log('buildingName:', buildingId);
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

  useEffect(() => {
    // Fetch listing images when the component mounts
    if (listings.data) {
      const fetchImages = async () => {
        const imagesPromises = listings.data.map(async (listing) => {
          const response = await axios.get(`http://localhost:3001/Listings/getimages/${listing.id}`);
          return {
            listingId: listing.id,
            images: response.data,
          };
        });

        const imagesData = await Promise.all(imagesPromises);
        const imagesMap = imagesData.reduce((map, item) => {
          map[item.listingId] = item.images;
          return map;
        }, {});

        setListingImages(imagesMap);
      };

      fetchImages();
    }
  }, [listings]);

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

  // eslint-disable-next-line no-console
  console.log('response', listings);
  return (
    <div>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <h1>{buildingName} Listings</h1>
      <div className="row">
        {listings?.data?.map(listing => (
          <div className="col-md-4 mb-4" key={listing.id}>
            <div className="card-group">
              <div className="card-body">
                <p className="card-text">Bedrooms: {listing.unitAvailable}</p>
                <p className="card-text">Apartment Number: {listing.apartmentNumber}</p>
                <p className="card-text">Description: {listing.description}</p>
                <p className="card-text">Rent Per Month: ${listing.rent}</p>
                <p className="card-text">Move-In Date: {listing.startsFrom}</p>
                <p className="card-text">Address: {listing.address}</p>
                <p className="card-text">Pets: {listing.pets}</p>
                {/* Display Images */}
                {listingImages[listing.id] && listingImages[listing.id].length > 0 && (
                  <div>
                    <p>Images:</p>
                    <div>
                      {listingImages[listing.id].map(image => (
                        <img
                          key={image.id}
                          src={`http://localhost:3001/Listings/getimages/${image.filename}`}
                          alt="Listing Image"
                          style={{ width: '100px', height: '100px', marginRight: '5px' }}
                        />
                      ))}
                    </div>
                  </div>
                )}
                <button type="button" onClick={() => handleUpdate(listing.id)}>Edit Listing</button>
                <br></br><br></br>
                <button type="button" onClick={() => handleDelete(listing.id)}>Delete Listing</button>
                <br></br><br></br>
                <button type="button" onClick={() => handleViewApplications(listing.id)}>View Applications for this Listing</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ViewListings;
