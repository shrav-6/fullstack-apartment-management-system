import React,{useContext} from "react";
import { useRoomContext } from "../context"; // Use the custom hook to access context
import Loading from "./Loading";
import RoomsFilter from "./RoomsFilter";
import RoomsList from "./RoomsList";

export default function RoomContainer() {
  const context = useRoomContext();

  const { loading, sortedListing, listing } = context;
  if (loading) {
    return <Loading />;
  }

  return (
    
    <>
      <RoomsFilter listing={listing} />
      <RoomsList listing={sortedListing} />
    </>
  );
}
