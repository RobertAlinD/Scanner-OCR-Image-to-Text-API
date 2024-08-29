import React, { useState } from 'react';
import { Box, Button, Input, Text, Image, Heading } from '@chakra-ui/react';
import extractDataFromImage from './ocrService';

function App() {
  const [rawText, setRawText] = useState('');
  const [capturedImage, setCapturedImage] = useState('');

  const handleImageCapture = async (image) => {
    setCapturedImage(image);
    try {
      const result = await extractDataFromImage(image);
      setRawText(result.ParsedText || 'Informație lipsă');
    } catch (error) {
      console.error("Eroare la capturarea imaginii sau extragerea datelor: ", error);
      setRawText('Eroare la recunoașterea textului.');
    }
  };

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64String = reader.result.replace(/^data:image\/[a-z]+;base64,/, '');
        await handleImageCapture(base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100vh"
      width="100vw"
      p={4}
      bg="gray.50"
    >
      {/* Titlul aplicației */}
      <Heading
        as="h1"
        fontSize={{ base: '2xl', md: '4xl' }} // Dimensiune adaptabilă în funcție de ecran
        fontWeight="bold"
        textAlign="center"
        color="teal.500"
        mb={6}
        style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)' }} // Shadow modern
      >
        Scanner OCR Image to Text
      </Heading>

      {/* Afișează imaginea încărcată deasupra butonului Upload */}
      {capturedImage && (
        <Box
          mb={4}
          mt={8}
          display="flex"
          justifyContent="center"
        >
          <Image
            src={`data:image/jpeg;base64,${capturedImage}`}
            alt="Uploaded"
            borderRadius="md"
            boxShadow="md"
            maxWidth="80%"  // Ajustează dimensiunea maximă a imaginii
            maxHeight="400px"  // Ajustează înălțimea maximă a imaginii
          />
        </Box>
      )}
      
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
      >
        <Input
          type="file"
          accept="image/*"
          onChange={handleFileUpload}
          id="upload-input"
          style={{ display: 'none' }}  // Ascunde input-ul pentru fișier
        />
        <Button
          as="label"
          htmlFor="upload-input"
          colorScheme="teal"
          variant="solid"
          size="lg"
          borderRadius="md"
          boxShadow="md"
          _hover={{ bg: 'teal.600' }}
          _active={{ bg: 'teal.700' }}
        >
          Upload Image
        </Button>
      </Box>

      <Box
        mt={4}
        p={4}
        borderWidth={1}
        borderRadius="md"
        bg="white"
        boxShadow="md"
        width={{ base: 'full', sm: 'md' }}
        textAlign="center"
      >
        <Text fontWeight="bold" fontSize="lg" mb={2}>Text extras:</Text>
        <Text whiteSpace="pre-wrap">{rawText}</Text>
      </Box>
    </Box>
  );
}

export default App;
