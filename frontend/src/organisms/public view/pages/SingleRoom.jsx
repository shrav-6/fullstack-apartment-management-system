import React, { useEffect } from "react";
import defaultBcg from "../images/room-1.jpeg";
import { useParams, useNavigate } from "react-router-dom";
import { useRoomContext } from "../context";
import StyledHero from "../components/StyledHero";
import Banner from "../components/Banner";


const SingleRoom = () => {
  const { getRoom, forApplication, } = useRoomContext();
  const { id } = useParams();
  const listing = getRoom(id);
  
  
  const accessToken = sessionStorage.getItem('accessToken');
  const targetRoute = accessToken ? '/application' : '/signin';

  const navigate = useNavigate();

  if (!listing) {
    return (
      <div className="error">
        <h3>no such room could be found...</h3>
        <button className="btn-primary" onClick={() => navigate('/rooms')}>
          back to rooms
        </button>
      </div>
    );
  }

  const {
    buildingName,
    unitAvailable,
    rent,
    description,
    address,
    extras,
    pets,
    images,
    startsFrom
  } = listing;
  console.log(listing);

  const [main, ...defaultImages] = images;
  
  useEffect(() => {
    forApplication(unitAvailable,buildingName,id);
  }, [unitAvailable,buildingName])
            
  return (
    <>
      <StyledHero img={images[0] || defaultBcg}>
        <Banner title={buildingName}>
        <button className="btn-primary" onClick={() => navigate('/rooms')}>
          back to rooms
        </button>
        <button className="btn-primary" onClick={() => navigate(targetRoute, {
            state: { fromSignUp: accessToken ? false : true, unitAvailable: unitAvailable, buildingName: buildingName, listingId:id}
            // Your state object
          })}>
            Send An Application
            </button>
        </Banner>
      </StyledHero>
      <section className="single-room">
        <div className="single-room-images">
          {defaultImages.map((item, index) => (
            <img key={index} src={item} alt={buildingName} />
          ))}
        </div>
        <div className="single-room-info">
          <article className="desc">
            <h3>details</h3>
            <p>{description}</p>
          </article>
          <article className="info">
            <h3>info</h3>
            <h6>Rent: ${rent}</h6>
            <h6>Address: {address}</h6>
            <h6>starts from: {startsFrom}</h6>
            <h6>{pets ? "pets allowed" : "no pets allowed"}</h6>
          </article>
        </div>
      </section>
      <section className="room-extras">
        <h6>extras</h6>
        <ul className="extras">
          {extras.map((item, index) => (
            <li key={index}>- {item}</li>
          ))}
        </ul>
      </section>
      
    </>
  );
};

export default SingleRoom;
