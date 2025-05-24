import React from 'react';
import { Box, Container, Heading, VStack } from '@chakra-ui/react';
import BookList from './components/BookList';
import AddBookForm from './components/AddBookForm';
import FilterBar from './components/FilterBar';

function App() {
  return (
    <Container maxW="container.xl" py={8}>
      <VStack spacing={8} align="stretch">
        <Heading as="h1" textAlign="center" color="blue.600">
          Book Library
        </Heading>
        
        <Box p={6} bg="white" borderRadius="lg" boxShadow="md">
          <AddBookForm />
        </Box>

        <Box p={6} bg="white" borderRadius="lg" boxShadow="md">
          <FilterBar />
        </Box>

        <Box p={6} bg="white" borderRadius="lg" boxShadow="md">
          <BookList />
        </Box>
      </VStack>
    </Container>
  );
}

export default App; 