import { NextApiHandler } from "next";

interface Movie {
  imdbID: string;
  Title: string;
  Year: string;
  Poster: string;
}

interface Response {
  Search?: Movie[];
  Response: "False" | "True";
  Error?: string;
}

const search: NextApiHandler = async (req, res) => {
  const { s } = req.query;
  const response = await fetch(`${process.env.OMDB_API_URL}&s=${s}`);

  if (!response.ok) {
    res.status(400).json([]);
    return;
  }

  const movies: Response = await response.json();

  if (movies.Response !== "True" || !movies.Search) {
    res.status(400).json([]);
    return;
  }

  res.status(200).json(
    movies.Search.map((movie) => ({
      id: movie.imdbID,
      title: movie.Title,
      year: movie.Year,
      imageUrl: movie.Poster === "N/A" ? undefined : movie.Poster,
    }))
  );
};

export default search;
