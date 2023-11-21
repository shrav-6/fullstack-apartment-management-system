// Building.js
import React, { useState, useEffect } from 'react';
import CardforBuilding from '../../molecules/Card/CardCompound/Modal/CardForBuilding';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { MdModeEditOutline } from 'react-icons/md';

// New Building Form Component
const NewBuildingForm = ({ onCancel }) => {
  // Add your form logic here

  return (
    <div className="new-building-form">
      {/* Form content */}
      {/* For example: */}
      <form>
        <label>Building Name:</label>
        <input type="text" />
        <label>Address:</label>
        <input type="text" />
        <label>Phone Number:</label>
        <input type="text" />
        {/* Add other form fields as needed */}
        <button type="submit">Submit</button>
        <button type="button" onClick={onCancel}>
          Cancel
        </button>
      </form>
    </div>
  );
};

function Building() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showNewBuildingForm, setShowNewBuildingForm] = useState(false); // Track form visibility
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:3001/Buildings', {
        headers: {
          accessToken: JSON.parse(sessionStorage.getItem('userCred'))?.token,
        },
      });
      setData(response.data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const addListingsHandler = () => {
    navigate('/addListing');
  };

  const handleDelete = () => {
    fetchData();
  };

  const handleUpdate = () => {
    fetchData();
  };

  const handleAddBuildingClick = () => {
    setShowNewBuildingForm(true);
  };

  const handleCancelForm = () => {
    setShowNewBuildingForm(false);
  };

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div style={{ display: 'flex' }}>
          {data.map((building) => (
            <CardforBuilding
              key={building.id}
              building={building}
              onDelete={handleDelete}
              onUpdate={handleUpdate}
              onAddBuildingClick={handleAddBuildingClick}
            />
          ))}
        </div>
      )}

      <div className="addListings">
        <button type="button" onClick={addListingsHandler}>
          Add New Building
        </button>
      </div>

      {/* Display NewBuildingForm if showNewBuildingForm is true */}
      {showNewBuildingForm && <NewBuildingForm onCancel={handleCancelForm} />}
    </div>
  );
}

export default Building;