/* eslint-disable no-console */
import React, { /* useState, */ useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import CardforBuilding from '../../../molecules/Card/CardB';

function Buildings() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/Buildings', {
          headers: {
            accessToken: sessionStorage.getItem('accessToken'),
          },
        });
        setData(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const navigate = useNavigate();
  const addListingsHandler = () => {
    navigate('/addListing');
  };

  return (
    <div>
      <h1 className="nav-notice">Dashboard</h1>
      <div className="card">
        {data.map(building => (
          <CardforBuilding
            key={building.id}
            building={building}
          />
        ))}
      </div>
      <div className="addListings">
        <button type="button" onClick={addListingsHandler}>Add Listing</button>
      </div>
    </div>
  );
}

export default Buildings;
