import React, { /* useState, */ useEffect } from 'react';
import _get from 'lodash/get';
import { useState } from 'react';
import axios from 'axios';
import CardforBulding from '../../../molecules/Card/CardB';


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
  
  

  return (
    <div>
      <h1 className="nav-notice">Dashboard</h1>
      <div className="card">
        {data.map(building => (
          <CardforBulding
            building={building}
          />
        ))}
      </div>
    </div>
  );
}



export default Buildings;
