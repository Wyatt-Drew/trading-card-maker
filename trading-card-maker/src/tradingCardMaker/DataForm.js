import React, { useState, useRef } from 'react';
import html2canvas from 'html2canvas';
import './DownloadButton.css';
import './DataForm.css';
import '../App.css';

function DataForm(){
  const [image, setImage] = useState(null);
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
  
  return(
    <div class = "form">
      <div class="upload-btn-wrapper">
        <button class="btn">Upload a file</button>
        <input type="file" name="myfile" onChange={handleImageChange} />
      </div>
      <input type="file" onChange={handleImageChange} />
      <input 
        className="input"
        type="text" 
        placeholder="Enter Text" 
        value={text} 
        onChange={(e) => setText(e.target.value)} 
      />
        <div ref={cardRef} style={{ position: 'relative' }}>
        {image && <img src={image} alt="Uploaded" style={{ width: '300px', height: '400px' }} />}
        <p style={{ position: 'absolute', bottom: 10, left: 10, color: 'white' }}>{text}</p>
        {/* {/* Add your template image or style here /} */}
      </div>
      <button onClick={downloadCard}>Download Card</button>
      <button type="button" data-dl>
	<span class="dl-icon"></span><span>&#x44;&#x6F;&#x77;&#x6E;&#x6C;&#x6F;&#x61;&#x64;</span>
</button>
    </div>
  );
}
export default DataForm;