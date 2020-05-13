import createPersistedState from "use-persisted-state";

import { Movie } from "../types";

const useFavoritePersistedState = createPersistedState("favorites");

const useFavorite = () => {
  const [favorites, setFavorites] = useFavoritePersistedState<Movie[]>([]);

  const isFavorite = (movieId: string) => {
    return Boolean(favorites.find((favMovie) => favMovie.id === movieId));
  };

  const toogleFavorite = (movie: Movie) => {
    setFavorites((favorites) => {
      return isFavorite(movie.id)
        ? favorites.filter((favMovie) => favMovie.id !== movie.id)
        : [...favorites, movie];
    });
  };

  return { favorites, isFavorite, toogleFavorite };
};

export { useFavorite };
