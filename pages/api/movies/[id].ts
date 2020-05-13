import { NextApiHandler } from "next";

interface Movie {
  imdbID: string;
  Title: string;
  Year: string;
  Poster: string;
  Rated: string;
  Runtime: string;
  Director: string;
  Plot: string;
  Awards: string;
  Actors: string;
  Metascore: string;
}

interface Response extends Movie {
  Response: "False" | "True";
  Error?: string;
}

const search: NextApiHandler = async (req, res) => {
  const { id } = req.query;
  const response = await fetch(`${process.env.OMDB_API_URL}&i=${id}`);

  if (!response.ok) {
    res.status(400).json({});
    return;
  }

  const movie: Response = await response.json();

  if (movie.Response !== "True") {
    res.status(400).json({});
    return;
  }

  res.status(200).json({
    id: movie.imdbID,
    title: movie.Title,
    year: movie.Year,
    imageUrl: movie.Poster === "N/A" ? undefined : movie.Poster,
    rated: movie.Rated,
    runtime: movie.Runtime,
    director: movie.Director,
    plot: movie.Plot,
    awards: movie.Awards,
    actors: movie.Actors,
    metascore: movie.Metascore,
  });
};

export default search;
