/* eslint-disable no-const-assign */
/* eslint-disable no-alert */
/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable spaced-comment */
/* eslint-disable no-console */
/* eslint-disable no-undef */
/* eslint-disable max-len */
// src/pages/PropertyListPage.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import './Applications.css';

function ViewApplications() {
  const location = useLocation();
  const listingId = location.state?.listingId;
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  // const listingId = applications[0].listingId;
  // const [approvedApplicationId] = useState(null);
  const accessToken = JSON.parse(sessionStorage.getItem('userCred'))?.token;
  useEffect(() => {
    axios.get(`http://172.17.0.237:8074/Applications/allApplicationsForListing/${listingId}`, {
      headers: {
        accessToken: JSON.parse(sessionStorage.getItem('userCred'))?.token,
      },
    })
      .then((response) => {
        setApplications(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error viewing applications for this listing:', error);
        setLoading(false);
      });
  }, []);

  const handleApprove = (applicationId) => {
    alert('Once approved cannot be revoked!');
    // once the approve button is clicked, call the backend to set status to approve
    axios
      .put(`http://172.17.0.237:8074/Applications/updateStatus/${applicationId}`, { status: 'approved' }, {
        headers: {
          accessToken: JSON.parse(sessionStorage.getItem('userCred'))?.token,
        },
      })
      .then((response) => {
        window.location.reload({ state: listingId });
      })
      .catch((error) => {
        console.error('Error updating status', error);
      });
  };

  const handleReject = (applicationId) => {
    axios
      .put(`http://172.17.0.237:8074/Applications/updateStatus/${applicationId}`, { status: 'rejected' }, {
        headers: {
          accessToken: JSON.parse(sessionStorage.getItem('userCred'))?.token,
        },
      })
      .then((response) => {
        //reload
        window.location.reload({ state: listingId });
      })
      .catch((error) => {
        console.error('Error updating status', error);
      }, []);
  };

  const handleInProgress = (applicationId) => {
    axios
      .put(`http://172.17.0.237:8074/Applications/updateStatus/${applicationId}`, { status: 'waitlisted' }, {
        headers: {
          accessToken: JSON.parse(sessionStorage.getItem('userCred'))?.token,
        },
      })
      .then((response) => {
        window.location.reload({ state: listingId });
      })
      .catch((error) => {
        console.error('Error updating status', error);
      });
  };

  // Separate applications based on status
  const approvedApplications = applications.filter(application => application.status === 'approved');
  const inProgressApplications = applications.filter(application => application.status === 'waitlisted');
  const rejectedApplications = applications.filter(application => application.status === 'rejected');

  return (
    <body>
      <div className="content">
        {loading && <p>Loading...</p>}
        {!loading && applications && applications.length > 0 && (
          <>
            <br></br><br></br><br></br><br></br><br></br>
            {/*<h1>Applications for listing ID: {listingId}</h1>*/}
            {/* Approved Applications */}
            {approvedApplications.length > 0 && (
              <>
                <div className="headings">Approved Applications</div>
                <div className="application-card-container">
                  {approvedApplications.map(application => (
                    <div key={application.id} className="each application">
                      {/* Render application details as before */}
                      <Card className="application-card">
                        <CardContent>
                          <p>Application ID: {application.id}</p>
                          <p>Move-in date: {application.moveInDate}</p>
                          <p>Need Parking: {application.needParking}</p>
                          <p>First name: {application.firstName}</p>
                          <p>Last name: {application.lastName}</p>
                          <p>Email: {application.email}</p>
                          <p>Phone number: {application.phoneNumber}</p>
                          <p>Address: {application.address}</p>
                          <p>Additional Information: {application.additionalInfo}</p>
                        </CardContent>
                      </Card>
                    </div>
                  ))}
                </div>
              </>
            )}

            {/* In Progress Applications */}
            {inProgressApplications.length > 0 && (
              <>
                <h2>Waitlisted Applications</h2>
                <div className="row">
                  {inProgressApplications.map(application => (
                    <div key={application.id} className="each application">
                      {/* Render application details as before */}
                      <Card className="application-card">
                        <CardContent>
                      <p>Application ID: {application.id}</p>
                      <p>Move-in date: {application.moveInDate}</p>
                      <p>Need Parking: {application.needParking}</p>
                      <p>First name: {application.firstName}</p>
                      <p>Last name: {application.lastName}</p>
                      <p>Email: {application.email}</p>
                      <p>Phone number: {application.phoneNumber}</p>
                      <p>Address: {application.address}</p>
                      <p>Additional Information: {application.additionalInfo}</p>
                      <button type="button" onClick={() => handleApprove(application.id)}>Approve</button> <t></t><t></t><t></t>
                      <button type="button" onClick={() => handleReject(application.id)}>Reject</button>
                      </CardContent>
                      </Card>
                    </div>
                  ))}
                </div>
              </>
            )}

            {/* Rejected Applications */}
            {rejectedApplications.length > 0 && (
              <>
                <h2>Rejected Applications</h2>
                <div className="row">
                  {rejectedApplications.map(application => (
                    <div key={application.id} className="each application">
                      {/* Render application details as before */}
                      <Card className="application-card">
                        <CardContent>
                      <p>Application ID: {application.id}</p>
                      <p>Move-in date: {application.moveInDate}</p>
                      <p>Need Parking: {application.needParking}</p>
                      <p>First name: {application.firstName}</p>
                      <p>Last name: {application.lastName}</p>
                      <p>Email: {application.email}</p>
                      <p>Phone number: {application.phoneNumber}</p>
                      <p>Address: {application.address}</p>
                      <p>Additional Information: {application.additionalInfo}</p>
                      <button type="button" onClick={() => handleInProgress(application.id)}>Waitlist</button>
                      </CardContent>
                      </Card>
                    </div>
                  ))}
                </div>
              </>
            )}
          </>
        )}
      </div>
    </body>
  );
}

export default ViewApplications;
