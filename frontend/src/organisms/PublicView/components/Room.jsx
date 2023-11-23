import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import defaultImg from "../images/room-1.jpeg";
import PropTypes from "prop-types";
import { memo } from "react";
import { LiaHeartSolid } from "react-icons/lia";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Alert from 'react-bootstrap/Alert';

const Listing = memo(({ item, index, isWishList, fetchWishlist }) => {
  const { id, buildingName, buildingNameSlug, rent, availableUnit } = item;
  const [isWished, setWished] = useState(isWishList || false);
  const [showAlert, setShowAlert] = useState(false);

  const navigate = useNavigate();

  const handleWishlist = async () => {
    const accessToken = JSON.parse(sessionStorage.getItem('userCred'))?.token;
    if (!accessToken) {
      // Show alert if there is no access token
      setShowAlert(true);
      return;
    }

    try {
      if (!isWished) {
        console.log(id);
        // Example: Make a POST request to a wishlist API endpoint to add
        const response = await axios.post("http://localhost:3001/wishlist/add", { listingId: id, status: true }, {
          headers: {
            accessToken: JSON.parse(sessionStorage.getItem('userCred'))?.token,
          },
        });
        console.log(response.data);
      } else {
        // Example: Make a POST request to a wishlist API endpoint to remove
        console.log("in else block");
        const response = await axios.post("http://localhost:3001/wishlist/remove", { listingId: id, status: false }, {
          headers: {
            accessToken: JSON.parse(sessionStorage.getItem('userCred'))?.token,
          },
        });
        console.log(response.data);
      }

      // Toggle the wishlist status after making the API call
      setWished(!isWished);
    } catch (error) {
      console.error("Error adding/removing from wishlist:", error);
    }
    fetchWishlist();
  };

  return (
    <>
      {showAlert && (
        <Alert variant="light">
          For wishlist, please <Alert.Link href="/signin">sign in</Alert.Link>.
        </Alert>
      )}
      <article style={{margin: "15px"}}>
        <div className="img-container">
          <img src={defaultImg} alt="single room" />
          <div className="price-top">
            <h6>${rent}</h6>
            <p>per Month</p>
          </div>
          <div className="wishlist-top">
            <LiaHeartSolid
              id="heart-icon"
              onClick={handleWishlist}
              style={{ color: isWished || isWishList ? "red" : "white" }}
            />
          </div>
          <Link to={`/listing/${id}`} className="btn-primary room-link">
            features
          </Link>
        </div>
        <p className="room-info">{buildingName}</p>
      </article>
    </>
  );
});

Listing.propTypes = {
  item: PropTypes.object.isRequired,
};

export default Listing;
