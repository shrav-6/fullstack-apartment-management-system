import React from "react";
import Listing from "./Room";

const RoomsList = ({ listing }) => {
  if (listing.length === 0) {
    return (
      <div className="empty-search">
        <h3>Unfortunately, no rooms matched your search parameters</h3>
      </div>
    );
  }
  return (
    <section className="roomslist">
      <div className="roomslist-center">
        {listing.map(item => {
          return <Listing key={item.id} item={item} />;
        })}
      </div>
    </section>
  );
};

export default RoomsList;
