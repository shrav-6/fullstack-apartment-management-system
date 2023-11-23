/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import { connect } from 'react-redux';
import _get from 'lodash/get';

import {
  message,
  Modal,
  Input,
  Button,
} from 'antd';
import {
  postAllBuilding,
} from './buildings.service';
import { setBuildingName } from '../data/building.actions';

function BuildingModal({
  onCancel,
  showNewBuildingModal,
  setShowNewBuildingModal,
  onSetBuildingName,
  onSetPhoneNumber,
  onSetAddress,
  fetchData,
  buildingName,
}) {
  const [address, setAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  // const role = JSON.parse(sessionStorage.getItem('userCred'))

  const handlePost = () => {
    const payload = {
      buildingName,
      address,
      phoneNumber,
    };

    postAllBuilding(payload)
      .then((response) => {
        if (!response?.data?.error) {
          setShowNewBuildingModal(false);
          onSetAddress('');
          onSetPhoneNumber('');
          fetchData();
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
          onChange={e => onSetBuildingName(e.target.value)}
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

const mapStateToProps = ({ buildingReducer }) => ({
  buildingName: _get(buildingReducer, 'buildingName'),
});

const mapDispatchToProps = dispatch => ({
  onSetBuildingName: buildingName => dispatch(setBuildingName(buildingName)),
});

export default connect(mapStateToProps, mapDispatchToProps)(BuildingModal);
