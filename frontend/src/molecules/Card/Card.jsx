/* eslint-disable react/prop-types */
/* eslint-disable arrow-body-style */
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { FaClock, FaEdit } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import moment from 'moment';
import _get from 'lodash/get';
import './Card.scss';
import { Modal, Button, Input } from 'antd';
import './CardModal.css';
import { STRING_CONSTANTS } from './constants/Card.constants';

function Card({
  notice,
  postType = '',
  onSaveEdit,
  onDelete,
}) {
  const {
    id,
    createdAt,
    description,
    title,
    editedAt,
    Author_name,
  } = notice;

  const [isModalVisible, setModalVisible] = useState(false);
  const [editedTitle, setEditedTitle] = useState(title);
  const [editedDescription, setEditedDescription] = useState(Description);

  const handleReadMore = () => {
    setModalVisible(true);
  };

  const handleEdit = (e) => {
    e.stopPropagation();
    setEditedTitle(editedTitle);
    setEditedDescription(Description);
    handleReadMore();
  };

  const handleAction = () => {
    if (onSaveEdit) {
      onSaveEdit(id, editedTitle, editedDescription);
    }
    setModalVisible(false);
  };

  // const handleEdit = () => {
  //   setEditedTitle(title);
  //   setEditedDescription(Description);
  //   handleReadMore();
  // };

  const handleCancel = () => {
    setModalVisible(false);
    setEditedTitle(title);
    setEditedDescription(Description);
  };
  return (
    <div
      className="container-card"
    >
      {/* <div className="card-id">{id}</div> */}
      <div className="card-title">{title}
        <span
          tabIndex="0"
          role="button"
          className="card-edit"
          onClick={handleEdit}
        >
          <FaEdit />
          {/* {editedAt ? `Edited: ${moment(editedAt).format(' DD MMM')}` : ''} */}
        </span>
        <span tabIndex="0" role="button" className="card-delete" onClick={() => onDelete(id)}>
          <MdDelete />
        </span>
      </div>
      <div className="card-author">
        <span className="by-text">By </span>
        <span className="author">{Author_name}</span>
      </div> */}
      <div className="card-description">{Description}</div>
      <div className="card-createdAt"><FaClock />
        {
          editedAt
            ? `Updated at:${moment(editedAt).format(' DD MMM')}`
            : moment(createdAt).format(' DD MMM')
        }
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
            <h2>
              {
                postType === STRING_CONSTANTS.POST_TYPE_EDIT
                  ? STRING_CONSTANTS.EDIT_NOTICE
                  : STRING_CONSTANTS.READ_MORE
              }
            </h2>
          </div>
          <div>
            <label>Title:</label>
            <Input
              value={editedTitle}
              onChange={e => setEditedTitle(e.target.value)}
            />
          </div>
          <div className="modal-description">
            <p>{Description}</p>
          </div>
        </div>
      </Modal>
    </div>
  );
}

const mapStateToProps = ({ noticeReducer }) => ({
  postType: _get(noticeReducer, 'postType'),
});

const mapDispatchToProps = (/* dispatch */) => ({
  // onSetPostType: postType => dispatch(setPostType(postType)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Card);
