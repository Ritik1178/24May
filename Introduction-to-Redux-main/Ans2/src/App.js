import { ChakraProvider, Container, Heading, VStack } from '@chakra-ui/react';
import TodoList from './components/TodoList';
import AddTodo from './components/AddTodo';

function App() {
  return (
    <ChakraProvider>
      <Container maxW="container.md" py={10}>
        <VStack spacing={8}>
          <Heading>Todo App with Redux</Heading>
          <AddTodo />
          <TodoList />
        </VStack>
      </Container>
    </ChakraProvider>
  );
}

export default App; 