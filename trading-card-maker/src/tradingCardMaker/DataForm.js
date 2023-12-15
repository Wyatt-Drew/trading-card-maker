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
    const [prevPosition, setPrevPosition] = useState({ x: 0, y: 0 });
    const [scale, setScale] = useState(1);




    const handleWheel = (event) => {
      if (event.deltaY < 0) {
        setScale(prevScale => prevScale + 0.1);
      } else if (event.deltaY > 0) {
        if (scale > 0.1){setScale(prevScale => prevScale - 0.1);}
        
      }
    };

    const startDrag = (e) => {
      setIsDragging(true);
      setPrevPosition({
        x: e.clientX - position.x,
        y: e.clientY - position.y
      });
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
    setPosition({
      x: e.clientX - prevPosition.x,
      y: e.clientY - prevPosition.y
    });
  };

    const handleImageUpload = (e) => {
      const file = e.target.files[0];
      if (file && file.type.startsWith('image/')) {
          const reader = new FileReader();
          reader.onload = (e) => {
              const image = new Image();
              image.src = e.target.result;
              setImage(image);
          };
          reader.readAsDataURL(file);
      }
  };
  const handleFileInputClick = () => {
      fileInputRef.current.click();
  };

  // Function to calculate the best font size
  const calculateFontSize = (ctx, text, maxWidth, maxHeight) => {
    let fontSize = 20; // Start with a default font size
    ctx.font = `${fontSize}px Arial`;

    // Increase the font size until the text is too wide or too tall
    while (ctx.measureText(text).width < maxWidth && fontSize < maxHeight) {
      fontSize++;
      ctx.font = `${fontSize}px Arial`;
    }

    // Decrease the font size slightly for a better fit
    return fontSize - 1;
  };



  useEffect(() => {
    // Function to load an image
    const loadImage = (src) => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = src;
        img.onload = () => resolve(img);
        img.onerror = reject;
      });
    };

    // Function to draw images on the canvas
    const drawImages = (image, bgImg) => {
      const card = cardRef.current;
      const context = card.getContext('2d');
      
      context.clearRect(0, 0, card.width, card.height);
      if (image) {
        let drawHeight = image.height / (card.offsetHeight /card.height);
        let drawWidth = image.width / (card.offsetWidth /card.width);
        context.drawImage(image, position.x, position.y, 
          (drawWidth * scale), (drawHeight * scale));
      }
      context.drawImage(bgImg, 0, 0, card.width, card.height);
      // Set the font, align and baseline if necessary
      context.font = '70px Arial';
      context.textAlign = 'center';
      context.textBaseline = 'middle';
      context.fillStyle = 'white';

      // Set the position and content of your text
      const x = card.offsetWidth / 2;
      const y = card.offsetHeight/16;
      // Draw the text
      context.fillText(text, x, y);
    };

    // Load the images concurrently and then draw them
    const loadAndDrawImages = async () => {
      try {
        const [img, bgImg] = await Promise.all([
          image ? loadImage(image.src) : null,
          loadImage(backgroundImg)
        ]);
        drawImages(img, bgImg);
      } catch (error) {
        console.error("Error loading images", error);
      }
    };
    loadAndDrawImages();
  }, [backgroundImg, image, position, scale, text]);

    
    const handleDownloadClick = () => {
        html2canvas(cardRef.current).then((canvas) => {
          const link = document.createElement("a");
          link.download = "trading-card.png";
          link.href = canvas.toDataURL("image/png");
          link.click();
        });
      };

    return (
        <div className="container"
        onWheel={handleWheel}
        >
            <div className="card" 
                onMouseDown={startDrag} 
                onMouseMove={drag} 
                onMouseUp={endDrag} 
                onMouseLeave={endDrag}
                >
                {/* Note: This absolutely must match Card size and must be inline css or it will be blurry */}
                <canvas ref={cardRef} width="600" height="800"/>
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
