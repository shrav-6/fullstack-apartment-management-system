import React from "react";
import { FaCocktail, FaHiking, FaShuttleVan, FaBeer } from "react-icons/fa";
import Title from "./Title";

const Services = () => {
  const services = [
    {
      icon: <FaCocktail />,
      title: "Property Listing",
      info:
        " Property managers can create and manage listings for available apartments, including details such as rent, location, amenities, and photos. This service helps attract potential tenants."
    },
    {
      icon: <FaHiking />,
      title: "Tenant Application and Screening",
      info:
        "Allows potential tenants to submit rental applications online. Property managers can screen applicants  to ensure they are suitable renters."
    },
    {
      icon: <FaShuttleVan />,
      title: "Notices",
      info:
        "Offers Notice systems to facilitate communication between tenants and property managers."
    },
    {
      icon: <FaBeer />,
      title: "Resident Portal",
      info:
        "Tenants can access their accounts, pay rent through a dedicated resident portal."
    }
  ];

  return (
    <section className="services">
      <Title title="services" />
      <div className="services-center">
        {services.map(item => (
          <article key={`item-${item.title}`} className="service">
            <span>{item.icon}</span>
            <h6>{item.title}</h6>
            <p>{item.info}</p>
          </article>
        ))}
      </div>
    </section>
  );
};

export default Services;
