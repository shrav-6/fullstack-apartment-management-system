import React, { useState, useEffect, createContext, useContext } from "react";
import items from "./data1";

const RoomContext = createContext();

export const RoomProvider = ({ children }) => {
  const [state, setState] = useState({
    listing: [],
    sortedListing: [],
    loading: true,
    unitAvailable: "all",
    rent: 0,
    minrent:500,
    selectedAvailability:"",
    selectedBuilding:"",
    listingId:""

  });

  useEffect(() => {
    
    const listings = formatData(items);
    const maxrent = Math.max(...listings.map((item) => item.rent));
    setState((prevState) => ({
      ...prevState,
      listing: listings,
      sortedListing: listings,
      loading: false,
      maxrent: maxrent,
    }));
  }, []);

  const formatData = (items) => {
    return items.map((item) => {
      const id = item.fields.id;
      const images = item.fields.images.map((image) => image.fields.file.url);
      return { ...item.fields, images, id };
    });
  };

  const getRoom = (id) => {
    let tempListing = [...state.listing];
    const listing = tempListing.find((room) => room.id === id);
    console.log(listing);
    return listing;
  };

  const handleChange = (event) => {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const forApplication=(unit,building,id)=>{
    setState((prevState) => ({
      ...prevState,
      selectedAvailability:unit,
      selectedBuilding:building,
      listingId:id,

    }));
  }

  useEffect(() => {
    filterRooms();
  }, [state.unitAvailable, state.rent]);

  const filterRooms = () => {
    const { unitAvailable, rent } = state;
    // Transform values
    const rents = parseInt(rent);

    // Apply filters
    
    let tempListing = [...state.listing];

    // Filter by type
    if (unitAvailable !== "all") {
      tempListing = tempListing.filter((room) => room.unitAvailable === unitAvailable);
    }

    // Filter by price
    tempListing = tempListing.filter((room) => room.rent <= rents);

    setState((prevState) => ({
      ...prevState,
      sortedListing: tempListing,
    }));
  };

  return (
    <RoomContext.Provider
      value={{
        ...state,
        handleChange: handleChange,
        getRoom:getRoom,
        forApplication:forApplication,
      }}
    >
      {children}
    </RoomContext.Provider>
  );
};

export function useRoomContext() {
  return useContext(RoomContext);
}
