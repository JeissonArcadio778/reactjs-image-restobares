import React, { useState } from 'react';
import api from '../services/api';
import '../styles/style.css';

function DownloadLatestImage() {
  const [imageUrl, setImageUrl] = useState('');
  const [error, setError] = useState('');

  const handleDownload = async () => {
    try {
      const response = await api.get('getImage/latest');
      
      if (response.status === 404) {
        setError('No images found');
        setImageUrl('');
      } else {
        // Create a base64 URL for the image
        const imageUrl = `data:image/png;base64,${response.data}`;
        setImageUrl(imageUrl);
        setError('');
      }
    } catch (error) {
      setImageUrl('');
      setError('Error fetching latest image');
      console.error(error);
    }
  };

  return (
    <div className="component-container">
      <h2>Download Latest Image</h2>
      <button onClick={handleDownload}>Download</button>
      {error && <p className="error-message">{error}</p>}
      {imageUrl ? (
        <div>
          <img src={imageUrl} alt="" className="image-preview" />
          <a href={imageUrl} download className="download-link">
            Download Image
          </a>
        </div>
      ) : (
        <p>No images available</p>
      )}
    </div>
  );
}

export default DownloadLatestImage;
