import React, { useState, useEffect } from 'react';
import api from '../services/api';

function ImagesCountByHours() {
  const [counts, setCounts] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const response = await api.get('/getImagesCountByHours');
        setCounts(response.data.counts);
        setError('');
      } catch (error) {
        setCounts([]);
        setError('Error fetching image counts');
        console.error(error);
      }
    };

    fetchCounts();
  }, []);

  return (
    <div className="component-container">
      <h2>Image Counts by Hours</h2>
      {error && <p className="error-message">{error}</p>}
      {counts.length > 0 && (
        <ul className="count-list">
          {counts.map((count) => (
            <li key={count._id} className="count-item">
              <p>Hour: {count._id}</p>
              <p>Count: {count.count}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ImagesCountByHours;
