import React, { useState } from 'react';
import api from '../services/api';

function ImageUpload() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploader, setUploader] = useState('');
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleFileChange = (event) => {
    const file = event.target.files[0];
  
    if (!file.type.startsWith('image/')) {
      setError('Please select a valid image file');
      return;
    }

    setSelectedFile(file);
  };

  const handleUploaderChange = (event) => {
    setUploader(event.target.value);
  };

  const handleUpload = async (event) => {
    event.preventDefault();

    if (!selectedFile) {
      setError('Please select an image file');
      return;
    }

    const formData = new FormData();
    formData.append('image', selectedFile);
    formData.append('uploader', uploader);

    try {
      await api.post('/upload', formData);
      setUploadSuccess(true);
      setError('');
    } catch (error) {
      setUploadSuccess(false);
      setError('Error uploading image');
      console.error(error);
    }
  };

  return (
    <div className="component-container">
      <h2>Image Upload</h2>
      <form onSubmit={handleUpload}>
        <input type="text" placeholder="Uploader Name" value={uploader} onChange={handleUploaderChange} />
        <input type="file" onChange={handleFileChange} />
        <button type="submit">Upload</button>
      </form>
      {error && <p className="error-message">{error}</p>}
      {uploadSuccess && <p>Image uploaded successfully!</p>}
    </div>
  );
}

export default ImageUpload;
