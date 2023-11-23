import React, {
  useState, useEffect, createContext, useContext,
} from 'react';
import items from './data1';

const RoomContext = createContext();

export function RoomProvider({ children }) {
  const [state, setState] = useState({
    listing: [],
    sortedListing: [],
    loading: true,
    unitAvailable: 'all',
    rent: 0,
    minrent: 500,
    selectedAvailability: '',
    selectedBuilding: '',
    listingId: '',

  });

  useEffect(() => {
    const listings = formatData(items);
    const maxrent = Math.max(...listings.map(item => item.rent));
    setState(prevState => ({
      ...prevState,
      listing: listings,
      sortedListing: listings,
      loading: false,
      maxrent,
    }));
  }, []);

  const formatData = items => items.map((item) => {
    const { id } = item.fields;
    const images = item.fields.images.map(image => image.fields.file.url);
    return { ...item.fields, images, id };
  });

  const getRoom = (id) => {
    const tempListing = [...state.listing];
    const listing = tempListing.find(room => room.id === id);
    console.log(listing);
    return listing;
  };

  const handleChange = (event) => {
    const { target } = event;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const { name } = target;
    console.log(state);
    setState(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const forApplication = (unit, building, id) => {
    setState(prevState => ({
      ...prevState,
      selectedAvailability: unit,
      selectedBuilding: building,
      listingId: id,

    }));
  };

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
    if (unitAvailable !== 'all') {
      tempListing = tempListing.filter(room => room.unitAvailable === unitAvailable);
    }

    // Filter by price
    tempListing = tempListing.filter(room => room.rent <= rents);

    setState(prevState => ({
      ...prevState,
      sortedListing: tempListing,
    }));
  };

  return (
    <RoomContext.Provider
      value={{
        ...state,
        handleChange,
        getRoom,
        forApplication,
      }}
    >
      {children}
    </RoomContext.Provider>
  );
}

export function useRoomContext() {
  return useContext(RoomContext);
}
