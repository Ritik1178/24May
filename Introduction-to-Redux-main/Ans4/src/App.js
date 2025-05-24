import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  ChakraProvider,
  Box,
  Container,
  SimpleGrid,
  Heading,
  Text,
  Spinner,
  Alert,
  AlertIcon,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
} from '@chakra-ui/react';
import { fetchMatches } from './store/footballSlice';
import MatchCard from './components/MatchCard';
import SearchAndFilter from './components/SearchAndFilter';

function App() {
  const dispatch = useDispatch();
  const { isLoading, isError, footballMatches, searchQuery, filters } = useSelector(
    (state) => state.football
  );

  useEffect(() => {
    dispatch(fetchMatches());
  }, [dispatch]);

  const filteredMatches = footballMatches.filter((match) => {
    const searchMatch =
      match.team1.toLowerCase().includes(searchQuery.toLowerCase()) ||
      match.team2.toLowerCase().includes(searchQuery.toLowerCase()) ||
      match.venue.toLowerCase().includes(searchQuery.toLowerCase());

    const teamFilter = !filters.team || match[filters.team];
    const dateFilter = !filters.date || match.date === filters.date;
    const outcomeFilter = !filters.outcome || match.outcome === filters.outcome;

    return searchMatch && teamFilter && dateFilter && outcomeFilter;
  });

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minH="100vh">
        <Spinner size="xl" />
      </Box>
    );
  }

  if (isError) {
    return (
      <Alert status="error">
        <AlertIcon />
        Error loading matches. Please try again later.
      </Alert>
    );
  }

  return (
    <ChakraProvider>
      <Box minH="100vh" bg="gray.50">
        <Container maxW="container.xl" py={8}>
          <Heading mb={6} textAlign="center">
            Football Matches
          </Heading>

          <SearchAndFilter />

          <Tabs mt={8} variant="enclosed">
            <TabList>
              <Tab>All Matches</Tab>
              <Tab>Favorites</Tab>
            </TabList>

            <TabPanels>
              <TabPanel>
                {filteredMatches.length === 0 ? (
                  <Text textAlign="center" mt={4}>
                    No matches found
                  </Text>
                ) : (
                  <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
                    {filteredMatches.map((match) => (
                      <MatchCard key={match.id} match={match} />
                    ))}
                  </SimpleGrid>
                )}
              </TabPanel>

              <TabPanel>
                <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
                  {filteredMatches
                    .filter((match) => match.isFavorite)
                    .map((match) => (
                      <MatchCard key={match.id} match={match} />
                    ))}
                </SimpleGrid>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Container>
      </Box>
    </ChakraProvider>
  );
}

export default App; 