import React from "react";
import { render } from "@testing-library/react";
import { ThemeProvider } from "@chakra-ui/core";

import { AppProvider } from "../contexts/app";
import Home from "../pages";

test("Render App", async () => {
  const { getByTestId } = render(
    <ThemeProvider>
      <AppProvider>
        <Home />
      </AppProvider>
    </ThemeProvider>
  );

  expect(getByTestId("header")).toBeInTheDocument();
  expect(getByTestId("search-form")).toBeInTheDocument();
});
