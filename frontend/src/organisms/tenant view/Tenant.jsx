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
import './TenantView.css';
//import RentalAgreementPDF from './RentalAgreementPDF';
// import AddListing from './addListings';

// tenant view page
function ViewTenant() {
  const navigate = useNavigate();
  const location = useLocation();
  const [cardNumber, setCardNumber] = useState('');
  const [cvv, setCVV] = useState('');
  const [payments, setPayments] = useState([]);
  const userId = location.state?.userId;
  const [data, setData] = useState([]);
  const accessToken = JSON.parse(sessionStorage.getItem('userCred'))?.token;

  useEffect(() => {
    axios
      .get('http://localhost:3001/Buildings/getBuildingInfo', {
        headers: {
          accessToken: JSON.parse(sessionStorage.getItem('userCred'))?.token,
        },
      })
      .then((response) => {
        const { data } = response.data;
        setData(response.data.data);
      })
      .catch((error) => {
        console.error('Error in getting building info for tenants:', error);
        //setLoading(false);
      });
  }, []);

  const apartmentNumber = data[0];
  const buildingName = data[1];
  const buildingAddress = data[2];
  const phoneNumber = data[3];
  const rent = data[4];
  const unit = data[5];
  const startsFrom = data[6];
  const description = data[7];
  const extras = data[8];
  const pets = data[9];
  const managerName = data[10];

  useEffect(() => {
    // Fetch property listings from the API when the component mounts
    axios
      .get('http://localhost:3001/Payments/getPaymentInfo', {
        headers: {
          accessToken: JSON.parse(sessionStorage.getItem('userCred'))?.token,
        },
      })
      .then((response) => {
        setPayments(response.data.data);
      })
      .catch((error) => {
        console.error('Error fetching listings:', error);
      });
  }, [accessToken]);

  const handleViewAgreement = () => {
    navigate('/viewagreement', { state: { rentalAgreementText } });
  };

  const handleGeneratePDF = () => {
    // Logic to dynamically generate rentalAgreementText
    const dynamicText = './sample.pdf'; // Replace this with your logic
    setRentalAgreementText(dynamicText);
    navigate('/viewagreement', { state: { dynamicText } });
  };

  const handleCardNumberChange = (e) => {
    setCardNumber(e.target.value);
  };

  const handleCVVChange = (e) => {
    setCVV(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Get the current date

    // Validate card number and CVV length
    if (cardNumber.length !== 16 || cvv.length !== 3) {
      alert('Enter a 16-digit card number and a valid 3-digit CVV.');
    } else {
      const currentDate = new Date();

      // Format the date as 'YYYY-MM-DD'
      const formattedDate = `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1).toString().padStart(2, '0')}-${currentDate.getDate().toString().padStart(2, '0')}`;

      // Implement logic to update the listing on the backend
      axios
        .post('http://localhost:3001/Payments/pay', {
          date: formattedDate, amount: rent, cardinfo: cardNumber, cvv,
        }, {
          headers: {
            accessToken: JSON.parse(sessionStorage.getItem('userCred'))?.token,
          },
        })
        .then((response) => {
          // Redirect to the view listings page after updating
          window.location.reload();
        })
        .catch((error) => {
          console.error('Error in payment', error);
        });
    }
  };

  const rentalAgreementText = `<h2>RESIDENTIAL LEASE AGREEMENT</h2><br>This Residential Lease Agreement ("Agreement") is entered into on ${startsFrom}, by and between:<br><b>LANDLORD:</b><br>${managerName}<br>${buildingAddress}</br>${phoneNumber}</br><b>TENANT:</b><br>Yourself<br>${apartmentNumber}<br>${buildingName}<br>${buildingAddress}<br><b><br>1. PROPERTY:</b> Landlord agrees to lease to Tenant the residential property located at ${apartmentNumber}, ${buildingName}, ${buildingAddress}.<br><b>2. LEASE TERM:</b> The lease term will commence on ${startsFrom} and will continue for one (1) year.</br><b>3. RENT:</b> Tenant agrees to pay rent in the amount of ${rent} per month. Rent payments are due on the 30th of each month.</br><b>4. DESCRIPTION:</b> The residential property consists of ${unit}.</br><b>5. SECURITY DEPOSIT:</b> Tenant shall pay a security deposit of half a month's rent to be held by the Landlord for the duration of the lease term. The deposit will be returned to Tenant within 30 days after the termination of this Agreement, less any deductions for unpaid rent or damages.</br><b>6. UTILITIES:</b> Tenant is responsible for all utilities, including but not limited to water, electricity, gas, and internet.</br><b>7. MAINTENANCE:</b> Tenant agrees to maintain the property in good condition and promptly report any damages or necessary repairs to the Landlord.</br><b>8. TERMINATION:</b> Either party may terminate this lease agreement with written notice of 90 days before the intended termination date.</br><b>9. GOVERNING LAW:</b> This Agreement shall be governed by the laws of our Jurisdiction</br><b>IN WITNESS WHEREOF</b>, the parties hereto have executed this Residential Lease Agreement as of the date first above written.<i></br>Digitally signed by Manager</br>Digitally signed by Tenant</i>`;

  return (
    <body>
      <div className="property-list-container">
        <br></br>
        <br></br>
        <br></br>
        <Card className="card">
          <CardContent>
            <h2>Welcome to {buildingName} </h2>
            <p>Manager: {managerName} </p>
            <p>Building Name: {buildingName} </p>
            <p>Building Address: {buildingAddress} </p>
            <p>Contact Management: {phoneNumber} </p>
          </CardContent>
        </Card>
        <br></br>
        <Card className="card">
          <CardContent>
            <h2>Your Unit</h2>
            <p>Unit: {unit}</p>
            <p>Apartment number: {apartmentNumber} </p>
            <p>Description: {description}</p>
            <p>Extras: {extras}</p>
            <p>Pets Allowed: {pets}</p>
            <p>Rent: {rent}</p>
            <p>Start Date: {startsFrom}</p>
          </CardContent>
        </Card>
        <br></br>
        <Card className="card">
          <CardContent>
            <div dangerouslySetInnerHTML={{ __html: rentalAgreementText }} />
          </CardContent>
        </Card>
        <br></br>
        <h2>Payment history</h2>
        <div className="row">
          {payments.map(payment => (
            <div className="col-md-4 mb-4" key={payment.id}>
              <Card className="card">
                <CardContent>
                  <p>Transaction ID: {payment.id}</p>
                  <p>Payment date: {payment.date}</p>
                  <p>Rent paid: {payment.amount}</p>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
        <h2>Pay rent amount ${rent}</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Card Number:  </label>
            <input
              type="text"
              value={cardNumber}
              onChange={handleCardNumberChange}
              placeholder="Enter card number"
            />
          </div>
          <div>
            <label>CVV:  </label>
            <input
              type="text"
              value={cvv}
              onChange={handleCVVChange}
              placeholder="Enter CVV"
            />
          </div>
          <button type="submit">Submit Payment</button>
        </form>
      </div>
    </body>
  );
}

export default ViewTenant;
