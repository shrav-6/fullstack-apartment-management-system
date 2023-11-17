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

// get listings from a particular manager
function ViewListings() {
  // const location = useLocation();
  // const buildingName = location.state?.buildingName;
  // console.log('buildingName', buildingName);

  const location = useLocation();
  /*const [buildingName, setBuildingName] = useState('');

  useEffect(() => {
    // Access buildingName from location.state after the component mounts
    setBuildingName(location.state?.buildingName);
  }, [location.state]);*/

  // console.log('buildingName', buildingName);

  const buildingName = location.state?.buildingName;

  useEffect(() => {
    console.log('buildingName:', buildingName);
  }, [buildingName]);

  const [listings, setListings] = useState([]);
  const accessToken = sessionStorage.getItem('accessToken');
  console.log('accessToken', accessToken);
  const [selectedListing, setSelectedListing] = useState(null);
  const navigate = useNavigate();
  //const accessToken = sessionStorage.getItem('accessToken');
  //const history = useHistory();
  // const accessToken = ;
  /*const config = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  }; */
  useEffect(() => {
    // Fetch property listings from the API when the component mounts
    axios
      .get(`http://localhost:3001/Listings/forOneBuilding/${buildingName}`, {
        headers: {
          accessToken: sessionStorage.getItem('accessToken'),
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
    // You can implement the logic to open a modal or navigate to an edit page
    // and pass the selected listing data to that modal or page for editing.
    // For simplicity, let's log the listing ID for now.
    console.log('Editing listing with ID:', listingId);
    // Find the selected listing based on listingId
    const selectedListing = listings.data.find(listing => listing.id === listingId);

    // Set the selectedListing in the state
    setSelectedListing(selectedListing);
    console.log('selectedlisting', selectedListing);

    // Navigate to the AddListing component
    navigate('/updateListing', { state: { selectedListing, buildingName } });
  };

  const handleDelete = (listingId) => {
    // You can implement the logic to call the backend API for deleting the listing.
    // For simplicity, let's log the listing ID for now.
    console.log('Deleting listing with ID:', listingId);
    axios
      .delete(`http://localhost:3001/Listings/${listingId}`, {
        headers: {
          accessToken: sessionStorage.getItem('accessToken'),
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
    // navigate('/applications', { state: { listingId } });
    // You can implement the logic to call the backend API for deleting the listing.
    // For simplicity, let's log the listing ID for now.
    // console.log('View applications for listing with ID:', listingId);
    axios
      .get(`http://localhost:3001/Applications/all/${listingId}`, {
        headers: {
          accessToken: sessionStorage.getItem('accessToken'),
        },
      })
      .then((response) => {
        console.log('Applications received successfully:', response);
        if (response.data.message === 'No applications for listing yet!') {
          console.log(response.data.message);
          alert(response.data.message);
          //window.location.reload();
          navigate('/listings', { state: { buildingName } });
        } else {
          navigate('/applications', { state: { listingId } });
          // go to view applications
          // const applications = response.data.data;
          // const
          // console.log(applications);
          // console.log('listing id', listingId);
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
      <h1>{buildingName} Listings</h1>
      <div className="row">
        {listings?.data?.map(listing => (
          <div className="col-md-4 mb-4" key={listing.id}>
            <div className="card-group">
              <div className="card-body">
                <p className="card-text">Bedrooms: {listing.unitAvailable}</p>
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
