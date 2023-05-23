import React, { useState } from 'react';
import api from '../services/api';
import '../styles/style.css';

function ImagesBetweenDates() {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [images, setImages] = useState([]);
  const [error, setError] = useState('');

  const handleStartDateChange = (event) => {
    setStartDate(event.target.value);
  };

  const handleEndDateChange = (event) => {
    setEndDate(event.target.value);
  };

  const handleSearch = async (event) => {
    event.preventDefault();

    try {
      const response = await api.post('/imagesByDate', { startDate, endDate });
      setImages(response.data.images);
      setError('');
    } catch (error) {
      setImages([]);
      setError('Error fetching images');
      console.error(error);
    }
  };

  return (
    <div className="component-container">
      <h2>Images Between Dates</h2>
      <form onSubmit={handleSearch}>
        <input type="date" value={startDate} onChange={handleStartDateChange} />
        <input type="date" value={endDate} onChange={handleEndDateChange} />
        <button type="submit">Search</button>
      </form>
      {error && <p className="error-message">{error}</p>}
      {images.length > 0 && (
        <ul className="image-list">
          {images.map((image) => (
            <li key={image._id} className="image-item">
              <img src={image.url} alt="" className="image-preview" />
              <p>Uploader: {image.uploader}</p>
              <p>Upload Date: {image.uploadDate}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ImagesBetweenDates;
