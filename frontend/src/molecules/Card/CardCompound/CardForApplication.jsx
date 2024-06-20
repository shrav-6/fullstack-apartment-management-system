import React from 'react';
// styles
import '../Card.scss';
// icons
import AbcIcon from '@mui/icons-material/Abc';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import DescriptionIcon from '@mui/icons-material/Description';

function CardForApplication( { application } ) {
    const { 
        id,
        moveInDate,
        needParking,
        firstName,
        lastName,
        email,
        address,
        phoneNumber,
        additionalInfo
    } = application;

    return (
        <div className="listing-container-card" style={{maxWidth: "80%"}}>
            <div className="card-listing-title" align="center">Application ID: {id}</div>
            <hr></hr>
            <div className="card-description">
                <AbcIcon style={{color: "grey", marginRight: "5%"}}/>
                <b>First Name:</b> {firstName}
            </div>
            <div className="card-description">
                <AbcIcon style={{color: "black", marginRight: "5%"}}/>
                <b>Last Name:</b> {lastName}
            </div>
            <div className="card-description">
                <EmailIcon style={{color: "red", marginRight: "5%"}}/>
                <b>Email:</b> {email}
            </div>
            <div className="card-description">
                <PhoneIcon style={{color: "green", marginRight: "5%"}}/>
                <b>Phone No:</b> {phoneNumber}
            </div>
            <div className="card-description">
                <LocationOnIcon style={{color: "#EE4B2B", marginRight: "5%"}}/>
                <b>Address:</b> {address}
            </div>
            <div className="card-description">
                <CalendarMonthIcon style={{color: "blue", marginRight: "5%"}}/>
                <b>Move In Date:</b> {moveInDate}
            </div>
            <div className="card-description">
                <DirectionsCarIcon style={{color: "orange", marginRight: "5%"}}/>
                <b>Need Parking:</b> {needParking}
            </div>
            <div className="card-description">
                <DescriptionIcon style={{color: "brown", marginRight: "5%"}}/>
                <b>Additional Info:</b> {additionalInfo}
            </div>
        </div>
    );
}

export default CardForApplication;