import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
// styles
import 'bootstrap/dist/css/bootstrap.min.css';
import '../Card.scss';
// icons
import BedIcon from '@mui/icons-material/Bed';
import DescriptionIcon from '@mui/icons-material/Description';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import PetsIcon from '@mui/icons-material/Pets';
import LocationOnIcon from '@mui/icons-material/LocationOn';


function CardForListing( { listing }, { buildingName }) {
    const navigate = useNavigate();
    
    const { 
        id,
        unitAvailable,
        apartmentNumber,
        description,
        rent,
        startsFrom,
        address,
        pets
    } = listing;


    const handleViewApplications = (listingId) => {
        axios
        .get(`http://172.17.0.237:8074/Applications/allApplicationsForListing/${listingId}`, {
            headers: {
                accessToken: sessionStorage.getItem('accessToken'),
            },
        })
        .then((response) => {
            console.log('Applications received successfully:', response);
            if (response.data.message === 'No applications for listing yet!') {
                console.log(response.data.message);
                alert(response.data.message);
                navigate('/listings', { state: { buildingName } });
            } else {
                navigate('/applications', { state: { listingId } });
            }
        })
        .catch((error) => {
            console.log("066666666666666");
            console.error('Error viewing applications for this listing:', error);
        });
    };

    return (
        <div className="listing-container-card" style={{marginBottom: "15%"}}>
            <div className="card-listing-title" align="center">Apartment No. {apartmentNumber}</div>
            <hr></hr>
            <div className="card-description">
                <BedIcon style={{color: "orange", marginRight: "5%"}}/>
                <b>Bedrooms:</b> {unitAvailable}
            </div>
            <div className="card-description">
                <DescriptionIcon style={{color: "brown", marginRight: "5%"}}/>
                <b>Description:</b> {description}
            </div>
            <div className="card-description">
                <AttachMoneyIcon style={{color: "black", marginRight: "5%"}}/>
                <b>Monthly Rent:</b> {rent}
            </div>
            <div className="card-description">
                <CalendarMonthIcon style={{color: "blue", marginRight: "5%"}}/>
                <b>Move In Date:</b> {startsFrom}
            </div>
            <div className="card-description">
                <PetsIcon style={{color: "green", marginRight: "5%"}}/>
                <b>Pets:</b> {pets}
            </div>
            <div className="card-description">
                <LocationOnIcon style={{color: "#EE4B2B", marginRight: "5%"}}/>
                <b>Address:</b> {address}
            </div>
            
            <center>
                <div className="btn btn-success viewBtn" onClick={() => handleViewApplications(listing.id)}>
                    View Applications
                </div>
            </center>
        </div>
    );
}

export default CardForListing;
