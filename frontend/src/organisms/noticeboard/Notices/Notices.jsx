/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { message, Modal, Input, Button, Select } from 'antd';
import _get from 'lodash/get';
import FilterAltRoundedIcon from '@mui/icons-material/FilterAltRounded';
import SortRoundedIcon from '@mui/icons-material/SortRounded';
import { FaPlus } from 'react-icons/fa';
import Card from '../../../molecules/Card/CardCompound/Card';
import { sortNotices } from '../helper';
import { filterNotices } from '../helper';
import {
  getAllNotices,
  postAllNotices,
  editAllNotices,
  deleteNotice,
  getAllNoticesForManager,
} from './Notices.service';
import {
  setNotices,
  setTitle,
  setDescription,
  setPostType,
  setPriority,
  resetPostData,
  resetAllData,
} from '../data/notice.actions';
import { STRING_CONSTANTS } from '../constants/notice.constant';
// styles
import styles from './Notice.module.scss';
const { TextArea } = Input;

function Notices({
  allNotices: notices = [],
  title,
  description,
  authorName,
  postType = '',
  priority,
  onSetTitle,
  onSetNotices,
  onSetDescription,
  onSetPriority,
  onSetPostType = () => {},
  onResetPostData = () => {},
  onResetAllPostData = () => {},
}) {
  const [editTrigger, setEditTrigger] = useState(0); // State to trigger useEffect on edits
  const role = JSON.parse(sessionStorage.getItem('userCred'))?.role;
  const [isDropdownVisible, setDropdownVisible] = useState(false);

  const handleMouseEnter = () => {
    setDropdownVisible(true);
  };

  const handleMouseLeave = () => {
    setDropdownVisible(false);
  };

  const location = useLocation();

  // Access the state passed through Link
  const buildingId = location.state ? location.state.buildingId : null;

  const fetchNotices = () => {
    getAllNotices()
      .then((response) => {
        if (!response?.data?.error) {
          onSetNotices({ allNotices: response?.data?.data });
          noticesCopy = JSON.parse(JSON.stringify(notices));
        }
      })
      .catch((err) => {
        message.error(err);
      });
  };

  const fetchNoticesForManager = () => {
    getAllNoticesForManager(buildingId)
      .then((response) => {
        if (!response?.data?.error) {
          onSetNotices({ allNotices: response?.data?.data });
        }
      })
      .catch((err) => {
        message.error(err);
      });
  };

  useEffect(() => {
    if (role === 'Manager') {
      fetchNoticesForManager(buildingId); // Fetch notices for a manager
    } else {
      fetchNotices(); // Fetch notices when the component mounts
    }
    return () => {
      onResetAllPostData();
    };
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
  };
  const handlePriorityChange = (value) => {
    onSetPriority(value);
  };

  const handleSave = () => {
    const payload = {
      title: postType === STRING_CONSTANTS.POST_TYPE_EDIT
        ? editedTitle
        : title,
      description: postType === STRING_CONSTANTS.POST_TYPE_EDIT
        ? editedDescription
        : description,
      dateAndTime: new Date().valueOf(),
      priority,
    };

    postAllNotices(payload)
      .then((response) => {
        if (!response?.data?.error) {
          onSetNotices({ allNotices: [...notices, response?.data?.data] });
          setModalVisible(false);
          onSetTitle('');
          onSetDescription('');
          setEditTrigger(prev => prev + 1);
        } else {
          message.error(response.data.error);
        }
      })
      .catch((err) => {
        message.error(err);
      });
  };

  // eslint-disable-next-line no-shadow
  const handleEditNotice = (id, editedTitle, editedDescription) => {
    if (role !== 'Manager') {
      message.error('Unauthorized access');
      return;
    }
    const updatedNotices = notices.map((notice) => {
      if (notice.id === id) {
        return {
          ...notice,
          title: editedTitle,
          description: editedDescription,
          updatedAt: new Date().valueOf(),
        };
      }
      return notice;
    });

    const payload = {
      title: editedTitle,
      Description: editedDescription,
      Author_name: authorName,
      updatedAt: new Date().valueOf(),
    };

    editAllNotices(id, payload)
      .then((response) => {
        if (!response?.data?.error) {
          onSetNotices({ allNotices: updatedNotices });
          setEditTrigger(prev => prev + 1);
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
  };

  const handleDeleteNotice = (id) => {
    if (role !== 'Manager') {
      message.error('Unauthorized access');
      return;
    }
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
    <div className={styles.noticeContainer}>
      <h1 className={styles.navNotice}>Notices</h1>

      <center onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
        <span>
          <span>
            <FilterAltRoundedIcon className={styles.icon} />
          </span>
          {
            <select className={styles.select} defaultValue={'none'} onChange={(change) => {
              // onResetAllPostData();
              const filteredNotices = filterNotices(notices, change.target.value);
              onSetNotices({ allNotices: filteredNotices });
            }}>
              <option value="none">None</option>
              <option value="lowPriority">Low Priority</option>
              <option value="normalPriority">Medium Priority</option>
              <option value="highPriority">High Priority</option>
              <option value="last1Day">Last 1 Day</option>
              <option value="last1Week">Last 1 Week</option>
              <option value="last1Month">Last 1 Month</option>
              <option value="last1Year">Last 1 Year</option>
            </select>
          }
        </span>
        <span>
          <span>
            <SortRoundedIcon className={styles.icon} />
          </span>
          {
            <select className={styles.select} defaultValue={'none'} onChange={(change) => {
              sortNotices(notices, change.target.value);
              mapStateToProps;
              handleMouseEnter();
            }}>
              <option value="none">None</option>
              <option value="date">Date</option>
              <option value="title">Title</option>
              <option value="priority">Priority</option>
            </select>
          }
        </span>
        <span>
          {role === 'Manager' && (
            <span
              tabIndex="0"
              role="button"
              className="card-post"
              onClick={handlePlusIconClick}
            >
              <FaPlus />
            </span>
          )}
        </span>
      </center>

      <div className={styles.cardComponentContainer}>
        {(notices || []).map(notice => (
          <Card
            key={notice.id}
            notice={notice}
            onSaveEdit={handleEditNotice}
            onDelete={handleDeleteNotice}
            showReadMore
          />
        ))}
      </div>
      <Modal
        description="Write message"
        open={isModalVisible}
        onCancel={handlePlusIconCancel}
        className={styles.modalContainer}
        footer={[<Button key="post" onClick={handleSave}>Post</Button>]}
      >
        <div className={styles.postCreationContainer}>
          <section>
            <label htmlFor="title">
              Title:
            </label>
            <Input
              id="title"
              name="title"
              value={title}
              onChange={e => onSetTitle(e.target.value)}
            />
          </section>
          <section>
            <label htmlFor="description">
              Description:
            </label>
            <TextArea
              id="description"
              name="description"
              value={description}
              onChange={e => onSetDescription(e.target.value)}
              autoSize={{ minRows: 3, maxRows: 5 }}
            />
          </section>
          <section>
            <label htmlFor="priority">
              Priority:
            </label>
            <Select
              id="priority"
              name="priority"
              value={priority}
              style={{ width: 200 }}
              onChange={handlePriorityChange}
            >
              <Select.Option value="HIGH">HIGH</Select.Option>
              <Select.Option value="MEDIUM">MEDIUM</Select.Option>
              <Select.Option value="LOW">LOW</Select.Option>
            </Select>
          </section>
        </div>
      </Modal>
    </div>
  );
}

const mapStateToProps = ({ noticeReducer }) => ({
  allNotices: _get(noticeReducer, 'allNotices'),
  title: _get(noticeReducer, 'title'),
  description: _get(noticeReducer, 'description'),
  postType: _get(noticeReducer, 'postType'),
  priority: _get(noticeReducer, 'priority'),
});

const mapDispatchToProps = dispatch => ({
  onSetNotices: payload => dispatch(setNotices(payload)),
  onSetTitle: title => dispatch(setTitle(title)),
  onSetDescription: description => dispatch(setDescription(description)),
  onSetPostType: postType => dispatch(setPostType(postType)),
  onResetPostData: () => dispatch(resetPostData()),
  onResetAllPostData: () => dispatch(resetAllData()),
  onSetPriority: priority => dispatch(setPriority(priority)),

});

export default connect(mapStateToProps, mapDispatchToProps)(Notices);
