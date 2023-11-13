import React, { useContext } from "react";
import { useRoomContext } from "../context";
import Title from "./Title";

const RoomsFilter = () => {
  const context = useRoomContext();
  const {
    handleChange,
    unitAvailable,
    rent,
    listing,
    maxrent
  } = context;

  // Get unique types
  let unitAvailables = [
    ...new Set(listing.map((list) => list.unitAvailable)),
  ];
  unitAvailables = ["all", ...unitAvailables];

  // Map types to JSX options
  unitAvailables = unitAvailables.map((item, index) => (
    <option key={index} value={item}>
      {item}
    </option>
  ));


  return (
    <section className="filter-container">
      <Title title="search Apartments" />
      <form className="filter-form">
        {/* Select type */}
        <div className="form-group">
          <label htmlFor="type">Apartment unit type</label>
          <select
            name="unitAvailable"
            id="unitAvailable"
            onChange={handleChange}
            className="form-control"
            value={unitAvailable}
          >
            {unitAvailables}
          </select>
        </div>
        {/* End of select type */}
        {/* Apartment price */}
        <div className="form-group">
          <label htmlFor="Rent">Apartment price ${rent}</label>
          <input
            type="range"
            name="rent"
            min={1000}
            max={maxrent}
            id="rent"
            value={rent}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        {/* End of apartment price */}
        
      </form>
    </section>
  );
};

export default RoomsFilter;
