/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/label-has-associated-control */
// Building.js
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import _get from 'lodash/get';
import CardforBuilding from '../../../molecules/Card/CardCompound/Modal/CardForBuilding';
import {
  setBuildings, setAddress, setPhoneNumber, setBuildingName,
} from '../data/building.actions';
import BuildingModal from './BuildingModal';

function Buildings({
  allBuildings,
  onSetBuildingName,
  onSetPhoneNumber,
  onSetAddress,
  onSetBuildings,
}) {
  // const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showNewBuildingModal, setShowNewBuildingModal] = useState(false);

  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:3001/Buildings', {
        headers: {
          accessToken: JSON.parse(sessionStorage.getItem('userCred'))?.token,
        },
      });
      onSetBuildings({ allBuildings: response?.data?.data });
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
    setShowNewBuildingModal(true);
  };

  const handleCancelModal = () => {
    setShowNewBuildingModal(false);
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div
          className="addListings"
          style={{ paddingTop: '1rem' }}
        >
          <button
            type="button"
            onClick={addListingsHandler}
            style={{
              backgroundColor: '#455d7a',
              border: 'none',
              color: 'white',
              padding: '10px 20px',
              textAlign: 'center',
              textDecoration: 'none',
              display: 'inline-block',
              fontSize: '16px',
              margin: '10px',
              cursor: 'pointer',
              borderRadius: '12px',
            }}
          >
            Add New Listings 📑
          </button>
        </div>
        <div
          className="addBuildings"
          style={{ paddingTop: '1.8rem', marginRight: '3rem' }}
        >
          <button
            type="button"
            onClick={handleAddBuildingClick}
            style={{
              backgroundColor: '#455d7a',
              border: 'none',
              color: 'white',
              padding: '10px 20px',
              textAlign: 'center',
              textDecoration: 'none',
              display: 'inline-block',
              fontSize: '16px',
              marginRight: '35px',
              cursor: 'pointer',
              borderRadius: '12px',
            }}
          >
            Add New Buildings 🏤
          </button>
        </div>
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
          {(allBuildings || []).map(building => (
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
      <BuildingModal
        onCancel={handleCancelModal}
        showNewBuildingModal={showNewBuildingModal}
        setShowNewBuildingModal={setShowNewBuildingModal}
        onSetBuildingName={onSetBuildingName}
        onSetPhoneNumber={onSetPhoneNumber}
        onSetAddress={onSetAddress}
        fetchData={fetchData}
      />
    </div>
  );
}

const mapStateToProps = ({ buildingReducer }) => ({
  allBuildings: _get(buildingReducer, 'allBuildings'),
  buildingName: _get(buildingReducer, 'buildingName'),
  address: _get(buildingReducer, 'address'),
  phoneNumber: _get(buildingReducer, 'phoneNumber'),
});

const mapDispatchToProps = dispatch => ({
  onSetBuildings: payload => dispatch(setBuildings(payload)),
  onSetBuildingName: buildingName => dispatch(setBuildingName(buildingName)),
  onSetAddress: address => dispatch(setAddress(address)),
  onSetPhoneNumber: phoneNumber => dispatch(setPhoneNumber(phoneNumber)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Buildings);
