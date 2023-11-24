/* eslint-disable jsx-a11y/label-has-associated-control */
// CardForBuilding.js
import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap';
import { MdModeEditOutline, MdDelete } from 'react-icons/md';
import FeedIcon from '@mui/icons-material/Feed';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import EventNoteIcon from '@mui/icons-material/EventNote';
import BuildingImage from '../../../../organisms/Managers/Images/buildings.jpg';
import styles from './CardForBuilding.module.scss';
 
function IconButton({ type, onClick, styles }) {
  const Icon = type === 'edit' ? MdModeEditOutline : MdDelete;
 
  return (
    <Icon
      style={{
        position: 'absolute',
        top: '15px',
        ...styles,
        color: 'white',
        cursor: 'pointer',
        fontSize: '25px',
      }}
      onClick={onClick}
    />
  );
}
 
function EditBuildingModal({
  show, onHide, onUpdate, building,
}) {
  const [buildingName, setBuildingName] = useState('');
  const [address, setAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
 
  const handleUpdateClick = async () => {
    try {
      const buildingId = building.id;
      await axios.put(
        `http://localhost:3001/Buildings/${buildingId}`,
        {
          buildingName,
          address,
          phoneNumber,
        },
        {
          headers: {
            accessToken: JSON.parse(sessionStorage.getItem('userCred'))?.token,
          },
        },
      );
      onUpdate();
      onHide();
      // Refresh the page after successful update
      window.location.reload();
    } catch (error) {
      // eslint-disable-next-line no-unused-expressions
      (error);
    }
  };
 
  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>Edit Building</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form className={styles.editBuildingForm}>
          <label>Building Name:</label>
          <input
            type="text"
            value={buildingName}
            onChange={e => setBuildingName(e.target.value)}
          />
          <br></br>
          <label>Address:</label>
          <input
            type="text"
            value={address}
            onChange={e => setAddress(e.target.value)}
          />
          <br></br>
          <label>Phone Number:</label>
          <input
            type="text"
            value={phoneNumber}
            onChange={e => setPhoneNumber(e.target.value)}
          />
        </form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
        <Button variant="primary" onClick={handleUpdateClick}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
 
function CardforBuilding({ building, onDelete, onUpdate }) {
  const [isHovered, setIsHovered] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const buildingId = building.id;
 
  const handleEditClick = () => {
    setShowEditModal(true);
    onUpdate();
  };
 
  const handleModalClose = () => {
    setShowEditModal(false);
  };
 
  return (
    <>
      <Card
        style={{ width: '18rem', margin: '10px', position: 'relative' }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {isHovered && (
          <>
            <IconButton
              type="delete"
              onClick={async () => {
                try {
                  await axios.delete(`http://localhost:3001/Buildings/${buildingId}`, {
                    headers: {
                      accessToken: JSON.parse(sessionStorage.getItem('userCred'))?.token,
                    },
                  });
                  onDelete();
                } catch (error) {
                  // eslint-disable-next-line no-unused-expressions
                  (error);
                }
              }}
              styles={{ right: '15px' }}
            />
            <IconButton
              type="edit"
              onClick={handleEditClick}
              styles={{ right: '50px' }}
            />
          </>
        )}
        <Card.Img variant="top" src={BuildingImage} />
        <Card.Body>
          <Card.Title>{building.buildingName}</Card.Title>
        </Card.Body>
        <ListGroup className="list-group-flush">
          <ListGroup.Item>Address: {building.address}</ListGroup.Item>
          <ListGroup.Item>Phone Number: {building.phoneNumber}</ListGroup.Item>
        </ListGroup>
        <Card.Body style={{ display: 'flex', justifyContent: 'space-evenly' }}>
          <div className={styles.iconContainer}>
            <Link to="/Notices" state={{ buildingId }} className={styles.myButton}>
              <EventNoteIcon style={{ fontSize: 30, color: '#38598b' }} />
            </Link>
            <p className={styles.linkText}>Notices</p>
          </div>
          <div className={styles.iconContainer}>
            <Link to="/listings" state={{ buildingId }} className={styles.myButton}>
              <FormatListBulletedIcon style={{ fontSize: 30, color: '#38598b' }} />
            </Link>
            <p className={styles.linkText}>Listing</p>
          </div>
          <div className={styles.iconContainer}>
            <Link to="/NewsFeed" state={{ buildingId }} className={styles.myButton}>
              <FeedIcon style={{ fontSize: 30, color: '#38598b' }} />
            </Link>
            <p className={styles.linkText}>Feed</p>
          </div>
        </Card.Body>
      </Card>
 
      {/* Render the EditBuildingModal */}
      <EditBuildingModal
        show={showEditModal}
        onHide={handleModalClose}
        onUpdate={() => {
        }}
        building={building}
      />
    </>
  );
}
 
export default CardforBuilding;
