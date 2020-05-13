import React from "react";
import { render, screen } from "@testing-library/react";
import { ThemeProvider } from "@chakra-ui/core";

import { AppProvider } from "../contexts/app";
import Movie from "../pages/movie/[id]";

const useRouter = jest.spyOn(require("next/router"), "useRouter");
beforeEach(() => {
  useRouter.mockImplementationOnce(() => ({ route: "/", isFallback: false }));
});

afterEach(() => {
  useRouter.mockClear();
});

const movie = {
  id: "1",
  title: "Rambo",
  year: "2019",
  imageUrl: "",
  rated: "",
  runtime: "",
  director: "",
  plot:
    "Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...",
  awards: "",
  actors: "",
  metascore: "",
};

test("show movie info", async () => {
  const { getByTestId } = render(
    <ThemeProvider>
      <AppProvider>
        <Movie movie={movie} />
      </AppProvider>
    </ThemeProvider>
  );

  expect(getByTestId("movie-plot").textContent).toEqual(movie.plot);
});

test("movie not found", async () => {
  render(
    <ThemeProvider>
      <AppProvider>
        <Movie movie={null} />
      </AppProvider>
    </ThemeProvider>
  );

  expect(screen.getByText("404")).toBeInTheDocument();
});
