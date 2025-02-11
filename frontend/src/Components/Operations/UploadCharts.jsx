import React, { useState } from 'react';
import axios from 'axios';

function UploadCharts() {
  const [file, setFile] = useState(null);
  const [messages, setMessages] = useState([
    { text: "Hi XYZ! Upload your flowchart to get started.", sender: "bot" }
  ]);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setMessages((prev) => [...prev, { text: "File selected. Ready to upload!", sender: "user" }]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      alert("Please select a file first.");
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    setLoading(true);
    setMessages((prev) => [...prev, { text: "Uploading file...", sender: "bot" }]);

    try {
      const response = await axios.post('http://127.0.0.1:5000/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      setMessages((prev) => [
        ...prev,
        { text: "File uploaded successfully! Processing...", sender: "bot" },
        { text: `Extracted Text: ${response.data.extracted_text}`, sender: "bot" }
      ]);
    } catch (error) {
      console.error('Error uploading file:', error);
      setMessages((prev) => [...prev, { text: "Error uploading file. Try again.", sender: "bot" }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen w-full flex flex-col items-center justify-center text-white bg-[#111111] p-5">
      <div className="w-full max-w-lg bg-[#222] p-5 rounded-lg shadow-md">
        <div className="h-80 overflow-y-auto mb-4 border border-gray-600 p-3 rounded-md">
          {messages.map((msg, index) => (
            <div key={index} className={`p-2 my-2 rounded-md ${msg.sender === "bot" ? " text-left" : " text-right"}`}>
              {msg.text}
            </div>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <input type="file" onChange={handleFileChange} className="text-white p-2 border border-gray-600 rounded-md" />
          <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md" disabled={loading}>
            {loading ? "Processing..." : "Upload"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default UploadCharts;
