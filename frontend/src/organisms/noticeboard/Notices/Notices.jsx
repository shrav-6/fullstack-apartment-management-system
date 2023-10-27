import React, { /* useState, */ useEffect } from 'react';
import { connect } from 'react-redux';
import _get from 'lodash/get';
import Card from '../../../molecules/components/Card';

import {
  // createNotice,
  // getNoticeById,
  getAllNotices,
} from './Notices.service';
import { setNotices } from '../data/notice.actions';

function Notices({
  allNotices: notices,
  onSetNotices,
}) {
  useEffect(() => {
    getAllNotices()
      .then(allNotices => onSetNotices({ allNotices }));
  }, []);

  // const handleCreateNotice = () => {
  //   const newNotice = {
  //     title: 'New Notice',
  //     description: 'This is a new notice',
  //     authorName: 'John Doe',
  //     dateAndTime: '2023-10-09T21:51:36.000Z',
  //   };
  //   createNotice(newNotice).then((notice) => {
  //     // setNotices([...notices, notice]);
  //   });
  // };

  // const handleEditNotice = (id) => {
  //   const updatedNotice = {
  //     title: 'Updated Title',
  //     description: 'This is an updated notice',
  //     authorName: 'Jane Doe',
  //     dateAndTime: '2023-10-10T21:51:36.000Z',
  //   };
  //   editNotice(id, updatedNotice).then((notice) => {
  //     setNotices(notices.map(notice => (notice.id === id ? updatedNotice : notice)));
  //   });
  // };

  // const handleDeleteNotice = (id) => {
  //   deleteNotice(id).then(() => {
  //     setNotices(notices.filter(notice => notice.id !== id));
  //   });
  // };

  return (
    <div>
      <h1 className="nav-notice">Notices</h1>
      <div className="card">
        {(notices || []).map(notice => (
          <Card
            notice={notice}
          />
        ))}
      </div>
    </div>
  );
}

const mapStateToProps = ({ noticeReducer }) => ({
  allNotices: _get(noticeReducer, 'allNotices'),
});

const mapDispatchToProps = dispatch => ({
  onSetNotices: payload => dispatch(setNotices(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Notices);
