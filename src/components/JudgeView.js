import React, { useState } from 'react';
import axios from 'axios';
import './JudgeView.css'; // Assuming you have a CSS file for styling

const JudgeView = () => {
  const [file, setFile] = useState(null);
  const [response, setResponse] = useState(null);

  const handleFileChange = (e) => setFile(e.target.files[0]);

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append('pdf', file);

    const { data } = await axios.post('http://localhost:8000/api/pdf/upload', formData);
    setResponse(data);
  };

  return (
    <div className="judge-view">
      <h2>Judge Upload</h2>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
      {response && (
        <div className="response">
          <p><strong>Unique ID:</strong> {response.uniqueId}</p>
          <p><strong>Password:</strong> {response.password}</p>
        </div>
      )}
    </div>
  );
};

export default JudgeView;
