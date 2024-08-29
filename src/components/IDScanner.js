import React, { useState } from 'react';
import { Box, Button, Image, Input } from '@chakra-ui/react';

const IDScanner = ({ onImageCaptured }) => {
  const [capturedImage, setCapturedImage] = useState(null);

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const dataUrl = reader.result;
        setCapturedImage(dataUrl);
        onImageCaptured(dataUrl); // Trimite imaginea încărcată către funcția de manipulare
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRetake = () => {
    setCapturedImage(null);
  };

  return (
    <Box className="idscanner-container">
      <Box className="image-preview">
        {capturedImage && (
          <Image
            src={capturedImage}
            alt="Uploaded"
            className="captured-image"
          />
        )}
      </Box>
    </Box>
  );
};

export default IDScanner;
