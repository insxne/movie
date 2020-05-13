import { AppProps } from "next/app";
import { ThemeProvider, CSSReset } from "@chakra-ui/core";
import Head from "next/head";

import { AppProvider } from "../contexts/app";

const App = ({ Component, pageProps }: AppProps) => (
  <ThemeProvider>
    <Head>
      <title>Movies</title>
      <link
        rel="shortcut icon"
        href="https://res.cloudinary.com/dlh9zzbt7/image/upload/f_auto,q_auto/v1589393154/movie/favicon_s75yyk.png"
      />
      <meta
        name="description"
        content="App that allows you to search for movies from the OMDb API"
      />
    </Head>
    <CSSReset />
    <AppProvider>
      <Component {...pageProps} />
    </AppProvider>
  </ThemeProvider>
);

export default App;
