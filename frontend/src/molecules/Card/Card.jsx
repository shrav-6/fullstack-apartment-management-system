/* eslint-disable arrow-body-style */
import React from 'react';
import { FaClock } from 'react-icons/fa';
import moment from 'moment';
import './Card.scss';

function Card({ notice }) {
  const {
    id,
    Author_name,
    createdAt,
    Description,
    title,
  } = notice;

  const handleReadMore = () => {
  };
  return (
    <div
      className="container-card"
      key={id}
    >
      {/* <div className="card-id">{id}</div> */}
      <div className="card-title">{title}</div>
      <div className="card-description">{Description}</div>
      <div className="card-author">
        <span className="by-text">By</span> {Author_name}
      </div>
      <div className="card-createdAt"><FaClock />
        {createdAt ? moment(createdAt).format('MMM-DD') : 'N/A'}
      </div>
      <div className="button-container">
        <button
          type="button"
          className="read-btn"
          onClick={handleReadMore}
        >Read More
        </button>
      </div>
    </div>
  );
}

export default Card;
