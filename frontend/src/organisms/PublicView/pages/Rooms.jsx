import React from 'react';
import Hero from '../components/Hero';
import Banner from '../components/Banner';
import RoomsContainer from '../components/RoomsContainer';
function Rooms() {
  return (
    <>
      <Hero hero="roomsHero">
        <Banner title="Apartment Listing">
          {/* <Link to="/" className="btn-primary">
            return home
          </Link> */}
        </Banner>
      </Hero>
      <RoomsContainer />
    </>
  );
}

export default Rooms;
