// PropertyDetail.js

import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import './App.css'; // Import CSS file for styling

const PropertyDetail = ({ properties }) => {
  const { id } = useParams(); // Access the property ID from the URL

  // Find the property with the matching ID
  const property = properties.find(prop => prop.id === parseInt(id));

  if (!property) {
    return <div className="not-found">Property not found</div>;
  }

  // Embed Google Maps using latitude and longitude
  const mapEmbedUrl = `https://www.google.com/maps/embed/v1/place?key=AIzaSyBlbe-DaP58ZxNZF0osxbU9I3oNxtcARlw&q=${property.Lati},${property.Long}`;

  // JSX structure for the component
  return (
    <div className="web-view">
      <div className="property-heading">
        <div className="white-box">
          <Link to="/" className="back-link">
            <div className="back-icon-wrapper">
              <FontAwesomeIcon icon={faArrowLeft} className="back-icon" />
              <span className="back-text"></span>
            </div>
          </Link>
          <h1>Property Details</h1>
        </div>
      </div>
      <div className="property-detail">
        <div className="property-info">
          <h2>{property.title}</h2>
          <img src={property.imageUrl} alt={property.title} className="property-image" />
          <div className="property-description">
            <h3>Type : <span className="special-bedrooms">{property.type}</span></h3>
            <h3>Bedrooms : <span className="special-bedrooms">{property.bedrooms}</span></h3>
            <h3>Price : <span className="special-bedrooms">{property.price}</span></h3>
            <h3>Location : <span className="special-bedrooms">{property.location}</span></h3>
            <h3>Postcode : <span className="special-bedrooms">{property.postcode}</span></h3>
            <h3>Added date : <span className="special-bedrooms">{property.dateAdded}</span></h3>
            <h3>Tenure : <span className="special-bedrooms">{property.tenure}</span></h3>
            <h3>Description <span className="special-bedrooms"><br/><br/>{property.description}</span></h3>
            <br />
            <h2>- Images Of the Property -</h2>
            <div className="image-gallery">
              <img src={property.imageUrl2} alt={property.title} className="property-image" />
              <img src={property.imageUrl3} alt={property.title} className="property-image" />
              <img src={property.imageUrl4} alt={property.title} className="property-image" />
              <img src={property.imageUrl5} alt={property.title} className="property-image" />
              <img src={property.imageUrl6} alt={property.title} className="property-image" />
              <img src={property.imageUrl7} alt={property.title} className="property-image" />
            </div><br/>
            <div className="map-container">
              <h2>Property Location</h2>
              <iframe
                title="Property Location"
                width="600"
                height="450"
                loading="lazy"
                allowFullScreen
                src={mapEmbedUrl}
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetail;
