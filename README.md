# Rubber Ducky Academy Trading Card Maker

## Overview
Welcome to the Trading Card Maker for "The Rubber Ducky Academy," a unique tool designed for creating custom trading cards within our gaming Discord community. This React-based application lets users upload images, customize text, and download their personalized trading cards.

## Deployment
The application is deployed and accessible [here](https://wyatt-drew.github.io/trading-card-maker/).

## Features
* Image Upload: Users can upload their own images to be featured on the trading cards.
* Drag and Drop Positioning: Easily reposition your uploaded image on the canvas.
* Zoom In/Out: Use the mouse wheel to scale your image for the perfect fit.
* Custom Text: Add and style text to personalize your trading card.
* Download: Export your creation as a PNG file to share with the community or keep for your collection.

## Usage
* Uploading an Image: Click the "Upload Image" button and select an image from your device.
* Positioning and Scaling: Click and drag the image to reposition. Use the mouse wheel to zoom in and out.
* Adding Text: Enter your text in the textarea. Adjust the size, color, and top margin using the provided controls.
* Downloading the Card: Click the "Download" button to save your trading card as a PNG file.


## Key Hooks and Functions
* useState: Manages the state of the image, text, and various style properties.
* useRef: References to the canvas and file input elements.
* useEffect: Loads and draws the images onto the canvas when dependencies change.
* handleImageUpload: Manages the image upload process.
* startDrag, drag, endDrag: Functions to enable drag-and-drop functionality for image positioning.
* handleWheel: Zooms the image in and out.
* handleTextChange, handleTextSizeChange, handleTextColorChange, handleTopMarginChange: Functions to customize the text.
* handleDownloadClick: Triggers the download of the final trading card.
