import React, { useState, useRef, useEffect} from 'react';
import html2canvas from 'html2canvas';
import './DownloadButton.css';
import './DataForm.css';
import '../App.css';
import backgroundImg from '../assets/minecraft_ducky_template.png';

function DataForm() {
  const [image, setImage] = useState(null);
  const [overlayImage, setOverlayImage] = useState(null);
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

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setImage(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }

  };

  const drawImages = () => {
    const card = cardRef.current;
    const context = card.getContext('2d');

    // Draw the background image
    const bgImg = new Image();
    bgImg.src = backgroundImg;
    bgImg.onload = () => {
      context.drawImage(bgImg, 0, 0, card.width, card.height);
    };

    // Draw the main image
    if (image) {
      const img = new Image();
      img.src = image;
      img.onload = () => {
        context.drawImage(img, 0, 0, card.width, card.height);
      };
    }
  };

  const downloadCard = () => {
    html2canvas(cardRef.current).then((canvas) => {
      const link = document.createElement('a');
      link.download = 'trading-card.png';
      link.href = canvas.toDataURL('image/png');
      link.click();
    });
  };


  const handleDownloadClick = () => {
    let dlClass = "dl-working";
    let button = document.querySelector("[data-dl]");

    if (!button.classList.contains(dlClass)) {
      let lastSpan = button.querySelector("span:last-child");
      let lastSpanText = lastSpan.textContent;
      let timeout = getMSFromProperty("--dur", ":root");

      button.classList.add(dlClass);
      lastSpan.textContent = "Downloading…";
      button.disabled = true;

      setTimeout(() => {
        lastSpan.textContent = "Completed!";
      }, timeout * 0.9);

      setTimeout(() => {
        button.classList.remove(dlClass);
        lastSpan.textContent = lastSpanText;
        button.disabled = false;
      }, timeout + 1000);
    }
    html2canvas(cardRef.current).then((canvas) => {
      const link = document.createElement("a");
      link.download = "trading-card.png";
      link.href = canvas.toDataURL("image/png");
      link.click();
    });
  };

  const getMSFromProperty = (property, selector) => {
    let cs = window.getComputedStyle(document.querySelector(selector));
    let transDur = cs.getPropertyValue(property);
    let msLabelPos = transDur.indexOf("ms");
    let sLabelPos = transDur.indexOf("s");

    if (msLabelPos > -1) return transDur.substr(0, msLabelPos);
    else if (sLabelPos > -1) return transDur.substr(0, sLabelPos) * 1000;
  };

  return (
    <div className="container">
      <div className="card">
        <canvas ref={cardRef} width={300} height={400}>
        </canvas>
        <div className="cardImage">
          {image && <img src={image} alt="Main Image" />}
          <p className="cardText">{text}</p>
        </div>

      </div>
      <div className="form">
        <input type="file" onChange={handleImageChange} />
        <input
          className="input"
          type="text"
          placeholder="Enter Text"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        <button type="button" data-dl onClick={handleDownloadClick}>
          <span className="dl-icon"></span>
          <span>&#x44;&#x6F;&#x77;&#x6E;&#x6C;&#x6F;&#x61;&#x64;</span>
        </button>
      </div>
    </div>
  );
}

export default DataForm;