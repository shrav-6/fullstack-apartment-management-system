import React from "react";
import { Link } from "react-router-dom";
import Hero from "../components/Hero";
import Banner from "../components/Banner";
import Services from "../components/Services";
// import FeaturedRooms from "../components/FeaturedRooms";

function Home() {
  return (
    <div>
      <Hero>
        <Banner
          title="SHELTER"
          subtitle="A solution for Manager and Tenants"
        >
          {/* <Link to="/rooms" className="btn-primary">
            our rooms
          </Link> */}
        </Banner>
      </Hero>
       <Services />
    {/* <FeaturedRooms />   */}
    </div>
  );
}

export default Home;
