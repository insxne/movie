import NextLink from "next/link";
import {
  Box,
  Image,
  Badge,
  Link,
  IconButton,
  Flex,
  Skeleton,
} from "@chakra-ui/core";

import { Movie } from "../types";
import { useFavorite } from "../hooks";

interface CardProps {
  movie: Movie;
}

const Card: React.FC<CardProps> = ({ movie }) => {
  const { isFavorite, toogleFavorite } = useFavorite();

  return (
    <>
      <Flex
        flexDirection="column"
        maxW="sm"
        borderWidth="1px"
        rounded="lg"
        overflow="hidden"
        justifyContent="space-between"
        data-testid="movie"
      >
        <Box m="4" rounded="lg" h="100%">
          <NextLink href="/movie/[id]" as={`/movie/${movie.id}`} passHref>
            <Link>
              {movie.imageUrl ? (
                <Image alt={movie.title} w="100%" src={movie.imageUrl} />
              ) : (
                <Box bg="gray.200" h="100%" />
              )}
            </Link>
          </NextLink>
        </Box>

        <Box p="5">
          <Box alignItems="baseline">
            <IconButton
              size="xs"
              aria-label="favorite"
              icon="star"
              color={isFavorite(movie.id) ? "tomato" : "gray.400"}
              onClick={() => toogleFavorite(movie)}
              data-testid={`button-favorite-${movie.id}`}
            />
            <Badge ml="2" rounded="full" px="2" variantColor="blue">
              {movie.year}
            </Badge>
          </Box>

          <Box
            mt="1"
            fontWeight="semibold"
            as="h4"
            lineHeight="tight"
            isTruncated
          >
            <NextLink href="/movie/[id]" as={`/movie/${movie.id}`} passHref>
              <Link color="blue">{movie.title}</Link>
            </NextLink>
          </Box>
        </Box>
      </Flex>
    </>
  );
};

export default Card;
