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
import RentalAgreementPDF from './RentalAgreementPDF';
// import AddListing from './addListings';

// tenant view page
function ViewTenant() {
  const [rentalAgreementText, setRentalAgreementText] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const [cardNumber, setCardNumber] = useState('');
  const [cvv, setCVV] = useState('');
  const [payments, setPayments] = useState([]);
  //const location = useLocation();
  const userId = location.state?.userId;
  console.log('in view tenant');
  const [info, setInfo] = useState([]);
  const apartmentNumber = info[0];
  const buildingName = info[1];
  const buildingAddress = info[2];
  const phoneNumber = info[3];
  const rent = info[4];
  const unit = info[5];
  const startsFrom = info[6];
  const description = info[7];
  const extras = info[8];
  const pets = info[9];
  const managerName = info[10];
  //const cardinfo = 0;
  //const cvv = 0;
  //const rentalAgreementText = 'RENTAL AGREEMENT';
  //rent, unit, startsFrom, description, extras, pets
  //const [loading, setLoading] = useState(true);
  /*
  It is the tenant's view.
Once the Public User Sends Application to the Manager and on approval, the user will be promoted to Tenant View.
The Tenant View Contains Apartment details, Agreement, Rents Paid, Contact Details and Services Requested.
  */// buildingInfo
  const accessToken = sessionStorage.getItem('accessToken');
  useEffect(() => {
    // console.log('Inside Applications.jsx: View applications for listing with ID:', listingId);
    axios
      .get('http://localhost:3001/Buildings/new/buildingInfo', {
        headers: {
          accessToken: sessionStorage.getItem('accessToken'),
        },
      })
      .then((response) => {
      // console.log('Applications received successfully:', response);
        setInfo(response.data.data);
        console.log('info:', info);
        //console.log(info.find());
        //setLoading(false);
        //rentalAgreementText = 'RENTAL AGREEMENT';
      })
      .catch((error) => {
        console.error('Error viewing applications for this listing:', error);
        //setLoading(false);
      });
  }, [accessToken]);

  useEffect(() => {
    // Fetch property listings from the API when the component mounts
    axios
      .get('http://localhost:3001/Payments/getInfo', {
        headers: {
          accessToken: sessionStorage.getItem('accessToken'),
        },
      })
      .then((response) => {
        //console.log('Payment history:', response.data.data);
        setPayments(response.data.data);
        console.log('payments', payments);
      })
      .catch((error) => {
        console.error('Error fetching listings:', error);
      });
  }, [accessToken]);

  const handleViewAgreement = () => {
    console.log('rentalAgreementText:', rentalAgreementText);
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

  /*const handlePayment = () => {
    // call backend api to insert a new record with amount and date
  };*/

  const handleSubmit = (e) => {
    e.preventDefault();
    // Get the current date
    const currentDate = new Date();

    // Format the date as 'YYYY-MM-DD'
    const formattedDate = `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1).toString().padStart(2, '0')}-${currentDate.getDate().toString().padStart(2, '0')}`;
    console.log(formattedDate);

    // Implement logic to update the listing on the backend
    axios
      .post('http://localhost:3001/Payments/pay', {
        date: formattedDate, amount: rent, cardinfo: cardNumber, cvv: cvv,
      }, {
        headers: {
          accessToken: sessionStorage.getItem('accessToken'),
        },
      })
      .then((response) => {
        console.log('response', response);
        // Redirect to the view listings page after updating
        window.location.reload();
      })
      .catch((error) => {
        console.error('Error in payment', error);
      });
  };

  return (

    <div> <br></br>
      <br></br>
      <br></br><h1>Tenant View</h1>
      <br></br>
      <h2>Building details:</h2>
      <p>Manager: {managerName} </p>
      <p>Building Name: {buildingName} </p>
      <p>Building Address: {buildingAddress} </p>
      <p>Contact Building: {phoneNumber} </p>
      <h2>Unit details</h2>
      <p>Unit: {unit}</p>
      <p>Apartment number: {apartmentNumber} </p>
      <p>Description: {description}</p>
      <p>Extras: {extras}</p>
      <p>Pets Allowed: {pets}</p>
      <p>Rent: {rent}</p>
      <p>Start Date: {startsFrom}</p>
      {/*<ReactPDF
        file={{
          url: 'http://www.example.com/sample.pdf',
        }}
      />
       Button to generate PDF */}
      {/*<button type="button" onClick={handleGeneratePDF}>
        Generate Agreement PDF
      </button>
      {/* Display the PDF if rentalAgreementText is available
      <RentalAgreementPDF rentalAgreementText={rentalAgreementText} />*/}
      <h2>Payment history</h2>
      <div className="row">
        {payments.map(payment => (
          <div className="col-md-4 mb-4" key={payment.id}>
            <p>Transaction ID: {payment.id}</p>
            <p>Payment date: {payment.date}</p>
            <p>Rent paid: {payment.amount}</p>
          </div>
        ))}
      </div>

      <h2>Pay Rent</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Card Number:</label>
          <input
            type="text"
            value={cardNumber}
            onChange={handleCardNumberChange}
            placeholder="Enter card number"
          />
        </div>
        <div>
          <label>CVV:</label>
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

  );
}

export default ViewTenant;
