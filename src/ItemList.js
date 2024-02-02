import React, { useState,useEffect } from 'react';
import { Link } from 'react-router-dom';
import './App.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

// Functional component for displaying a list of properties
const ItemList = ({ properties }) => {
  // State variables for filtering and search functionality
  const [searchTerm, setSearchTerm] = useState('');
  const [propertyType, setPropertyType] = useState('any');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [minBedrooms, setMinBedrooms] = useState('');
  const [maxBedrooms, setMaxBedrooms] = useState('');
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [postcodeArea, setPostcodeArea] = useState('');
  const [searchResults, setSearchResults] = useState(properties);

  
// State variables for managing favorites
  const [favorites, setFavorites] = useState([]);

 // Function to add a property to favorites 
  const addToFavorites = (property) => {
    if (!favorites.some((fav) => fav.id === property.id)) {
      const updatedFavorites = [...favorites, property];
      setFavorites(updatedFavorites);
      localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    }
  };
  

  // Function to remove a property from favorites
  const removeFromFavorites = (propertyId) => {
    const updatedFavorites = favorites.filter((fav) => fav.id !== propertyId);
    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };

  // useEffect to load favorites from local storage on component mount
  useEffect(() => {
    const storedFavorites = localStorage.getItem('favorites');
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
  },[]);


  // Function to handle search input
  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    filterProperties(term, propertyType, minPrice, maxPrice, minBedrooms, maxBedrooms, startDate, endDate, postcodeArea);
  };


// Function to handle property type filter
  const handleTypeFilter = (e) => {
    const type = e.target.value;
    setPropertyType(type);
    filterProperties(searchTerm, type, minPrice, maxPrice, minBedrooms, maxBedrooms, startDate, endDate, postcodeArea);
  };

  // Functions to handle  minimum price
  const handleMinPrice = (e) => {
    const min = e.target.value;
    if (min >= 0 || min === '') {
      setMinPrice(min);
      filterProperties(searchTerm, propertyType, min, maxPrice, minBedrooms, maxBedrooms, startDate, endDate, postcodeArea);
    }
  };
  
  // Function to handle maximum price
  const handleMaxPrice = (e) => {
    const max = e.target.value;
    if (max >= 0 || max === '') {
      setMaxPrice(max);
      filterProperties(searchTerm, propertyType, minPrice, max, minBedrooms, maxBedrooms, startDate, endDate, postcodeArea);
    }
  };
  
  // Function to handle minimum bedrooms
  const handleMinBedrooms = (e) => {
    const minBeds = e.target.value;
    if (minBeds >= 0 || minBeds === '') {
      setMinBedrooms(minBeds);
      filterProperties(searchTerm, propertyType, minPrice, maxPrice, minBeds, maxBedrooms, startDate, endDate, postcodeArea);
    }
  };
  
  // Function to handle maximum bedrooms
  const handleMaxBedrooms = (e) => {
    const maxBeds = e.target.value;
    if (maxBeds >= 0 || maxBeds === '') {
      setMaxBedrooms(maxBeds);
      filterProperties(searchTerm, propertyType, minPrice, maxPrice, minBedrooms, maxBeds, startDate, endDate, postcodeArea);
    }
  };

  //Function to handle date
  const handleDateChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
    filterProperties(searchTerm, propertyType, minPrice, maxPrice, minBedrooms, maxBedrooms, start, end, postcodeArea);
  };

// Function to handle postal code
  const handlePostcodeArea = (e) => {
    const area = e.target.value;
    setPostcodeArea(area);
    filterProperties(searchTerm, propertyType, minPrice, maxPrice, minBedrooms, maxBedrooms, startDate, endDate, area);
  };

  // Function to handle reset options
  const handleReset = () => {
    setSearchTerm('');
    setPropertyType('any');
    setMinPrice('');
    setMaxPrice('');
    setMinBedrooms('');
    setMaxBedrooms('');
    setStartDate(null);
    setEndDate(null);
    setPostcodeArea('');
    setSearchResults(properties);
  };

  // Function to filter properties based on various criteria
  const filterProperties = (term, type, min, max, minBeds, maxBeds, start, end, area) => {
    const filteredResults = properties.filter((property) => {
      const titleMatch = property.title.toLowerCase().includes(term.toLowerCase());
      const typeMatch = type === 'any' ? true : property.type === type.toLowerCase();
      const minPriceMatch = min === '' ? true : parseInt(property.price.replace(/\D/g, '')) >= parseInt(min);
      const maxPriceMatch = max === '' ? true : parseInt(property.price.replace(/\D/g, '')) <= parseInt(max);
      const minBedMatch = minBeds === '' ? true : property.bedrooms >= parseInt(minBeds);
      const maxBedMatch = maxBeds === '' ? true : property.bedrooms <= parseInt(maxBeds);
      const startDateMatch = !start || !end ? true : new Date(property.dateAdded) >= start && new Date(property.dateAdded) <= end;
      const postcodeAreaMatch = area === '' ? true : property.postcode.startsWith(area.toUpperCase());

      return (
        titleMatch &&
        typeMatch &&
        minPriceMatch &&
        maxPriceMatch &&
        minBedMatch &&
        maxBedMatch &&
        startDateMatch &&
        postcodeAreaMatch
      );
    });
    setSearchResults(filteredResults);
  };

  // JSX structure for the component

  return (

    <div className="property-container">

      <div className="card">

        <h2 className="green-text">Explore Available Properties</h2>  
        <h3 className="white-text">Sale and Rent Across the United Kingdom !</h3>
        <div className="search-card-box">
          <form>

            <input  
              type="text"
              placeholder="Search by title..."
              value={searchTerm}
              onChange={handleSearch}
            />

            <select value={propertyType} onChange={handleTypeFilter}>
              <option value="any">Any Type</option>
              <option value="house">House</option>
              <option value="flat">Flat</option>
    
            </select>
            <input
              type="number"
              placeholder="Min Price"
              value={minPrice}
              onChange={handleMinPrice}
            />
            <input
              type="number"
              placeholder="Max Price"
              value={maxPrice}
              onChange={handleMaxPrice}
            />
            <input
              type="number"
              placeholder="Min Bedrooms"
              value={minBedrooms}
              onChange={handleMinBedrooms}
            />
            <input
              type="number"
              placeholder="Max Bedrooms"
              value={maxBedrooms}
              onChange={handleMaxBedrooms}
            />
            <input
              type="text"
              placeholder="Postcode Area"
              value={postcodeArea}
              onChange={handlePostcodeArea}
            />
            <DatePicker
              selected={startDate}
              onChange={handleDateChange}
              startDate={startDate}
              endDate={endDate}
              selectsRange
              placeholderText="Select Date Range"
            />
             <button className="reset-btn" type="button" onClick={handleReset}>Reset Filters</button>
          </form>
        </div>
      </div>
      <div className="content-wrapper">
      <div className="property-cards">
  {searchResults.map((property) => (
    <div key={property.id} className="property-card">
      <Link to={`/property/${property.id}`}>
        <img src={property.imageUrl} alt={property.title} className="property-image" />
      </Link>
      <div className="property-details">
        <div className="card-text">
          <h3 className="property-title">{property.title}</h3>
          <p className="property-type">Type : {property.type}</p>
          <p className="property-bedrooms">Bedrooms : {property.bedrooms}</p>
          <p className="property-price">Price : {property.price}</p>
          <p className="property-location">Location : {property.location}</p>
          <p className="property-postcode">postcode : {property.postcode}</p>
          <p className="property-dateAdded">Added date : {property.dateAdded}</p>
        </div>
        <div className="favorite-button-wrapper">
          <button onClick={(e) => { e.stopPropagation(); addToFavorites(property); }}>Add to Favorites</button>
        </div>
      </div>
      
    </div>
  ))}
</div>
  <hr className="separator-line" />

  <div className="favorites-tab">
  <h2>Favourite List </h2>
  {favorites.length > 0 && (
      <button className="clear-favorites-btn" onClick={() => setFavorites([])}>
        <i className="fas fa-trash-alt"></i> Clear Favourite List   {/*Clearing the Favourites List */}
      </button>
    )}
  <div className="favorites-list">
    {favorites.map((favProperty) => (
      <div key={favProperty.id} className="property-card-list"> 
        <Link to={`/property/${favProperty.id}`}>
          <img src={favProperty.imageUrl} alt={favProperty.title} className="property-image" />

        </Link>
        
        <div className="property-details">
          <div className="card-text">
            <h3 className="property-title">{favProperty.title}</h3>
            <p className="property-type">Type : {favProperty.type}</p>
            <p className="property-bedrooms">Bedrooms : {favProperty.bedrooms}</p>
            <p className="property-price">Price : {favProperty.price}</p><br/>
    
            <button onClick={() => removeFromFavorites(favProperty.id)}>Remove</button>
          </div>
        </div>
      </div>
    ))}
  </div>
</div>
        </div>
      </div>
   
  );
};

export default ItemList;