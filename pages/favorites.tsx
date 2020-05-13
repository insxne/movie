import { NextPage } from "next";

import { Layout } from "../components/Layout";
import { useFavorite } from "../hooks";
import Card from "../components/Card";
import NavBar from "../components/NavBar";

const Favorites: NextPage = () => {
  const { favorites } = useFavorite();

  return (
    <>
      <NavBar />
      <Layout title="Favorites Movies">
        {favorites.map((favorite) => (
          <Card key={favorite.id} movie={favorite} />
        ))}
      </Layout>
    </>
  );
};

export default Favorites;
