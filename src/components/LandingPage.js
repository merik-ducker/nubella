// src/components/LandingPage.js
import React from 'react';
import Balloon from './Balloon';

const LandingPage = () => {
  const balloons = [
    { id: 1, color: 'linear-gradient(to right, #fcbad3, #a7c7e7)', size: '60px', position: { top: '80%', left: '20%' } },
    { id: 2, color: 'linear-gradient(to right, #bdecb6, #fdfd96)', size: '80px', position: { top: '50%', left: '50%' } },
    { id: 3, color: 'linear-gradient(to right, #c3aed6, #fddaa8)', size: '100px', position: { top: '70%', left: '80%' } },
    // Add more balloons as needed
  ];

  return (
    <div className="h-screen bg-blue-200 flex justify-center items-center relative">
      {balloons.map((balloon) => (
        <Balloon key={balloon.id} color={balloon.color} size={balloon.size} position={balloon.position} />
      ))}
    </div>
  );
};

export default LandingPage;
