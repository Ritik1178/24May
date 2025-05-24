import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  VStack,
  useToast,
} from '@chakra-ui/react';
import { addBook } from '../features/books/booksSlice';

const AddBookForm = () => {
  const dispatch = useDispatch();
  const toast = useToast();
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    genre: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.author || !formData.genre) {
      toast({
        title: 'Error',
        description: 'Please fill in all fields',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    dispatch(addBook(formData));
    setFormData({ title: '', author: '', genre: '' });
    toast({
      title: 'Success',
      description: 'Book added successfully',
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <VStack spacing={4}>
        <FormControl isRequired>
          <FormLabel>Title</FormLabel>
          <Input
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter book title"
          />
        </FormControl>

        <FormControl isRequired>
          <FormLabel>Author</FormLabel>
          <Input
            name="author"
            value={formData.author}
            onChange={handleChange}
            placeholder="Enter author name"
          />
        </FormControl>

        <FormControl isRequired>
          <FormLabel>Genre</FormLabel>
          <Select
            name="genre"
            value={formData.genre}
            onChange={handleChange}
            placeholder="Select genre"
          >
            <option value="Fiction">Fiction</option>
            <option value="Non-Fiction">Non-Fiction</option>
            <option value="Mystery">Mystery</option>
            <option value="Science Fiction">Science Fiction</option>
            <option value="Fantasy">Fantasy</option>
            <option value="Biography">Biography</option>
          </Select>
        </FormControl>

        <Button type="submit" colorScheme="blue" width="full">
          Add Book
        </Button>
      </VStack>
    </form>
  );
};

export default AddBookForm; 