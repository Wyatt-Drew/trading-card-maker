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
    // Function to load an image
    const loadImage = (src) => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = src;
        img.onload = resolve;
        img.onerror = reject;
      });
    };
    // Load the images in sequence
    const loadImagesInOrder = async () => {
      const card = cardRef.current;
      const context = card.getContext('2d');
      try {
        await loadImage(cardImage);
        // Draw card image on the canvas here
        const cardImg = new Image();
        cardImg.src = cardImage;
        cardImg.onload = () => {
          context.drawImage(cardImg, 0, 0, card.width, card.height);
        };
        await loadImage(backgroundImg);
        // Draw background image on the canvas here
        // Set the state to true when both images are loaded
        const bgImg = new Image();
        bgImg.src = backgroundImg;
        bgImg.onload = () => {
          context.drawImage(bgImg, 0, 0, card.width, card.height);
        };
      } catch (error) {
        console.error("Error loading images", error);
      }
    };
    loadImagesInOrder();
  }, [cardImage, backgroundImg]);

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