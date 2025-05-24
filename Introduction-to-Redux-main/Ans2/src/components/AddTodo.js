import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTodo } from '../store/todoSlice';
import { Button, Input, HStack } from '@chakra-ui/react';

function AddTodo() {
  const [todo, setTodo] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (todo.trim()) {
      dispatch(addTodo(todo));
      setTodo('');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <HStack>
        <Input
          value={todo}
          onChange={(e) => setTodo(e.target.value)}
          placeholder="Add a new todo..."
          size="lg"
        />
        <Button type="submit" colorScheme="blue" size="lg">
          Add
        </Button>
      </HStack>
    </form>
  );
}

export default AddTodo; 