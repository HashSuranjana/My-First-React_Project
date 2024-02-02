// PropertyDetails.js
import React from 'react';
import { useParams } from 'react-router-dom';

const PropertyDetails = ({ properties }) => {
  const { id } = useParams();
  const selectedProperty = properties.find(property => property.id === parseInt(id));

  return (
    <div>
      <h2>{selectedProperty.title}</h2>
    </div>
  );
};

export default PropertyDetails;
