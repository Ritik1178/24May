import { useSelector, useDispatch } from 'react-redux';
import { toggleTodo, deleteTodo } from '../store/todoSlice';
import { VStack, HStack, Text, Checkbox, Button, Box } from '@chakra-ui/react';

function TodoList() {
  const todos = useSelector((state) => state.todos.todos);
  const dispatch = useDispatch();

  return (
    <VStack spacing={4} align="stretch" w="100%">
      {todos.map((todo) => (
        <Box
          key={todo.id}
          p={4}
          borderWidth={1}
          borderRadius="md"
          _hover={{ shadow: 'md' }}
        >
          <HStack justify="space-between">
            <HStack>
              <Checkbox
                isChecked={todo.status}
                onChange={() => dispatch(toggleTodo(todo.id))}
                colorScheme="green"
              />
              <Text
                textDecoration={todo.status ? 'line-through' : 'none'}
                color={todo.status ? 'gray.500' : 'black'}
              >
                {todo.title}
              </Text>
            </HStack>
            <Button
              colorScheme="red"
              size="sm"
              onClick={() => dispatch(deleteTodo(todo.id))}
            >
              Delete
            </Button>
          </HStack>
        </Box>
      ))}
    </VStack>
  );
}

export default TodoList; 