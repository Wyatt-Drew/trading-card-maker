import React, { useState, useEffect, useRef } from 'react';

const TextEditor = () => {
    const [text, setText] = useState('');
    const [textSize, setTextSize] = useState(16);
    const [textColor, setTextColor] = useState('#000000');
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        canvas.width = 500;
        canvas.height = 500;

        // Clear canvas before redrawing
        context.clearRect(0, 0, canvas.width, canvas.height);

        // Set text properties
        context.font = `${textSize}px Arial`;
        context.fillStyle = textColor;

        // Handle line breaks and draw text
        const lines = text.split('\n');
        let yOffset = 0;
        lines.forEach((line) => {
            context.fillText(line, 10, 30 + yOffset); // Adjust x and y coordinates as needed
            yOffset += parseInt(textSize, 10) + 5; // Adjust line spacing
        });
    }, [text, textSize, textColor]);

    const handleTextChange = (event) => {
        setText(event.target.value);
    };

    const handleTextSizeChange = (event) => {
        setTextSize(event.target.value);
    };

    const handleTextColorChange = (event) => {
        setTextColor(event.target.value);
    };

    return (
        <div>
            <textarea
                value={text}
                onChange={handleTextChange}
                style={{ fontSize: `${textSize}px`, color: textColor }}
                rows="4"
                cols="50"
            ></textarea>
            <br />
            <label>
                Text Size:
                <input
                    type="number"
                    value={textSize}
                    onChange={handleTextSizeChange}
                />
            </label>
            <br />
            <label>
                Text Color:
                <input
                    type="color"
                    value={textColor}
                    onChange={handleTextColorChange}
                />
            </label>
            <br />
            <canvas ref={canvasRef}></canvas>
        </div>
    );
};

export default TextEditor;
