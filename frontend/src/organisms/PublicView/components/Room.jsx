import React from "react";
import { Link} from "react-router-dom";
import defaultImg from "../images/room-1.jpeg";
import PropTypes from "prop-types";
import { memo } from "react";

const Listing = memo(({ item, index }) => {
  const { id, buildingName, buildingNameSlug, images, rent, availableUnit } = item;
  console.log(images)

  return (
    <article className="room">
      <div className="img-container">
      <img src={images[0] || defaultImg} alt="single room" />
        <div className="price-top">
          <h6>${rent}</h6>
          <p>per Month</p>
        </div>
        <Link to={`/listing/${id}`} className="btn-primary room-link">
          features
        </Link>
      </div>
      <p className="room-info">{buildingName}</p>
    </article>
  );
});

Listing.propTypes = {
  item: PropTypes.object.isRequired,
};

export default Listing;
