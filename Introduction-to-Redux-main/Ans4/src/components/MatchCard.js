import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box,
  Card,
  CardBody,
  Stack,
  Heading,
  Text,
  Button,
  Flex,
  Badge,
  useToast
} from '@chakra-ui/react';
import { toggleFavorite } from '../store/footballSlice';

const MatchCard = ({ match }) => {
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.football.favorites);
  const toast = useToast();

  const isFavorite = favorites.includes(match.id);

  const handleFavoriteToggle = () => {
    dispatch(toggleFavorite(match.id));
    toast({
      title: isFavorite ? 'Removed from favorites' : 'Added to favorites',
      status: 'success',
      duration: 2000,
      isClosable: true,
    });
  };

  return (
    <Card maxW="sm" borderRadius="lg" overflow="hidden" boxShadow="lg">
      <CardBody>
        <Stack spacing={3}>
          <Flex justify="space-between" align="center">
            <Heading size="md">{match.competition}</Heading>
            <Badge colorScheme="blue">{match.year}</Badge>
          </Flex>

          <Box>
            <Text fontSize="lg" fontWeight="bold">
              {match.team1} vs {match.team2}
            </Text>
            <Text color="gray.500">{match.venue}</Text>
          </Box>

          <Box>
            <Text>Score: {match.team1goals} - {match.team2goals}</Text>
            <Text>Round: {match.round}</Text>
          </Box>

          <Button
            colorScheme={isFavorite ? 'red' : 'gray'}
            onClick={handleFavoriteToggle}
            size="sm"
          >
            {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
          </Button>
        </Stack>
      </CardBody>
    </Card>
  );
};

export default MatchCard; 