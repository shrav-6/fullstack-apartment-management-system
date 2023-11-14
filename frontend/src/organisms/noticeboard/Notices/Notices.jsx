/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import {
  message, Modal, Input, Button,
} from 'antd';
import _get from 'lodash/get';
import FilterAltRoundedIcon from '@mui/icons-material/FilterAltRounded';
import SortRoundedIcon from '@mui/icons-material/SortRounded';
import { FaPlus } from 'react-icons/fa';
import Card from '../../../molecules/Card/Card';
import {
  getAllNotices,
  postAllNotices,
  editAllNotices,
  deleteNotice,
} from './Notices.service';
import {
  setNotices,
  setTitle,
  setDescription,
  setAuthorName,
  setPostType,
  resetPostData,
} from '../data/notice.actions';
import { STRING_CONSTANTS } from '../constants/notice.constant';

const { TextArea } = Input;

function Notices({
  allNotices: notices = [],
  title,
  description,
  authorName,
  postType = '',
  onSetTitle,
  onSetNotices,
  onSetDescription,
  onSetAuthorName,
  onSetPostType = () => {},
  onResetPostData = () => {},
}) {
  const [editTrigger, setEditTrigger] = useState(0); // State to trigger useEffect on edits

  const fetchNotices = () => {
    getAllNotices()
      .then((response) => {
        if (!response?.data?.error) {
          onSetNotices({ allNotices: response?.data });
        }
      })
      .catch((err) => {
        message.error(err);
      });
  };

  useEffect(() => {
    fetchNotices(); // Fetch notices when the component mounts
  }, [editTrigger]); // Include editTrigger in the dependency array

  const [isModalVisible, setModalVisible] = useState(false);
  const [editedTitle, setEditedTitle] = useState('');
  const [editedDescription, setEditedDescription] = useState('');

  const handlePlusIconClick = () => {
    onResetPostData();
    setModalVisible(true);
    onSetPostType(STRING_CONSTANTS.POST_TYPE_EDIT);
  };

  const handlePlusIconCancel = () => {
    setModalVisible(false);
    setEditedTitle('');
    setEditedDescription('');
    // setEditedAuthorName('');
  };

  const handleSave = () => {
    const payload = {
      title: postType === STRING_CONSTANTS.POST_TYPE_EDIT
        ? editedTitle
        : title,
      Description: postType === STRING_CONSTANTS.POST_TYPE_EDIT
        ? editedDescription
        : description,
      Author_name: authorName,
      createdAt: new Date().valueOf(),
    };

    postAllNotices(payload)
      .then((response) => {
        if (!response?.data?.error) {
          onSetNotices({ allNotices: [...notices, response?.data] });
          setModalVisible(false);
          onSetTitle('');
          onSetDescription('');
          // onSetAuthorName('');
          setEditTrigger(prev => prev + 1); // Increment editTrigger to trigger useEffect
        } else {
          message.error(response.data.error);
        }
      })
      .catch((err) => {
        message.error(err);
      });
  };

  const handleEditNotice = (id, editedTitle, editedDescription) => {
    const updatedNotices = notices.map((notice) => {
      if (notice.id === id) {
        return {
          ...notice,
          title: editedTitle,
          description: editedDescription,
          editedAt: new Date().valueOf(),
        };
      }
      return notice;
    });

    const payload = {
      title: editedTitle,
      Description: editedDescription,
      Author_name: authorName,
    };

    editAllNotices(id, payload)
      .then((response) => {
        if (!response?.data?.error) {
          onSetNotices({ allNotices: updatedNotices });
          setEditTrigger(prev => prev + 1); // Increment editTrigger to trigger useEffect
        } else {
          message.error(response.data.error);
        }
      })
      .catch((err) => {
        message.error(err);
      });
    setModalVisible(false);
    setEditedTitle('');
    setEditedDescription('');
    // setEditedAuthorName('');
  };

  const handleDeleteNotice = (id) => {
    deleteNotice(id)
      .then((response) => {
        if (!response?.data?.error) {
          const updatedNotices = notices.filter(notice => notice.id !== id);
          onSetNotices({ allNotices: updatedNotices });
          message.success('Notice deleted successfully');
        } else {
          message.error(response.data.error);
        }
      })
      .catch((err) => {
        message.error(err);
      });
  };

  return (
    <div>
      <h1 className="nav-notice">Notices</h1>
      <div style={{ float: 'right' }}>
        <div>
          <div
            tabIndex="0"
            role="button"
            className="card-post"
            onClick={handlePlusIconClick}
          >
            <FaPlus />
          </div>
        </div>
        <div>
          <FilterAltRoundedIcon />
        </div>
        <div>
          <SortRoundedIcon />
        </div>
      </div>
      <div className="card">
        {(notices || []).map(notice => (
          <Card key={notice.id} notice={notice} onSaveEdit={handleEditNotice} onDelete={handleDeleteNotice} />
        ))}
      </div>
      <Modal
        title="Title"
        description="Write message"
        visible={isModalVisible}
        onCancel={handlePlusIconCancel}
        footer={[<Button key="post" onClick={handleSave}>Post</Button>]}
      >
        <div>
          <label>Title:</label>
          <Input value={title} onChange={e => onSetTitle(e.target.value)} />
        </div>
        <div>
          <label>Description:</label>
          <TextArea
            value={description}
            onChange={e => onSetDescription(e.target.value)}
            autoSize={{ minRows: 3, maxRows: 5 }}
          />
        </div>
        <div>
          <label>Created_by:</label>
          <Input value={authorName} onChange={e => onSetAuthorName(e.target.value)} />
        </div>
      </Modal>
    </div>
  );
}

const mapStateToProps = ({ noticeReducer }) => ({
  allNotices: _get(noticeReducer, 'allNotices'),
  title: _get(noticeReducer, 'title'),
  description: _get(noticeReducer, 'description'),
  authorName: _get(noticeReducer, 'authorName'),
  postType: _get(noticeReducer, 'postType'),
});

const mapDispatchToProps = dispatch => ({
  onSetNotices: payload => dispatch(setNotices(payload)),
  onSetTitle: title => dispatch(setTitle(title)),
  onSetDescription: description => dispatch(setDescription(description)),
  onSetAuthorName: authorName => dispatch(setAuthorName(authorName)),
  onSetPostType: postType => dispatch(setPostType(postType)),
  onResetPostData: () => dispatch(resetPostData()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Notices);
