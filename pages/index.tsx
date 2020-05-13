import "isomorphic-unfetch";
import { NextPage } from "next";

import { Movie } from "../types";
import { Layout } from "../components/Layout";
import Card from "../components/Card";
import SearchForm from "../components/SearchForm";
import NavBar from "../components/NavBar";
import { useAppContext } from "../contexts/app";
import CardSkeleton from "../components/CardSkeleton";

const HomePage: NextPage = () => {
  const { movies, setMovies, isSubmitting } = useAppContext();

  const onSubmit = (search: string) => {
    if (search === "") {
      return Promise.resolve(setMovies([]));
    }

    return fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/movies/search/${search}`
    )
      .then((r) => r.json())
      .then((movies: Movie[]) => setMovies(movies))
      .catch(() => setMovies([]));
  };

  return (
    <>
      <NavBar />
      <SearchForm onSubmit={onSubmit} />
      <Layout title={movies.length ? "Movies" : undefined}>
        {isSubmitting
          ? Array.apply(null, Array(4)).map((_, index) => (
              <CardSkeleton key={index} />
            ))
          : movies.map((movie) => <Card key={movie.id} movie={movie} />)}
      </Layout>
    </>
  );
};

export default HomePage;
