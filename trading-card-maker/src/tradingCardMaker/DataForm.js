import React, { useState, useRef, useEffect} from 'react';
import html2canvas from 'html2canvas';
import downloadjs from 'downloadjs';
import './DownloadButton.css';
import './DataForm.css';
import '../App.css';
import backgroundImg from '../assets/minecraft_ducky_template.png';
import cardImage from '../assets/potato.png';

function DataForm() {
  const [image, setImage] = useState(null);
  const [text, setText] = useState("");
  const cardRef = useRef(null);

  useEffect(() => {
    // Load and draw the background image when the component mounts
    const card = cardRef.current;
    const context = card.getContext('2d');

    const bgImg = new Image();
    bgImg.src = backgroundImg;
    bgImg.onload = () => {
      context.drawImage(bgImg, 0, 0, card.width, card.height);
    };
  }, []);
  useEffect(() => {
    // Load and draw the background image when the component mounts
    const card = cardRef.current;
    const context = card.getContext('2d');

    const cardImg = new Image();
    cardImg.src = cardImage;
    cardImg.onload = () => {
      context.drawImage(cardImg, 0, 0, card.width, card.height);
    };
    setBackgroundImage();
  }, [image]);
  const setCardImage = () => {

  }
  //Name: setBackgroundImage
  //Purpose: This applies a background image to the entire card.
  //Requirement: The background should have a transparent area for the card image to show through.
  const setBackgroundImage = () => {
    const card = cardRef.current;
    const context = card.getContext('2d');
    const bgImg = new Image();
    bgImg.src = backgroundImg;
    bgImg.onload = () => {
      context.drawImage(bgImg, 0, 0, card.width, card.height);
    };
  }
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setImage(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
    drawImages();
  };

  const drawImages = () => {
    const card = cardRef.current;
    const context = card.getContext('2d');
  
    // Draw the background image
    const bgImg = new Image();
    bgImg.src = backgroundImg;
    bgImg.onload = () => {
      context.drawImage(bgImg, 0, 0, card.width, card.height);
  
      // Draw the main image
      if (image) {
        const img = new Image();
        img.src = image;
        img.onload = () => {
          context.drawImage(img, 10, 10, 20, 20);
          
          // Draw the text
          if (text) {
            context.fillStyle = 'black'; // Set text color
            context.font = '20px Arial'; // Set font properties
            context.fillText(text, 10, 390); // Adjust position and size as needed
          }
        };
      }
    };
  };
  const handleDownloadClick = () => {
    html2canvas(cardRef.current).then((canvas) => {
      const link = document.createElement("a");
      link.download = "trading-card.png";
      link.href = canvas.toDataURL("image/png");
      link.click();
    });
  };

  return (
    <div className="container">
      <div className="card" >
        <canvas ref={cardRef} width={300} height={400}></canvas>
      </div>
      <div className="form">
        <input type="file" onChange={handleImageChange} />
        <input type="file" value={image} onChange={(e) => setImage(e.target.value)} />
        <input className="input" type="text" placeholder="Enter Text" value={text} onChange={(e) => setText(e.target.value)}/>

        <button type="button" data-dl onClick={handleDownloadClick}>
          <span className="dl-icon"></span>
          <span>&#x44;&#x6F;&#x77;&#x6E;&#x6C;&#x6F;&#x61;&#x64;</span>
        </button>
      </div>
    </div>
  );
}

export default DataForm;