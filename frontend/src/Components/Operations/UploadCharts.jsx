import React, { useState } from 'react';
import axios from 'axios';

function UploadCharts() {
  const [file, setFile] = useState(null);
  const [extractedText, setExtractedText] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('http://127.0.0.1:5000/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setExtractedText(response.data.extracted_text);
      alert('File processed successfully!');
    } catch (error) {
      console.error('Error uploading file:', error);
      alert('Error uploading file.');
    }
  };

  return (
    <div className='h-screen w-full  text-white bg-[#111111]'>
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleFileChange} />
        <button type="submit">Upload</button>
      </form>
      {extractedText && (
        <div>
          <h3 className='font-bold text-4xl '>Extracted Text:</h3>
          <pre className='font-bold text-4xl ' class>{extractedText}</pre>
        </div>
      )}
    </div>
  );
}

export default UploadCharts;
