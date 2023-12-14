import React, { useState } from 'react';

const WheelComponent = () => {
  const [scrollDirection, setScrollDirection] = useState('None');

  const handleWheel = (event) => {
    if (event.deltaY < 0) {
      setScrollDirection('Up');
    } else if (event.deltaY > 0) {
      setScrollDirection('Down');
    }
  };

  return (
    <div onWheel={handleWheel} style={{ width: '300px', height: '300px', border: '1px solid black', overflow: 'auto' }}>
      Scroll inside this box!
      <p>Scroll Direction: {scrollDirection}</p>
    </div>
  );
};

export default WheelComponent;
