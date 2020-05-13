import "isomorphic-unfetch";
import { NextPage, GetStaticProps } from "next";
import Error from "next/error";
import { useRouter } from "next/router";
import { Flex, Image, Box, Text, Stack, Spinner } from "@chakra-ui/core";

import { FullMovie } from "../../types";
import NavBar from "../../components/NavBar";

interface MoviePageProps {
  movie: FullMovie | null;
}

const getMovieDetails = (movie: FullMovie) => [
  { title: "Director", info: movie.director },
  { title: "Cast", info: movie.actors },
  { title: "Awards", info: movie.awards },
  { title: "Runtime", info: movie.runtime },
  { title: "Rated", info: movie.rated },
  { title: "Metascore", info: movie.metascore },
];

const MoviePage: NextPage<MoviePageProps> = ({ movie }) => {
  const { isFallback } = useRouter();
  if (isFallback) {
    return (
      <Flex height="100vh" alignItems="center" justifyContent="center">
        <Stack alignItems="center" isInline spacing={4}>
          <Spinner size="md" />
          <Text color="gray.500">Loading...</Text>
        </Stack>
      </Flex>
    );
  }

  if (!movie) {
    return <Error statusCode={404} />;
  }

  const movieDetails = getMovieDetails(movie);

  return (
    <>
      <NavBar />
      <Box m="10%" mt="8">
        <Stack spacing="8">
          <Text borderLeft="5px solid tomato" pl="4" as="h1" fontSize="2xl">
            {movie.title}
          </Text>
          <Flex wrap="wrap-reverse" overflow="hidden">
            <Box bg="gray.50" rounded="lg" mr="8">
              {movie.imageUrl ? (
                <Image w="100%" src={movie.imageUrl} alt={movie.title} />
              ) : (
                <Box w="200px" h="300px"></Box>
              )}
            </Box>
            <Box flex="1" minW="200px" mb="8">
              <Stack spacing="8">
                <Box data-testid="movie-plot">{movie.plot}</Box>
                <Stack spacing="1">
                  {movieDetails.map((detail) => (
                    <Box key={detail.title}>
                      <Text as="span" color="gray.500">
                        {detail.title}:
                      </Text>{" "}
                      {detail.info}
                    </Box>
                  ))}
                  }
                </Stack>
              </Stack>
            </Box>
          </Flex>
        </Stack>
      </Box>
    </>
  );
};

export const getStaticProps: GetStaticProps<
  MoviePageProps,
  { id: string }
> = async ({ params = {} }) => {
  const { id } = params;

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/movies/${id}`
  );
  if (!response.ok) {
    return {
      props: {
        movie: null,
      },
    };
  }

  const movie = await response.json();
  return {
    props: {
      movie,
    },
  };
};

export const getStaticPaths = async () => ({
  paths: [],
  fallback: true,
});

export default MoviePage;
