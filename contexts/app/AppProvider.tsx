import {
  createContext,
  useState,
  useContext,
  Dispatch,
  SetStateAction,
} from "react";
import { Movie } from "../../types";

interface AppContext {
  search: string;
  setSearch: Dispatch<SetStateAction<string>>;
  movies: Movie[];
  setMovies: Dispatch<SetStateAction<Movie[]>>;
  isSubmitting: boolean;
  setIsSubmitting: Dispatch<SetStateAction<boolean>>;
}

const appContext = createContext<AppContext>({
  search: "",
  setSearch: () => undefined,
  movies: [],
  setMovies: () => undefined,
  isSubmitting: false,
  setIsSubmitting: () => undefined,
});

const { Provider } = appContext;

const AppProvider: React.FC = ({ children }) => {
  const [search, setSearch] = useState<string>("");
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  return (
    <Provider
      value={{
        search,
        setSearch,
        movies,
        setMovies,
        isSubmitting,
        setIsSubmitting,
      }}
    >
      {children}
    </Provider>
  );
};

export const useAppContext = () => useContext(appContext);

export { AppProvider };
