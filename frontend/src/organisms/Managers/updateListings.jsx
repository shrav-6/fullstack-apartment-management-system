import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';

function UpdateListings() {
  const location = useLocation();
  const selectedListing = location.state?.selectedListing;
  const buildingName = location.state?.buildingName;
  console.log('inside update listings: array', selectedListing);
  const [formData, setFormData] = useState({
    unitAvailable: '',
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
        navigate('/Dashboard');
      })
      .catch((error) => {
        console.error('Error updating listing:', error);
      });
  };

  return (
    <div>
      <h1 className="heading">Edit Listing</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="unitAvailable">Number of Bedrooms:</label>
          <input
            type="number"
            id="unitAvailable"
            name="unitAvailable"
            value={formData.unitAvailable}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="rent">Rent:</label>
          <input
            type="number"
            id="rent"
            name="rent"
            value={formData.rent}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="address">Address:</label>
          <textarea
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
        </div>
        <div>
          <label htmlFor="pets">Pets:</label>
          <input
            type="number"
            id="pets"
            name="pets"
            value={formData.pets}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="startsFrom">Starts From:</label>
          <input
            type="date"
            id="startsFrom"
            name="startsFrom"
            value={formData.startsFrom}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <textarea
            type="text"
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter description"
            rows="5"
            cols="40"
            required
          />
        </div>
        <div>
          <label htmlFor="extras">Extras:</label>
          <textarea
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
        </div>
        <div>
          <label htmlFor="buildingName">BuildingName:</label>
          <input
            type="text"
            id="buildingName"
            name="buildingName"
            value={buildingName}
            placeholder="Enter the building Name"
            rows="5"
            cols="40"
            required
          />
        </div>
        <div>
          <button type="submit">Update Listing</button>
        </div>
      </form>
    </div>
  );
}

export default UpdateListings;
