import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import { ThemeProvider } from "@chakra-ui/core";
import fetchMock from "fetch-mock";

import { AppProvider } from "../contexts/app";
import Home from "../pages";

const search = "search";
const firstMovie = "Batman";
const secondMovie = "Rambo";
const movies = [
  {
    id: "1",
    title: firstMovie,
    year: "2019",
  },
  {
    id: "2",
    title: secondMovie,
    year: "2019",
  },
];

test("search  movies", async () => {
  fetchMock.mock(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/movies/search/${search}`,
    {
      status: 200,
      headers: { "Content-Type": "application/json" },
      body: movies,
    }
  );

  const { getByTestId, getAllByTestId, getByText } = render(
    <ThemeProvider>
      <AppProvider>
        <Home />
      </AppProvider>
    </ThemeProvider>
  );

  await act(async () => {
    fireEvent.change(getByTestId("input-search-form"), {
      target: { value: search },
    });
  });

  await act(async () => {
    fireEvent.click(getByTestId("button-search-form"));
  });

  expect(getAllByTestId("movie")).toHaveLength(movies.length);
  expect(getByText(firstMovie)).toBeInTheDocument();
  expect(getByText(secondMovie)).toBeInTheDocument();

  fetchMock.reset();
});
