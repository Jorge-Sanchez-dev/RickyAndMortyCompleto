import { Handlers, PageProps } from "$fresh/server.ts";
import CharacterFavoritos from "../../components/CharacterFavoritos.tsx";
import { getFavoritesCookie } from "../../lib/cookies.ts";
import Axios from "npm:axios";

type Character = {
  id: number;
  name: string;
  image: string;
  status: string;
  species: string;
};

type Data = {
  characters: Character[];
  favorites: string[];
};

export const handler: Handlers<Data> = {
  async GET(req, ctx) {
    const favorites = getFavoritesCookie(req.headers.get("cookie"));
    
    if (favorites.length === 0) {
      return ctx.render({ characters: [], favorites });
    }

    try {
      const ids = favorites.join(",");
      const response = await Axios.get(`https://rickandmortyapi.com/api/character/${ids}`);

      let characters: Character[] = [];

      if (Array.isArray(response.data)) {
        characters = response.data;
      } else {
        characters = [response.data];
      }

      return ctx.render({ characters, favorites });
    } catch {
      return new Response("Error obteniendo personajes favoritos", { status: 500 });
    }
  },
};

export default function FavoritesPage({ data }: PageProps<Data>) {
  return (
    <div>
      <h1 style={{ textAlign: "center" }}>🌟 Personajes favoritos</h1>
      <CharacterFavoritos characters={data.characters} favorites={data.favorites} />
    </div>
  );
}
