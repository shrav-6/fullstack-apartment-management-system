import React, { useContext } from "react";
import { useRoomContext } from "../context";
import Title from "./Title";

const RoomsFilter = () => {
  const context = useRoomContext();
  const {
    handleChange,
    unitAvailable,
    rent,
    moveInDate,
    listing,
    maxrent,
    sortOption
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
          <label htmlFor="type">Number of Bedrooms</label>
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

        <div className="form-group">
        <label htmlFor="moveInDate">Move-in-Date</label>
          <input
            type="date"
            id="moveInDate"
            name="moveInDate"
            onChange={handleChange}
            className="form-control"
            value={moveInDate}
          />
          </div>

          <div className="form-group">
        <label htmlFor="sortOption">Sort By</label>
        <select
          name="sortOption"
          id="sortOption"
          onChange={handleChange}
          className="form-control"
          value={sortOption}
        >
          <option value="latest">Latest</option>
          <option value="highestToLowestRent">Highest Rent to Lowest Rent</option>
          <option value="lowestToHighestRent">Lowest Rent to Highest Rent</option>
          {/* Add more options as needed */}
        </select>
      </div>

        {/* End of apartment price */}
        
      </form>
    </section>
  );
};

export default RoomsFilter;
