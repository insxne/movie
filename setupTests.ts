import "@testing-library/jest-dom/extend-expect";
import "jest-localstorage-mock";

process.env.OMDB_API_URL = "http://www.omdbapi.com/?apikey=2fa810c2";
process.env.NEXT_PUBLIC_BASE_URL = "http://localhost:3000";
