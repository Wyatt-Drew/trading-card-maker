import React, { useState, useRef, useEffect} from 'react';
import backgroundImg from '../assets/minecraft_ducky_template.png';

const ImageUploadAndDisplay = () => {
    const [image, setImage] = useState(null);
    const cardRef = useRef(null);
    const fileInputRef = useRef(null);

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
              context.drawImage(bgImg, 0, 0, card.width, card.height);
            };
          } catch (error) {
            console.error("Error loading images", error);
          }
        };
        loadImagesInOrder();
      }, [backgroundImg, image]);
    


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
                    ctx.drawImage(img, 0, 0);
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

    return (
        <div>
            <input type="file" ref={fileInputRef} style={{ display: 'none' }} onChange={handleImageUpload}/>
            <button onClick={handleFileInputClick}>Upload Image</button>
            <canvas ref={cardRef} style={{ border: '1px solid black' }} />
        </div>
    );
};

export default ImageUploadAndDisplay;
