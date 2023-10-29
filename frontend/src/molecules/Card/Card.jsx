/* eslint-disable arrow-body-style */
import React, { useState } from 'react';
import { FaClock } from 'react-icons/fa';
import moment from 'moment';
import './Card.scss';
import { Modal, Button } from 'antd';
import './CardModal.css';

function Card({ notice }) {
  const {
    id,
    Author_name,
    createdAt,
    Description,
    title,
  } = notice;

  const [isModalVisible, setModalVisible] = useState(false);

  const handleReadMore = () => {
    setModalVisible(true);
  };

  const handleCancel = () => {
    setModalVisible(false);
  };

  return (
    <div
      className="container-card"
      key={id}
    >
      {/* <div className="card-id">{id}</div> */}
      <div className="card-title">{title}</div>
      <div className="card-author">
        <span className="by-text">By </span>
        <span className="author">{Author_name}</span>
      </div>
      <div className="card-description">{Description}</div>
      <div className="card-createdAt"><FaClock />
        {/* <span className="date-and-time">Created: </span> */}
        {createdAt ? moment(createdAt).format(' DD MMM') : 'N/A'}
      </div>
      <div className="button-container">
        <button
          type="button"
          className="read-btn"
          onClick={handleReadMore}
        >Read More
        </button>
      </div>
      <Modal
        title={null}
        visible={isModalVisible}
        onOk={handleCancel}
        maskClosable
        footer={<div><Button type="primary" onClick={handleCancel}>OK</Button></div>}

      >
        <div className="modal-content-container">
          <div className="modal-title">
            <h2>{title}</h2>
          </div>
          <div className="modal-description">
            <p>{Description}</p>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default Card;
