/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useLocation } from 'react-router-dom';
import {
  message, Modal, Input, Button,
} from 'antd';
import _get from 'lodash/get';
import Card from '../../../molecules/Card/CardCompound/Card';
import {
  getAllNewsfeed,
  postAllNewsfeed,
  deleteNewfeed,
  editAllNewsfeed,
  getAllNewsfeedForManager,
} from './NewsFeeds.service';
import {
  setnewsfeed,
  setDescription,
  setTitle,
  setPostType,
  resetPostData,
} from '../data/newsfeed.actions';
import { STRING_CONSTANTS } from '../constants/newsfeed.constant';
// styles
import styles from './NewsfeedView.module.scss';

const { TextArea } = Input;
//const { pathname } = useLocation();

function Newsfeed({
  allNewsfeed: newsfeed = [],
  title,
  description,
  postType = '',
  onSetTitle,
  onSetNewsFeed,
  onSetDescription,
  onSetPostType = () => {},
  onResetPostData = () => {},
}) {
  const { pathname } = useLocation();
  const [editTrigger, setEditTrigger] = useState(0);
  const role = JSON.parse(sessionStorage.getItem('userCred'))?.role;

  const location = useLocation();

  const buildingId = location.state ? location.state.buildingId : null;

  useEffect(() => {
    fetchNewsFeed();
  }, []);

  const fetchNewsFeed = () => {
    getAllNewsfeed()
      .then((response) => {
        if (!response?.data?.error) {
          onSetNewsFeed({ allNewsfeed: response?.data?.data });
        }
      })
      .catch((err) => {
        message.error(err);
      });
  };
  const fetchNewsFeedForManager = () => {
    getAllNewsfeedForManager(buildingId)
      .then((response) => {
        if (!response?.data?.error) {
          onSetNewsFeed({ allNewsfeed: response?.data?.data });
        }
      })
      .catch((err) => {
        message.error(err);
      });
  };

  useEffect(() => {
    if (role === 'Manager') {
      fetchNewsFeedForManager(buildingId);
    } else {
      fetchNewsFeed();
    }
  }, [editTrigger]);

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

  const handleSave = () => {
    if (role !== 'Tenant') {
      message.error('Unauthorized action');
      return;
    }
    const payload = {
      title: postType === STRING_CONSTANTS.POST_TYPE_EDIT
        ? editedTitle
        : title,
      description: postType === STRING_CONSTANTS.POST_TYPE_EDIT
        ? editedDescription
        : description,
      dateAndTime: new Date().valueOf(),
      type: 'General',
    };

    postAllNewsfeed(payload)
      .then((response) => {
        if (!response?.data?.error) {
          // onSetNewsFeed({ allNewsfeed: [...newsfeed, response?.data?.data] });
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
  const handleEditNewsFeed = (id, editedTitle, editedDescription) => {
    if (role !== 'Tenant') {
      message.error('Unauthorized action');
      return;
    }
    const updatedNewsFeed = newsfeed.map((news) => {
      if (news.id === id) {
        return {
          ...news,
          title: editedTitle,
          description: editedDescription,
          updatedAt: new Date().valueOf(),
        };
      }
      return news;
    });

    const payload = {
      title: editedTitle,
      description: editedDescription,
      dateAndTime: new Date().valueOf(),
      type: 'General',
    };

    editAllNewsfeed(id, payload)
      .then((response) => {
        if (!response?.data?.error) {
          onSetNewsFeed({ allNewsfeed: updatedNewsFeed });
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

  const handleDeleteNewsFeed = (id) => {
    if (role !== 'Tenant') {
      message.error('Unauthorized action');
      return;
    }
    deleteNewfeed(id)
      .then((response) => {
        if (!response?.data?.error) {
          const updatedNews = newsfeed.filter(news => news.id !== id);
          onSetNewsFeed({ allNewsfeed: updatedNews });
          message.success('Feed deleted successfully');
        } else {
          message.error(response.data.error);
        }
      })
      .catch((err) => {
        message.error(err);
      });
  };

  return (
    <div className={styles.newsContainer}>
      <h1 className={`${styles.navNotice} ${styles.h1CustomStyle}`}>
        NewsFeed
      </h1>
      <div className={styles.addBtn}>
        {role === 'Tenant' && (
          <Button
            type="primary"
            onClick={handlePlusIconClick}
          >
            + Add a new post
          </Button>
        )}
      </div>
      <div className={styles.cardComponentContainer}>
        {(newsfeed || []).map(news => (
          <Card
            notice={news}
            onSaveEdit={handleEditNewsFeed}
            onDelete={() => handleDeleteNewsFeed(news?.id)}
            showReadMore={false}
            context="newsfeed"
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
        </div>
      </Modal>
    </div>
  );
}

const mapStateToProps = ({ newsfeedReducer }) => ({
  allNewsfeed: _get(newsfeedReducer, 'allNewsfeed'),
  title: _get(newsfeedReducer, 'title'),
  description: _get(newsfeedReducer, 'description'),
  postType: _get(newsfeedReducer, 'postType'),
});

const mapDispatchToProps = dispatch => ({
  onSetNewsFeed: payload => dispatch(setnewsfeed(payload)),
  onSetTitle: title => dispatch(setTitle(title)),
  onSetDescription: description => dispatch(setDescription(description)),
  onSetPostType: postType => dispatch(setPostType(postType)),
  onResetPostData: () => dispatch(resetPostData()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Newsfeed);
