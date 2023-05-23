import React from 'react';
import ImageUpload from './components/ImageUpload';
import ImagesBetweenDates from './components/ImagesBetweenDates';
import ImagesCountByHours from './components/ImagesCountByHours';
import DownloadLatestImage from './components/DownloadLatestImage';
import './styles/style.css';


function App() {
  return (
    <div className="App">
      <ImageUpload />
      <ImagesBetweenDates />
      <ImagesCountByHours />
      <DownloadLatestImage />
    </div>
  );
}

export default App;
