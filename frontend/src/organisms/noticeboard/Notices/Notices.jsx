import React, { /* useState, */ useEffect } from 'react';
import { connect } from 'react-redux';
import { message } from 'antd';
import _get from 'lodash/get';
import Card from '../../../molecules/Card/Card';
import { getAllNotices } from './Notices.service';
import { setNotices } from '../data/notice.actions';

function Notices({
  allNotices: notices = [],
  onSetNotices,
}) {
  useEffect(() => {
    getAllNotices()
      .then((response) => {
        if (!response?.data?.error) {
          onSetNotices({ allNotices: response });
        }
      })
      .catch((err) => {
        message.error(err);
      });
  }, []);

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
