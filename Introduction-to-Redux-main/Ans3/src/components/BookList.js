import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box,
  Button,
  Grid,
  Heading,
  Text,
  Badge,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  Select,
  VStack,
  useToast,
} from '@chakra-ui/react';
import {
  selectAllBooks,
  editBook,
  deleteBook,
  toggleReadStatus,
} from '../features/books/booksSlice';
import { selectFilters } from '../features/filters/filtersSlice';

const BookList = () => {
  const dispatch = useDispatch();
  const toast = useToast();
  const books = useSelector(selectAllBooks);
  const filters = useSelector(selectFilters);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [editingBook, setEditingBook] = useState(null);

  const filteredBooks = books.filter((book) => {
    const matchesSearch = book.title.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
      book.author.toLowerCase().includes(filters.searchTerm.toLowerCase());
    const matchesGenre = filters.genre === 'all' || book.genre === filters.genre;
    const matchesReadStatus = filters.readStatus === 'all' ||
      (filters.readStatus === 'read' && book.isRead) ||
      (filters.readStatus === 'unread' && !book.isRead);

    return matchesSearch && matchesGenre && matchesReadStatus;
  });

  const handleEdit = (book) => {
    setEditingBook(book);
    onOpen();
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const updatedBook = {
      id: editingBook.id,
      title: formData.get('title'),
      author: formData.get('author'),
      genre: formData.get('genre'),
    };

    dispatch(editBook(updatedBook));
    onClose();
    toast({
      title: 'Success',
      description: 'Book updated successfully',
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
  };

  const handleDelete = (id) => {
    dispatch(deleteBook(id));
    toast({
      title: 'Success',
      description: 'Book deleted successfully',
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
  };

  const handleToggleRead = (id) => {
    dispatch(toggleReadStatus(id));
  };

  return (
    <>
      <Grid templateColumns="repeat(auto-fill, minmax(300px, 1fr))" gap={6}>
        {filteredBooks.map((book) => (
          <Box
            key={book.id}
            p={5}
            shadow="md"
            borderWidth="1px"
            borderRadius="lg"
            bg="white"
          >
            <Heading size="md" mb={2}>
              {book.title}
            </Heading>
            <Text mb={2}>By {book.author}</Text>
            <Badge colorScheme="blue" mb={2}>
              {book.genre}
            </Badge>
            <Badge
              colorScheme={book.isRead ? 'green' : 'gray'}
              mb={4}
              ml={2}
            >
              {book.isRead ? 'Read' : 'Unread'}
            </Badge>
            <Box>
              <Button
                size="sm"
                colorScheme="blue"
                mr={2}
                onClick={() => handleEdit(book)}
              >
                Edit
              </Button>
              <Button
                size="sm"
                colorScheme={book.isRead ? 'gray' : 'green'}
                mr={2}
                onClick={() => handleToggleRead(book.id)}
              >
                {book.isRead ? 'Mark as Unread' : 'Mark as Read'}
              </Button>
              <Button
                size="sm"
                colorScheme="red"
                onClick={() => handleDelete(book.id)}
              >
                Delete
              </Button>
            </Box>
          </Box>
        ))}
      </Grid>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Book</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form onSubmit={handleEditSubmit}>
              <VStack spacing={4}>
                <FormControl isRequired>
                  <FormLabel>Title</FormLabel>
                  <Input
                    name="title"
                    defaultValue={editingBook?.title}
                  />
                </FormControl>

                <FormControl isRequired>
                  <FormLabel>Author</FormLabel>
                  <Input
                    name="author"
                    defaultValue={editingBook?.author}
                  />
                </FormControl>

                <FormControl isRequired>
                  <FormLabel>Genre</FormLabel>
                  <Select
                    name="genre"
                    defaultValue={editingBook?.genre}
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
                  Save Changes
                </Button>
              </VStack>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default BookList; 