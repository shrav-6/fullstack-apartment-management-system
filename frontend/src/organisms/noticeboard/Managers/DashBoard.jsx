import React, { /* useState, */ useEffect } from 'react';
import _get from 'lodash/get';
import { useState } from 'react';
import axios from 'axios';
import CardforBuilding from '../../../molecules/Card/CardB';
import { useNavigate } from 'react-router-dom';

function Buildings() {

  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/Buildings', {
          headers: {
            accessToken: sessionStorage.getItem("accessToken"),
          },
        });
        console.log(response.data.data, 'response data array');
        setData(response.data.data);
      } catch (error) {
        console.log(error);
        // Handle the error here
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
