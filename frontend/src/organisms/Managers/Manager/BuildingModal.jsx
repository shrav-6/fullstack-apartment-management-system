/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import {
  message,
  Modal,
  Input,
  Button,
} from 'antd';
import {
  postAllBuilding,
  getAllBuilding,
} from './buildings.service';

function BuildingModal({
  // allBuildings,
  onCancel,
  showNewBuildingModal,
  setShowNewBuildingModal,
  onSetBuildingName,
  onSetPhoneNumber,
  onSetAddress,
  onSetBuildings,
}) {
  const [buildingName, setBuildingName] = useState('');
  const [address, setAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  // const role = JSON.parse(sessionStorage.getItem('userCred'))

  const handlePost = () => {
    const payload = {
      buildingName,
      address,
      phoneNumber,
    };
    const fetchBuildings = () => {
      getAllBuilding()
        .then((response) => {
          if (!response?.data?.error) {
            onSetBuildings({ allBuildings: response?.data?.data });
          }
        })
        .catch((err) => {
          message.error(err);
        });
    };

    postAllBuilding(payload)
      .then((response) => {
        if (!response?.data?.error) {
          setShowNewBuildingModal(false);
          onSetBuildingName('');
          onSetAddress('');
          onSetPhoneNumber('');
          fetchBuildings();
        } else {
          message.error(response.data.error);
        }
      })
      .catch((err) => {
        message.error(err);
      });
  };

  return (
    <Modal
      title="Add New Building"
      open={showNewBuildingModal}
      onCancel={onCancel}
      footer={[
        <Button key="cancel" onClick={onCancel}>
          Cancel
        </Button>,
        <Button key="post" type="primary" onClick={handlePost}>
          Post
        </Button>,
      ]}
    >
      <form>
        <label htmlFor="buildingName">Building Name:</label>
        <Input
          id="buildingName"
          value={buildingName}
          onChange={e => setBuildingName(e.target.value)}
        />

        <label htmlFor="address">Address:</label>
        <Input
          id="address"
          value={address}
          onChange={e => setAddress(e.target.value)}
        />

        <label htmlFor="phoneNumber">Phone Number:</label>
        <Input
          id="phoneNumber"
          value={phoneNumber}
          onChange={e => setPhoneNumber(e.target.value)}
        />
      </form>
    </Modal>
  );
}

export default BuildingModal;
