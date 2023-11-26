import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import CardForApplication from '../../molecules/Card/CardCompound/CardForApplication';
// styles
import { Grid } from '@material-ui/core';
import 'bootstrap/dist/css/bootstrap.min.css';
// icons
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';

function ViewApplications() {
  const location = useLocation();
  const listingId = location.state?.listingId;
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const accessToken = JSON.parse(sessionStorage.getItem('userCred'))?.token;
  useEffect(() => {
    axios.get(`http://localhost:3001/Applications/allApplicationsForListing/${listingId}`, {
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
      .put(`http://localhost:3001/Applications/updateStatus/${applicationId}`, { status: 'approved' }, {
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
      .put(`http://localhost:3001/Applications/updateStatus/${applicationId}`, { status: 'rejected' }, {
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
      .put(`http://localhost:3001/Applications/updateStatus/${applicationId}`, { status: 'waitlisted' }, {
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
    <div>
      {loading && <p>Loading...</p>}
      {!loading && applications && applications.length > 0 && (
        <>
          <br></br><br></br><br></br>
          <h2><center><b>APPLICATIONS FOR LISTING ID: {listingId}</b></center></h2>
          
          <Grid container style={{marginTop: "7%"}}>
            <Grid item xs={4} sm={4} md={4}>
              {/* In Progress Applications */}
              {inProgressApplications.length > 0 && (
                <>
                  <h3><center><b>WAITLISTED</b></center></h3>
                  {inProgressApplications.map(application => (
                    <div style={{marginBottom: "5%"}}>
                      <CardForApplication
                        key={application.id}
                        application={application}
                      />
                      <ClearIcon
                        style={{color: "#e01b24", marginLeft: "20%"}}
                        onClick={() => handleReject(application.id)}
                      />
                      <CheckIcon
                        style={{color: "#2ec27e", marginLeft: "40%"}}
                        onClick={() => handleApprove(application.id)}
                      />
                    </div>
                  ))}
                </>
              )}
            </Grid>
            
            <Grid item xs={4} sm={4} md={4}>
              {/* Approved Applications */}
              {approvedApplications.length > 0 && (
                <>
                  <h3><center><b>APPROVED</b></center></h3>
                  {approvedApplications.map(application => (
                    <div style={{marginBottom: "5%"}}>
                      <CardForApplication
                        key={application.id}
                        application={application}
                      />
                    </div>
                  ))}
                </>
              )}
            </Grid>

            <Grid item xs={4} sm={4} md={4}>
              {/* Rejected Applications */}
              {rejectedApplications.length > 0 && (
                <>
                  <h3><center><b>REJECTED</b></center></h3>
                  {rejectedApplications.map(application => (
                    <div style={{marginBottom: "5%"}}>
                      <CardForApplication
                        key={application.id}
                        application={application}
                      />
                    </div>
                  ))}
                </>
              )}
            </Grid>
          </Grid>
        </>
      )}
    </div>
  );
}

export default ViewApplications;
