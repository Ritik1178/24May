import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  HStack,
  Input,
  Select,
  FormControl,
  FormLabel,
} from '@chakra-ui/react';
import {
  setSearchTerm,
  setGenre,
  setReadStatus,
  selectFilters,
} from '../features/filters/filtersSlice';

const FilterBar = () => {
  const dispatch = useDispatch();
  const filters = useSelector(selectFilters);

  return (
    <HStack spacing={4} align="flex-end">
      <FormControl>
        <FormLabel>Search</FormLabel>
        <Input
          placeholder="Search by title or author"
          value={filters.searchTerm}
          onChange={(e) => dispatch(setSearchTerm(e.target.value))}
        />
      </FormControl>

      <FormControl>
        <FormLabel>Genre</FormLabel>
        <Select
          value={filters.genre}
          onChange={(e) => dispatch(setGenre(e.target.value))}
        >
          <option value="all">All Genres</option>
          <option value="Fiction">Fiction</option>
          <option value="Non-Fiction">Non-Fiction</option>
          <option value="Mystery">Mystery</option>
          <option value="Science Fiction">Science Fiction</option>
          <option value="Fantasy">Fantasy</option>
          <option value="Biography">Biography</option>
        </Select>
      </FormControl>

      <FormControl>
        <FormLabel>Reading Status</FormLabel>
        <Select
          value={filters.readStatus}
          onChange={(e) => dispatch(setReadStatus(e.target.value))}
        >
          <option value="all">All Books</option>
          <option value="read">Read</option>
          <option value="unread">Unread</option>
        </Select>
      </FormControl>
    </HStack>
  );
};

export default FilterBar; 