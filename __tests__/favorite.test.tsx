import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import { ThemeProvider } from "@chakra-ui/core";
import fetchMock from "fetch-mock";

import { AppProvider } from "../contexts/app";
import Home from "../pages";
import Favorites from "../pages/favorites";

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

beforeEach(() => {
  fetchMock.mock(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/movies/search/${search}`,
    {
      status: 200,
      headers: { "Content-Type": "application/json" },
      body: movies,
    }
  );
});

afterEach(() => {
  localStorage.clear();
  fetchMock.reset();
});

test("add/remove to favorites", async () => {
  const { getByTestId } = render(
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

  await act(async () => {
    fireEvent.click(getByTestId(`button-favorite-1`));
  });

  expect(JSON.parse(localStorage.__STORE__["favorites"])).toHaveLength(1);

  await act(async () => {
    fireEvent.click(getByTestId(`button-favorite-1`));
  });

  expect(JSON.parse(localStorage.__STORE__["favorites"])).toHaveLength(0);
});

test("show movies favorites", async () => {
  localStorage.setItem("favorites", JSON.stringify(movies));

  const { getAllByTestId } = render(
    <ThemeProvider>
      <AppProvider>
        <Favorites />
      </AppProvider>
    </ThemeProvider>
  );

  expect(getAllByTestId("movie")).toHaveLength(movies.length);
});
