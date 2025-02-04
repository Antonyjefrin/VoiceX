import React from 'react'
import BouncingSpheres from '../Animation/BouncingSpheres';
import UploadCharts from '../Operations/UploadCharts';

const Home = () => {
    return (
      <div className="relative h-screen w-full bg-[#080808]">
        <BouncingSpheres />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-3xl font-bold">
          <h1>Welcome to FlowchartX</h1>
          <p>Explore AI-powered flowchart explanations</p>
         <UploadCharts/>
        </div>
      </div>
    );
  };

export default Home