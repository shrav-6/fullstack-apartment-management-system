import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { message } from 'antd';
import _get from 'lodash/get';
import Card from '../../../molecules/Card/Card';
import { useState } from 'react';
import FilterAltRoundedIcon from '@mui/icons-material/FilterAltRounded';
import SortRoundedIcon from '@mui/icons-material/SortRounded';

import {
  // createNotice,
  // getNoticeById,
  getAllNotices,
} from './Notices.service';
//import { setNotices } from '../data/notice.actions';

function NoticesM() {

  const [data, setData] = useState([]);

  useEffect(() => {
    getAllNotices()
    .then(response => setData(response))
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

  const [isDropdownVisible, setDropdownVisible] = useState(false);

  const handleMouseEnter = () => {
    setDropdownVisible(true);
  };

  const handleMouseLeave = () => {
    setDropdownVisible(false);
  };
  
  return (
    <div>
      <h1 className="nav-notice">Notices</h1>
      <div
        style={{float:"right"}}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}>
        <div>
          <FilterAltRoundedIcon />
          {isDropdownVisible && <DropdownFilterMenu notices />}
        </div>
        <div>
          <SortRoundedIcon />
          {isDropdownVisible && <DropdownSortMenu  notices />}
        </div>
      </div>
      <div className="card">
        {data.map(notice => (
          <Card
            notice={notice}
          />
        ))}
      </div>
    </div>
  );
}

// const mapStateToProps = ({ noticeReducer }) => ({
//   allNotices: _get(noticeReducer, 'allNotices'),
// });

// const mapDispatchToProps = dispatch => ({
//   onSetNotices: payload => dispatch(setNotices(payload)),
// });

export default NoticesM;
