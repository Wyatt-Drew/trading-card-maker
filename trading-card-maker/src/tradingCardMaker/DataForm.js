import React, { useState, useRef } from 'react';
import html2canvas from 'html2canvas';
import './DownloadButton.css';
import './DataForm.css';
import '../App.css';

function DataForm() {
  const [image, setImage] = useState(null);
  const [overlayImage, setOverlayImage] = useState(null);
  const [text, setText] = useState("");
  const cardRef = useRef(null);

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

  const downloadCard = () => {
    html2canvas(cardRef.current).then((canvas) => {
      const link = document.createElement("a");
      link.download = "trading-card.png";
      link.href = canvas.toDataURL("image/png");
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
    <div className = "container">
      <div className = "card">
        <div className = "cardImage" ref={cardRef}> {image && (<img src={image} />)}
          <p className = "cardText"> {text}</p>
        </div>
      </div>
      <div className="form">
        <input type="file" onChange={handleImageChange} />
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
