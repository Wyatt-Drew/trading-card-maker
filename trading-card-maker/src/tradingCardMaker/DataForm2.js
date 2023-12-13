import React, { useState, useEffect } from 'react';
import { Stage, Layer, Image } from 'react-konva';
import backgroundImgPath from '../assets/minecraft_ducky_template.png';
import './DownloadButton.css';
import './DataForm.css';
import '../App.css';

const DataForm = () => {
  // State for draggable text
  const [dragState, setDragState] = useState({
    isDragging: false,
    x: 50,
    y: 50,
  });

  const [image, setImage] = useState(new window.Image());
  const [dimensions, setDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const img = new window.Image();
    img.src = backgroundImgPath;
    img.onload = () => setImage(img);

    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Function to handle drag start
  const handleDragStart = () => {
    setDragState((prevState) => ({
      ...prevState,
      isDragging: true,
    }));
  };

  // Function to handle drag end
  const handleDragEnd = (e) => {
    setDragState({
      isDragging: false,
      x: e.target.x(),
      y: e.target.y(),
    });
  };

  return (
    <Stage width={dimensions.width} height={dimensions.height}>
      <Layer>
        <Image
          image={image}
          x={dragState.x}
          y={dragState.y}
          draggable
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
        />
      </Layer>
    </Stage>
  );
}

export default DataForm;
