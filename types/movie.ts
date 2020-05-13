export interface Movie {
  id: string;
  title: string;
  year: string;
  imageUrl?: string;
}

export interface FullMovie extends Movie {
  rated: string;
  runtime: string;
  director: string;
  plot: string;
  awards: string;
  actors: string;
  metascore: string;
}
