/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/prop-types */
/* eslint-disable arrow-body-style */
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { FaClock, FaEdit } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import moment from 'moment';
import _get from 'lodash/get';
import { Modal, Button, Input } from 'antd';
// styles
import styles from './Card.module.scss';
import './CardModal.css';
// constants
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
    Description,
    title,
    editedAt,
    Author_name,
  } = notice;

  const [isModalVisible, setModalVisible] = useState(false);
  const [editedTitle, setEditedTitle] = useState(title);
  const [editedDescription, setEditedDescription] = useState(Description);
  const role = JSON.parse(sessionStorage.getItem('userCred'))?.role;

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

  const handleCancel = () => {
    setModalVisible(false);
    setEditedTitle(title);
    setEditedDescription(Description);
  };

  return (
    <>
      <div
        className={styles.containerCard}
        key={id}
      >
        <div className={styles.cardTitle}>
          <span
            title={title}
            className={styles.textTitle}
          >
            {title}
          </span>
          {role === 'Manager' && (
            <span
              tabIndex="0"
              role="button"
              className={styles.cardEdit}
              onClick={handleEdit}
            >
              <FaEdit />
            </span>
          )}
          {role === 'Manager' && (
            <span
              tabIndex="0"
              role="button"
              className={styles.cardDelete}
              onClick={() => onDelete(id)}
            >
              <MdDelete />
            </span>
          )}
        </div>
        <div className={styles.cardAuthor}>
          <span>By </span>
          <span className={styles.author}>{Author_name}</span>
        </div>
        <div className={styles.cardDescription}>{Description}</div>
        <div className={styles.createdAt}><FaClock />
          {editedAt
            ? `Updated at:${moment(editedAt).format(' DD MMM')}`
            : moment(createdAt).format(' DD MMM')}
        </div>
        <div className={styles.buttonContainer}>
          <button
            type="button"
            className={styles.readBtn}
            onClick={handleReadMore}
          >Read More
          </button>
        </div>
      </div>
      <Modal
        title={null}
        open={isModalVisible}
        onOk={handleCancel}
        maskClosable
        footer={[
          <Button key="save" type="primary" onClick={handleAction}>
            Save Edit
          </Button>,
          <Button key="cancel" onClick={handleCancel}>
            Cancel
          </Button>,
        ]}
      >
        <div className="modal-content-container">
          <div className="modal-title">
            <h2>
              {postType === STRING_CONSTANTS.POST_TYPE_EDIT
                ? STRING_CONSTANTS.EDIT_NOTICE
                : STRING_CONSTANTS.READ_MORE}
            </h2>
          </div>
          <div>
            <label>Title:</label>
            <Input
              value={editedTitle}
              onChange={e => setEditedTitle(e.target.value)}
            />
          </div>
          <div>
            <label>Description:</label>
            <Input.TextArea
              value={editedDescription}
              onChange={e => setEditedDescription(e.target.value)}
              autoSize={{ minRows: 3, maxRows: 5 }}
            />
          </div>
        </div>
      </Modal>
    </>
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
