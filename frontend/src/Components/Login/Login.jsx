import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import UploadCharts from '../Operations/UploadCharts';

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/login", { username, password });
      alert(response.data.message);
      localStorage.setItem("token", response.data.token);
      navigate("/uploadFlowchart");
    } catch (error) {
      alert(error.response?.data?.error || "Login failed!");
    }
  };

  return (
    <div className="flex justify-center items-center h-[90vh] bg-[#080808]">
      <div className="text-white bg-[#1E1E1E] p-8 rounded-xl shadow-xl w-[60vh] h-[60vh]">
        <h2 className="text-3xl text-center font-semibold mb-6">Login</h2>
        <form onSubmit={handleLogin} className="flex flex-col space-y-6">
          <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)}
            className="p-4 rounded-xl bg-[#2A2A2A] text-white"/>
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}
            className="p-4 rounded-xl bg-[#2A2A2A] text-white"/>
          <button type="submit" className="p-4 rounded-xl bg-blue-500 text-white font-semibold">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
