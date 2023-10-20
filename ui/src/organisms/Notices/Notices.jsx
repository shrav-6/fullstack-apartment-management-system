import React, { /* useState, */ useEffect } from 'react';
import { connect } from 'react-redux';
import _get from 'lodash/get';
import {
  // createNotice,
  // getNoticeById,
  getAllNotices,
  // editNotice,
  // deleteNotice,
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
      <h1>Notices</h1>
      <ul>
        {notices.map(notice => (
          <div key={notice.id}>
            <p>{notice.title}</p>
            <p>{notice.Description}</p>
            <p>By {notice.Author_name}</p>
            <p>On {notice.date_and_time}</p>
            {/* <button
              type="button"
              onClick={() => handleEditNotice(notice.id)}
            >Edit
            </button> */}
            {/* <button
              type="button"
              onClick={() => handleDeleteNotice(notice.id)}
            >Delete
            </button> */}
          </div>
        ))}
      </ul>
      {/* <button
        type="button"
        onClick={handleCreateNotice}
      >Add New Notice
      </button> */}
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
