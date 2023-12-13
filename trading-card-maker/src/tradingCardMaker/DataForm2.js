import React, { useState, useRef, useEffect} from 'react';
import backgroundImg from '../assets/minecraft_ducky_template.png';
import html2canvas from 'html2canvas';
import './DownloadButton.css';
import './DataForm.css';
import '../App.css';

const DataForm = () => {
    const [image, setImage] = useState(null);
    const cardRef = useRef(null);
    const fileInputRef = useRef(null);
    const [text, setText] = useState("");
    const [isDragging, setIsDragging] = useState(false);
    const [position, setPosition] = useState({ x: 0, y: 0 });

    const startDrag = (e) => {
      setIsDragging(true);
      updatePosition(e);
  };

  const drag = (e) => {
      if (isDragging) {
          updatePosition(e);
      }
  };

  const endDrag = () => {
      setIsDragging(false);
  };

  const updatePosition = (e) => {
      if (cardRef.current) {
          const rect = cardRef.current.getBoundingClientRect();
          setPosition({
              x: e.clientX - rect.left,
              y: e.clientY - rect.top
          });
      }
  };


    const handleImageUpload = (e) => {
      const file = e.target.files[0];
      if (file && file.type.startsWith('image/')) {
          const reader = new FileReader();
          reader.onload = (e) => {
              const img = new Image();
              img.onload = () => {
                  const canvas = cardRef.current;
                  canvas.width = img.width;
                  canvas.height = img.height;
                  const ctx = canvas.getContext('2d');
                  ctx.drawImage(img, canvas.width/4, canvas.height/4, canvas.width/2, canvas.height/2);
              };
              img.src = e.target.result;
              setImage(img);
          };
          reader.readAsDataURL(file);
      }
  };
  const handleFileInputClick = () => {
      fileInputRef.current.click();
  };

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
            await loadImage(backgroundImg);
            // Draw background image on the canvas here
            // Set the state to true when both images are loaded
            const bgImg = new Image();
            bgImg.src = backgroundImg;
            bgImg.onload = () => {
              context.drawImage(bgImg, 0 + position.x, 0 + position.y, card.width + position.x, card.height + position.y);
            };
          } catch (error) {
            console.error("Error loading images", error);
          }
        };
        loadImagesInOrder();
      }, [backgroundImg, image, position.y, position.x]);
    
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
            <div className="card" 
                onMouseDown={startDrag} 
                onMouseMove={drag} 
                onMouseUp={endDrag} 
                onMouseLeave={endDrag}>

                <canvas ref={cardRef} />
                {isDragging && (
                    <div>
                        Dragging at X: {position.x}, Y: {position.y}
                    </div>
                )}
            </div>
            <div className="form">
                <input type="file" ref={fileInputRef} style={{ display: 'none' }} onChange={handleImageUpload}/>
                <button onClick={handleFileInputClick}>Upload Image</button>
                <input className="input" type="text" placeholder="Enter Text" value={text} onChange={(e) => setText(e.target.value)}/>
                <button type="button" data-dl onClick={handleDownloadClick}>
                    <span className="dl-icon"></span>
                    <span>&#x44;&#x6F;&#x77;&#x6E;&#x6C;&#x6F;&#x61;&#x64;</span>
                </button>
            </div>
        </div>
    );
};

export default DataForm;
