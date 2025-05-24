import React from 'react';
import { useDispatch } from 'react-redux';
import {
  Box,
  Input,
  Select,
  Stack,
  InputGroup,
  InputLeftElement,
} from '@chakra-ui/react';
import { setSearchQuery, setFilters } from '../store/footballSlice';

const SearchAndFilter = () => {
  const dispatch = useDispatch();

  const handleSearch = (e) => {
    dispatch(setSearchQuery(e.target.value));
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    dispatch(setFilters({ [name]: value }));
  };

  return (
    <Box p={4} bg="white" borderRadius="md" boxShadow="sm">
      <Stack spacing={4}>
        <InputGroup>
          <InputLeftElement
            pointerEvents="none"
            children={<span>🔍</span>}
          />
          <Input
            placeholder="Search matches..."
            onChange={handleSearch}
            borderRadius="md"
          />
        </InputGroup>

        <Stack direction={{ base: 'column', md: 'row' }} spacing={4}>
          <Select
            placeholder="Filter by team"
            name="team"
            onChange={handleFilterChange}
            borderRadius="md"
          >
            <option value="team1">Team 1</option>
            <option value="team2">Team 2</option>
          </Select>

          <Select
            placeholder="Filter by outcome"
            name="outcome"
            onChange={handleFilterChange}
            borderRadius="md"
          >
            <option value="win">Win</option>
            <option value="loss">Loss</option>
            <option value="draw">Draw</option>
          </Select>

          <Input
            type="date"
            name="date"
            onChange={handleFilterChange}
            borderRadius="md"
          />
        </Stack>
      </Stack>
    </Box>
  );
};

export default SearchAndFilter; 